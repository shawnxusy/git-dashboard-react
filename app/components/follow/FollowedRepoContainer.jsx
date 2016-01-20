/* jshint esnext: true */

import React from 'react';
import FollowedRepoStore from 'stores/follow/FollowedRepoStore';
import FollowedRepoActions from 'actions/follow/FollowedRepoActions';

import FollowedRepoSearch from 'components/follow/FollowedRepoSearch';
import FollowedRepo from 'components/follow/FollowedRepo';

export default class FollowedRepoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = FollowedRepoStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FollowedRepoStore.listen(this.onChange);
    FollowedRepoActions.getFollowedRepos();
  }

  componentWillUnmount() {
    FollowedRepoStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(FollowedRepoStore.getState());
  }

  addFollowCallback = () => {
    FollowedRepoActions.getFollowedRepos();
  }

  render() {
    let followedNodes = this.state.followedRepos.map((repo, index) => {
      return (
        <div key={index}>
          <FollowedRepo repo={repo} />
        </div>
      );
    });
    return (
      <div className="follow">
        <FollowedRepoSearch isDone={this.addFollowCallback}/>
        <div className="follow-list">
          {followedNodes}
        </div>
      </div>
    );
  }
}
