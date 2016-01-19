/* jshint esnext: true */

import React from 'react';
import ReactDOM from 'react-dom';

import FollowedRepoSearchStore from 'stores/follow/FollowedRepoSearchStore';
import FollowedRepoSearchActions from 'actions/follow/FollowedRepoSearchActions';

export default class FollowedRepoSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = FollowedRepoSearchStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    FollowedRepoSearchStore.listen(this.onChange);
  }

  componentWillUnmount() {
    FollowedRepoSearchStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(FollowedRepoSearchStore.getState());
  }

  search(event) {
    event.preventDefault();
    var searchText = ReactDOM.findDOMNode(this.refs.searchText).value;
    if (searchText) {
      FollowedRepoSearchActions.search(searchText);
    }
  }

  renderRepos() {
    return this.state.repos.map((repo, index) => {
      return (
        <div key={index}>{ repo.full_name }</div>
      );
    });
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <div className="progress blue darken-2">
          <div className="indeterminate blue lighten-3">Loading</div>
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.search.bind(this)}>
          <div className="input-field">
            <label>Add a repo to follow</label>
            <input type="text" ref="searchText"  />
          </div>
        </form>
        { this.renderLoading() }
        <div className="row">
          { this.renderRepos() }
        </div>
      </div>
    );
  }
}
