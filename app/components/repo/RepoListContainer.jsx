/* jshint esnext:true */

import React from 'react';
import { Link } from 'react-router';

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
      <div className="repos">
        <div className="row">
          <p className="title col-sm-4">Public Repos</p>
          <div className="links col-sm-offset-4 col-sm-4">
            <div className="toggle toggle-on">Repos</div>
            <Link to="/task" className="toggle">Tasks</Link>
          </div>
        </div>
        <a onClick={this.toggleCreateRepo} className="create-new-clicker center">
          <i className={this.state.createRepo ? 'fa fa-times' : 'fa fa-plus'}></i>
          {this.state.createRepo ? 'Cancel' : 'New Repo'}
          </a>
        <div className={this.state.createRepo ? '' : 'no-display'}>
          <CreateRepo newRepo={this.state.newRepo} isDone={this.toggleCreateRepo} />
        </div>
        <RepoList repos={this.state.repos} />
      </div>
    );
  }
}
