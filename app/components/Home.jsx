/* jshint esnext: true */
import React from 'react';

import FollowedRepoContainer from 'components/follow/FollowedRepoContainer';
import UserProfile from 'components/user/UserProfile';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="col-lg-6">
          <FollowedRepoContainer />
        </div>
        <div className="col-lg-6">
          <UserProfile />
          {this.props.children}
        </div>
      </div>
    );
  }
}
