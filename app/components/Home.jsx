/* jshint esnext: true */
import React from 'react';
import { Link } from 'react-router';

import FollowedRepoContainer from 'components/follow/FollowedRepoContainer';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="col-xs-6">
          <FollowedRepoContainer />
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
