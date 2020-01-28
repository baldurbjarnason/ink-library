import express from "express";
import sirv from "sirv";
import compression from "compression";
import csurf from "csurf";
import { setup as authSetup } from "./auth.js";
// import dotenv from "dotenv";
import session from "express-session";
import fs from "fs"
const accessTemplate = fs.readFileSync('pages/access.html', 'utf8')
// import firesession from 'firestore-store'

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
if (dev) {
  // const result = dotenv.config();
  // if (result.error) {
  //   throw result.error;
  // }
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // eslint-disable-line
}
if (dev) {
}

export function setup(sapper, options = {}) {
  const app = express();

  app.enable("strict routing");
  app.disable("x-powered-by");
  app.set("trust proxy", true);

  const sessionMiddleware = session({
    secret: process.env.COOKIE_KEY || 'randome stuff',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    name: "__session",
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: !dev, name: "__session", httpOnly: true, sameSite: 'lax' }
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(
    express.json({
      type: [
        "application/json",
        "application/activity+json",
        "application/ld+json"
      ],
      limit: "100mb"
    })
  );
  app.use(sessionMiddleware);
  authSetup(app);
  if (dev) {
    app.use(
      compression({ threshold: 0 }),
      sirv("static", { dev })
    );
  }
  app.get("/access", (req, res, next) => {
    const html = accessTemplate.replace('{RETURN_TO}', req.query.returnTo || '%2F')
    return res.send(html)
  })
  app.use((req, res, next) => {
    if (req.user) {
      return next()
    } else {
      res.redirect(`/access?returnTo=${encodeURIComponent(req.path)}`)
    }
  })
  app.use(
    "/",
    (req, res, next) => {
      if (req.path === "/callback") {
        return next();
      } else {
        return csurf()(req, res, next);
      }
    },
    (req, res, next) => {
      if (req.body && req.body._csrf) {
        delete req.body._csrf;
      }
      next();
    },
    // (req, res, next) => {
    //   res.cookie("XSRF-TOKEN", req.csrfToken(), {httpOnly: false});
    //   next();
    // },
    sapper.middleware({
      session: (req, res) => {
        return { user: req.user, csrfToken: req.csrfToken() };
      }
    })
  );
  return app;
}
