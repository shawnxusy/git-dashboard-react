/* jshint esnext:true */

import React from 'react';
import RepoStore from '../../stores/repo/RepoStore';
import RepoActions from '../../actions/repo/RepoActions';

export default class Repo extends React.Component {
  constructor(props) {
    super(props);
    this.state = RepoStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RepoStore.listen(this.onChange);
    RepoActions.getRepo(this.props.params.name);
  }

  componentWillUnmount() {
    RepoStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h3 className='text-center'>This is showing a single repo!</h3>
        <div>
          {this.state.repo.id} - {this.state.repo.name}
        </div>
      </div>
    );
  }
}

Repo.propTypes = {

};
