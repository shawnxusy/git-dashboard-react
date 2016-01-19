import React from 'react';
import { Link } from 'react-router';

import UserActions from 'actions/UserActions';

export default class Navigation extends React.Component {

  onLogout = () => {
    UserActions.logout();
  }

  isAuthenticated() {
    return this.props.UserStore.user.get('authenticated');
  }

  render() {
    return (
      <nav role="navigation">
          <i className="fa fa-github-alt nav-github-icon"></i>
          <Link to="/" className='' activeClassName=''>Dashboard</Link>
          { this.isAuthenticated() ? (
            <Link onClick={this.onLogout} to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )}
      </nav>
    );
  }

}

Navigation.propTypes = { UserStore: React.PropTypes.object };
