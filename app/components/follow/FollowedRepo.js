/* jshint esnext:true */

import React from 'react';

export default class FollowedRepo extends React.Component {
  render() {
    return (
      <div>
        {this.props.repo.owner} - {this.props.repo.name}
      </div>
    );
  }
}
