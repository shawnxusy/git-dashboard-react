import React from 'react';
import { Link } from 'react-router';

import UserActions from 'actions/UserActions';

export default class Navigation extends React.Component {

  onLogout = () => {
    UserActions.logout();
  }

  render() {
    return (
      <nav role="navigation">
          <Link to="/" className='' activeClassName=''>Ninja Ocean</Link>
          { this.props.UserStore.user.get('authenticated') ? (
            <Link onClick={this.onLogout} to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )}
      </nav>
    );
  }

}

Navigation.propTypes = { UserStore: React.PropTypes.object };
