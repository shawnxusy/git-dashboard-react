/* jshint esnext:true */

import React from 'react';
import ReposStore from 'stores/repo/ReposStore';
import CreateRepo from 'components/repo/CreateRepo';
import RepoList from 'components/repo/RepoList';
import ReposActions from 'actions/repo/ReposActions';

export default class RepoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ReposStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ReposStore.listen(this.onChange);
    ReposActions.getRepos();
  }

  componentWillUnmount() {
    ReposStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Here is a list of your repos!</h3>
        <CreateRepo newRepo={this.state.newRepo} />
        <RepoList repos={this.state.repos} />
      </div>
    );
  }

}
