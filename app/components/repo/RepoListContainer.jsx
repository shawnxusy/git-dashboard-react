/* jshint esnext:true */

import React from 'react';
import RepoListStore from 'stores/repo/RepoListStore';
import CreateRepo from 'components/repo/CreateRepo';
import RepoList from 'components/repo/RepoList';
import RepoListActions from 'actions/repo/RepoListActions';

export default class RepoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = RepoListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RepoListStore.listen(this.onChange);
    RepoListActions.getRepos();
  }

  componentWillUnmount() {
    RepoListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  toggleCreateRepo = () => {
    RepoListActions.toggleCreateRepo();
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Here is a list of your repos!</h3>
        <a onClick={this.toggleCreateRepo}>Create new repo</a>
        <div className={this.state.createRepo ? '' : 'no-display'}>
          <CreateRepo newRepo={this.state.newRepo} isDone={this.toggleCreateRepo} />
        </div>
        <RepoList repos={this.state.repos} />
      </div>
    );
  }
}
