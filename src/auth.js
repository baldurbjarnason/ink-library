
import passport from "passport";
import jwt from "jsonwebtoken";
import got from "got";
import httpStrategies from "passport-http";
import debugSetup from "debug";
import Auth0Strategy from "passport-auth0";
const debug = debugSetup("vonnegut:auth");
const STRATEGY = process.env.PASSPORT_STRATEGY || 'basic';
const SECRETORKEY = process.env.SECRETORKEY || 'this is a secret'
const AUDIENCE = process.env.AUDIENCE || 'this is an audience'
const ISSUER = process.env.ISSUER || 'this is an issuer'

function generateToken(user) {
  const expiresIn = "30m";
  return jwt.sign({ sub: user.id }, SECRETORKEY, {
    algorithm: "HS256",
    expiresIn,
    audience: AUDIENCE,
    issuer: ISSUER
  });
}

async function getProfile (user) {
  const response = await got(`${process.env.API_SERVER}whoami`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
  return response.body;
}

async function deserialise(user) {
  if (!user.token) {
    user.token = generateToken(user);
  } else if (user.token) {
    jwt.verify(
      user.token,
      SECRETORKEY,
      {
        algorithm: "HS256",
        audience: AUDIENCE,
        issuer: ISSUER
      },
      (err, decoded) => {
        if (err && err.name === "TokenExpiredError") {
          user.token = generateToken(user);
        } else if (err) {
          debug(err);
          throw err;
        }
      }
    );
  }
  if (!user.profile || !user.profile.id) {
    try {
      user.profile = await getProfile(user)
    } catch (err) {
      if (err.response.statusCode === 404) {
        try {
          await got.post(`${process.env.API_SERVER}readers`, {
            headers: {
              "content-type": "application/ld+json",
              Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
              type: "Person",
              summary: `Reader profile`
            })
          });
          user.profile = await getProfile(user)
        } catch (err) {
          console.log(err);
        }
      } else {
        user.profile = { status: err.response.statusCode };
      }
    }
  }
  return user;
}


export function setup (app) {
  passport.serializeUser((user, done) => {
    // console.log('serialise: ', user)
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    // console.log('deserialise: ', user)
    return deserialise(user)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  app.use(passport.initialize());
  app.use(passport.session());

  if (process.env.PASSPORT_STRATEGY === "auth0") {
    console.log('auth0')
    passport.use(
      new Auth0Strategy(
        {
          domain: process.env.AUTH0_DOMAIN,
          clientID: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          callbackURL: process.env.CALLBACK_URL
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
          return done(null, { id: profile.id });
        }
      )
    );
    app.get("/callback", passport.authenticate("auth0", {}), function(
      req,
      res,
      next
    ) {
      res.redirect(req.session.returnTo || "/");
    });
  } else {
    // console.log('basic')
    passport.use(
      new httpStrategies.BasicStrategy((username, password, callback) => {
        console.log('using basic')
        if (password === "devpassword") {
          const user = { id: `dev-testing11|${username}` };
          return callback(null, user);
        } else {
          return callback(null, false);
        }
      })
    );
  }

  app.use(
    "/login",
    passport.authenticate(STRATEGY),
    function(req, res, next) {
      res.redirect(req.query.returnTo || "/");
    }
  );
  app.use("/logout", (req, res) => {
    if (!req.user) return res.redirect("/");
    req.session.destroy(() => {
      req.logout();
      let redirect;
      if (process.env.PASSPORT_STRATEGY === "auth0" && process.env.SIGNOUTURL) {
        redirect = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.SIGNOUTURL}`;
      } else {
        redirect = "/";
      }
      res.redirect(redirect);
    });
  });
  return app
}