/* jshint esnext: true */

import React from 'react';
import FollowedRepoListStore from 'stores/follow/FollowedRepoListStore';
import FollowedRepoListActions from 'actions/follow/FollowedRepoListActions';

import FollowedRepoSearch from 'components/follow/FollowedRepoSearch';
import FollowedRepo from 'components/follow/FollowedRepo';

export default class FollowedRepoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = FollowedRepoListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FollowedRepoListStore.listen(this.onChange);
    FollowedRepoListActions.getFollowedRepos();
  }

  componentWillUnmount() {
    FollowedRepoListStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(FollowedRepoListStore.getState());
  }

  addFollowCallback = () => {
    FollowedRepoListActions.getFollowedRepos();
  }

  render() {
    let followedNodes = this.state.followedRepos.map((repo, index) => {
      return (
        <div key={index}>
          <FollowedRepo repo={repo}/>
        </div>
      );
    });
    return (
      <div className="follow">
        <FollowedRepoSearch isDone={this.addFollowCallback}/>
        <div className="follow-list-title">Commit activity for the projects you are watching</div>
        <div className="follow-list">
          {followedNodes}
        </div>
      </div>
    );
  }
}
