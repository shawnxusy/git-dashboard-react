/* jshint esnext:true */

import React from 'react';
import {Link} from 'react-router';
import RepoListStore from 'stores/repo/RepoListStore';
import RepoListActions from 'actions/repo/RepoListActions';
import CreateRepo from 'components/repo/CreateRepo';

export default class RepoList extends React.Component {
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

  render() {
    let repoNodes = this.state.repos.map((repo) => {
      return (
        <div key={repo.id}>
          <Link to={'/repo/' + repo.name}>
            <div>{repo.name}</div>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <h3 className="text-center">Here is a list of your repos!</h3>
        <CreateRepo addRepo={this.handleAddRepo.bind(this)}/>
        <div> {repoNodes} </div>
      </div>
    );
  }

  handleAddRepo() {
    RepoListActions.getRepos();
    console.log("Repolist.jsx: ", this.state.repos);
  }
}
