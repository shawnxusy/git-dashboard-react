/**
 * Routes for express app
 */
var topics = require('../controllers/topics');
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var request = require('request');
var jsonParser = require('json-parser');
var _ = require('lodash');
var Topic = mongoose.model('Topic');
var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');
var secrets = require('./secrets');

module.exports = function(app, passport) {
  // Use to increase unauthenticated rate limit for Github OAuth
  // Disable when in prod!
  var rateLimitDisabler = "?client_id=" + secrets.github.clientID + "&client_secret=" + secrets.github.clientSecret;

  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.get('/logout', users.getLogout);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));


  // github auth
  app.get('/auth/github', passport.authenticate('github', { scope: [ 'user', 'repo', 'public_repo', 'delete_repo' ] }),
    function(req, res) {
      // left for github to do
    });

  // github redirect
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  /**
   * GET /api/repos
   * Returns a list of repos for user name
   */
  app.get('/api/repos', function(req, res, next) {
    var username = req.params.username;
    var reposLookupPack = {
      url: 'https://api.github.com/user/repos?affiliation=owner,collaborator', // We only want owner and collaborator repos, not organization ones
      headers: {
        'User-Agent': 'S.X Dashboard',
        'Authorization': 'token ' + req.user.token
      }
    };

    request.get(reposLookupPack, function(err, request, json) {
      if (err) return next(err);

      var repos = [];
      var result = jsonParser.parse(json);

      _.each(result, function(repo) {
        repos.push(repo);
      });

      res.send(repos);
    });
  });

  /**
   * GET /api/repo/:repoName
   * Returns detail of a repo
   */
  app.get('/api/repo/:repoName', function(req, res, next) {
    var repoName = req.params.repoName;
    var repoLookupPack = {
      url: 'https://api.github.com/repos/' + req.user.username + '/' + repoName + rateLimitDisabler,
      headers: {
        'User-Agent': 'S.X Dashboard'
      }
    };

    request.get(repoLookupPack, function(err, request, json) {
      if (err) return next(err);

      var result = jsonParser.parse(json);

      res.send(result);
    });
  });

  /**
   * POST /api/repo
   * Create a new repo
   */
  app.post('/api/repo', function(req, res, next) {
    req.body.private = (req.body.private === 'true');
    var repoCreatePack = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'S.X Dashboard',
        'Authorization': 'token ' + req.user.token,
        'Content-type': 'application/json',
        'scope': '["repo"]'
      },
      json: req.body
    };

    request.post(repoCreatePack, function(err, request, json) {
      if (err) return next(err);
      res.send(json);
    });
  });

  /**
   * GET /api/branches/:repoName
   * Returns a list of branches for repo
   */
  app.get('/api/branches/:repoName', function(req, res, next) {
    var repoName = req.params.repoName;
    var branchesLookupPack = {
      url: 'https://api.github.com/repos/' + req.user.username + '/' + repoName + '/branches' + rateLimitDisabler,
      headers: {
        'User-Agent': 'S.X Dashboard'
      }
    };

    request.get(branchesLookupPack, function(err, request, json) {
      if (err) return next(err);

      var branches = [];
      var result = jsonParser.parse(json);

      _.each(result, function(branch) {
        branches.push(branch);
      });

      res.send(branches);
    });
  });

  /**
   * GET /api/issues/:repoName
   * Returns a list of issues for repo
   */
  app.get('/api/issues/:repoName', function(req, res, next) {
    var repoName = req.params.repoName;
    var issuesLookupPack = {
      url: 'https://api.github.com/repos/' + req.user.username + '/' + repoName + '/issues' + rateLimitDisabler,
      headers: {
        'User-Agent': 'S.X Dashboard'
      }
    };

    request.get(issuesLookupPack, function(err, request, json) {
      if (err) return next(err);

      var issues = [];
      var result = jsonParser.parse(json);

      _.each(result, function(issue) {
        issues.push(issue);
      });

      res.send(issues);
    });
  });


  // topic routes
  app.get('/topic', topics.all);

  app.post('/topic', function(req, res) {
    topics.add(req, res);
  });

  app.put('/topic', function(req, res) {
    topics.update(req, res);
  });

  app.delete('/topic', function(req, res) {
    topics.remove(req, res);
  });

  // Retrieves all topics on any endpoint for demonstration purposes
  // If you were indeed doing this in production, you should instead only
  // query the Topics on a page that has topics
  app.get('*', function(req, res, next) {
    Topic.find({}).exec(function(err, topics) {
      if(!err) {
        var topicmap = _.indexBy(topics, 'id');
        // We don't want to be seeding and generating markup with user information
        var user = req.user ? { authenticated: true, isWaiting: false } : { authenticated: false, isWaiting: false };
        // An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during
        // that request/response cycle (if any). Otherwise, this property is identical to app.locals
        // This property is useful for exposing request-level information such as request path name, authenticated user, user settings, and so on.
        // pass in data to be seeded into the TopicStore
        res.locals.data =  {
          TopicStore: { topics: topicmap},
          UserStore: { user: user }
        };
        next();
      }else {
        console.log('Error in first query');
        res.status(500).send(err);
      }
    });
  });

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.get('*', function (req, res, next) {
    var html = App(JSON.stringify(res.locals.data || {}), req, res);
    html = html.replace("TITLE", Header.title)
                .replace("META", Header.meta);

    if(process.env.NODE_ENV === 'devhotloader') {
      html = html.replace("LINK", '');
    } else {
      html = html.replace("LINK", Header.link);
    }

    res.contentType = "text/html; charset=utf8";
    res.end(html);
  });

};
