/* jshint esnext: true */

import React from 'react';

import FollowedRepoSearch from 'components/follow/FollowedRepoSearch';

export default class FollowedRepoList extends React.Component {

  render() {
    return (
      <div className="follow">
        <FollowedRepoSearch />
      </div>

    );
  }
}
