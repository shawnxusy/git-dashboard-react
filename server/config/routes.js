/**
 * Routes for express app
 */
var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');
var _ = require('lodash');

var Topic = mongoose.model('Topic');
var Task = mongoose.model('Task');

var users = require('../controllers/users');
var topics = require('../controllers/topics');
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
      url: 'https://api.github.com/user/repos?affiliation=owner&visibility=public', // We only want owner and collaborator repos, not organization ones
      headers: {
        'User-Agent': 'S.X Dashboard',
        'Authorization': 'token ' + req.user.token
      },
      json: true
    };

    rp(reposLookupPack)
      .then(function(repos) {
        res.send(repos);
      })
      .catch(function(err) {
        return next(err);
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
      },
      json: true
    };

    rp(repoLookupPack)
      .then(function(repo) {
        res.send(repo);
      })
      .catch(function(err) {
        return next(err);
      });
  });

  /**
   * POST /api/repo
   * Create a new repo
   */
  app.post('/api/repo', function(req, res, next) {
    req.body.private = (req.body.private === 'true');
    var repoCreatePack = {
      method: 'POST',
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'S.X Dashboard',
        'Authorization': 'token ' + req.user.token,
        'Content-type': 'application/json',
        'scope': '["repo"]'
      },
      body: req.body,
      json: true
    };

    rp(repoCreatePack)
      .then(function(response) {
        res.send(response);
      })
      .catch(function(err) {
        return next(err);
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
      },
      json: true
    };

    rp(branchesLookupPack)
      .then(function(branches) {
        res.send(branches);
      })
      .catch(function(err) {
        return next(err);
      });
  });

  /**
   * GET /api/branches/:repoName
   * Returns a list of branches for repo
   */
  app.get('/api/branch/:repoName/:branchName', function(req, res, next) {
    var repoName = req.params.repoName;
    var branchName = req.params.branchName;
    var branchLookupPack = {
      url: 'https://api.github.com/repos/' + req.user.username + '/' + repoName + '/branches/' + branchName + rateLimitDisabler,
      headers: {
        'User-Agent': 'S.X Dashboard'
      },
      json: true
    };

    rp(branchLookupPack)
      .then(function(branch) {
        res.send(branch);
      })
      .catch(function(err) {
        return next(err);
      });
  });

  /**
   * POST /api/:repoName/branch
   * Create a new branch
   */
  app.post('/api/:repoName/branch', function(req, res, next) {
    var repoName = req.params.repoName;
    var branchCreatePack = {
      method: 'POST',
      url: 'https://api.github.com/repos/' + req.user.username + '/' + repoName + '/git/refs',
      headers: {
        'User-Agent': 'S.X Dashboard',
        'Authorization': 'token ' + req.user.token,
        'Content-type': 'application/json',
      },
      body: req.body,
      json: true
    };

    rp(branchCreatePack)
      .then(function(response) {
        res.send(response);
      })
      .catch(function(err) {
        return next(err);
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
      },
      json: true
    };

    rp(issuesLookupPack)
      .then(function(issues) {
        res.send(issues);
      })
      .catch(function(err) {
        return next(err);
      });
  });

  /**
   * POST /api/:repoName/issue
   * Create a new issue
   */
  app.post('/api/:repoName/issue', function(req, res, next) {
    var repoName = req.params.repoName;
    var issueCreatePack = {
      method: 'POST',
      url: 'https://api.github.com/repos/' + req.user.username + '/' + repoName + '/issues',
      headers: {
        'User-Agent': 'S.X Dashboard',
        'Authorization': 'token ' + req.user.token,
        'Content-type': 'application/json',
      },
      body: req.body,
      json: true
    };

    rp(issueCreatePack)
      .then(function(response) {
        res.send(response);
      })
      .catch(function(err) {
        return next(err);
      });
  });

  /**
   * GET /api/tasks
   * Get all the tasks
   */
  app.get('/api/tasks', function(req, res, next) {
    Task.find({user: req.user.id}, function(err, tasks) {
      if (err) {
        return next(err);
      } else {
        res.send(tasks);
      }
    });
  });

  /**
   * POST /api/task
   * Create a new task
   */
  app.post('/api/task', function(req, res, next) {
    Task.findOne({id: req.body.id}, function(err, existingTask) {
        if (existingTask) {
          return next(err);
        } else {
          var task = new Task();
          task.id = req.user.id + req.body.id; //user id and timestamp
          task.name = req.body.name;
          task.repoName = req.body.repoName;
          task.branch = req.body.branch;
          task.issue = req.body.issue;
          task.start = req.body.start;
          task.duration = req.body.duration;
          task.user = req.user.id;
          task.save(function(err) {
            res.send(task);
          });
        }
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

  // Handle user auth
  app.get('*', function(req, res, next) {
    // We don't want to be seeding and generating markup with user information
    var user = req.user ? { authenticated: true, isWaiting: false } : { authenticated: false, isWaiting: false };

    res.locals.data =  {
      UserStore: { user: user }
    };
    next();
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
