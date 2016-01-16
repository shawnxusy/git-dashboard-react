/* jshint esnext:true */

import React from 'react';
import {Link} from 'react-router';
import RepoListStore from '../../stores/repo/RepoListStore';
import RepoListActions from '../../actions/repo/RepoListActions';

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
    var repoNodes = this.state.repos.map((repo, index) => {
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
        <h3 className='text-center'>Here is a list of your repos!</h3>
        <div> {repoNodes} </div>
      </div>
    );
  }
}

RepoList.propTypes = {

};
