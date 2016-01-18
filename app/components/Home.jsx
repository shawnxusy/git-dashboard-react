/* jshint esnext: true */
import React from 'react';
import { Link } from 'react-router';

import FollowedRepoList from 'components/FollowedRepoList';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="col-xs-6">
          <FollowedRepoList />
        </div>
        <div className="col-xs-6">
          <Link to="/">Repos</Link>
          <Link to="/task">Tasks</Link>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
    children: React.PropTypes.object
};
