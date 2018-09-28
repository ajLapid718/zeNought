const passport = require("passport");
const express = require("express");
const router = express.Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../database/models");

module.exports = router;

/*
  process.env.GOOGLE_CLIENT_ID = 'your google client id'
  process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
  process.env.GOOGLE_CALLBACK = '/your/google/callback'
*/

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Google client ID / secret not found. Skipping Google OAuth.");
}
else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  };

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;

      User.findOrCreate({ where: { googleId }, defaults: { name, email } })
        .then(([user]) => done(null, user))
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get("/", passport.authenticate("google", { scope: "email" }));

  router.get(
    "/callback",
    passport.authenticate("google", {
      successRedirect: "/home",
      failureRedirect: "/login"
    })
  );
}
