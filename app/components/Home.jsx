import React from 'react';

import FollowedRepoList from 'components/FollowedRepoList';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="col-xs-6">
          <FollowedRepoList />
        </div>
        <div className="col-xs-6">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
    children: React.PropTypes.object
};
