/* jshint esnext: true */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'components/App';
// import Vote from 'components/Vote';
import About from 'components/About';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Dashboard from 'components/Dashboard';
import Home from 'components/Home';
import RepoContainer from 'components/repo/RepoContainer';
import RepoListContainer from 'components/repo/RepoListContainer';
import TaskListContainer from 'components/task/TaskListContainer';

import UserStore from 'stores/UserStore';

function requireAuth(nextState, replaceState) {
  if (!UserStore.getState().user.get('authenticated')) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

export default (
  <Route component={App} >
    <Route path="/" component={Home} onEnter={requireAuth}>
      <IndexRoute component={RepoListContainer} />
      <Route path="repo/:name" component={RepoContainer} />
      <Route path="task" component={TaskListContainer} />
    </Route>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="about" component={About} onEnter={requireAuth} />
  </Route>
);
