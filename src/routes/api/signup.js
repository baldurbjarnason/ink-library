
const {Firestore} = require('@google-cloud/firestore');
const bcrypt = require('bcrypt');
const short = require('short-uuid');
const translator = short()
const saltRounds = 10
 
const firestore = new Firestore();

export async function post(req, res, next) {
  const {email, password, passwordConfirm} = req.body
  if (!email || !password || !passwordConfirm) return res.redirect('/sign-up')
  if (password !== passwordConfirm) return res.redirect('/sign-up')
  const existing = await firestore.collection('users').where('email', '==', email)
  if (existing.empty) {
    const id = translator.new()
    const userRef = firestore.doc(`users/${id}`);
    const hash = await bcrypt.hash(password, saltRounds)
    const userDoc = {
      id,
      email,
      hash
    }
    await userRef.set(userDoc)
    return req.login(
      userDoc,
      (err) => {
        if (err) { return next(err); }
        return res.redirect('/library/all/all');
      }
    )
  } else {
    return res.redirect('/sign-up')
  }
}