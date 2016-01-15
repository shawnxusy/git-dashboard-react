var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../../models/user');
var secrets = require('../secrets');

/*
 * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 *
 * The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens.
 * The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well
 * as options specifying a client ID, client secret, and callback URL.
 */
module.exports = new GitHubStrategy({
    clientID: secrets.github.clientID,
    clientSecret: secrets.github.clientSecret,
    callbackURL: secrets.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({userId: profile.id}, function(err, existingUser) {
        if (existingUser) {
          // If the user is already there in DB
          done(err, existingUser);
        } else {
          // If the user does not exist DB
          var user = new User();
          user.userId = profile.id;
          user.email = profile.emails[0].value;
          user.name = profile.displayName;
          user.picture = profile._json.avatar_url;
          user.tokens.push({ kind: 'github', accessToken: accessToken });
          user.save(function(err) {
            done(err, user);
          });
        }
      });
  }
);
