/* jshint esnext: true */

import React from 'react';
import ReactDOM from 'react-dom';

import FollowedRepoSearchStore from 'stores/follow/FollowedRepoSearchStore';
import FollowedRepoSearchActions from 'actions/follow/FollowedRepoSearchActions';

const searchLoading = require('images/packman-loader.gif');

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
        <div key={index} className="result-node">
          <div className="result-title">
            <span className="result-name">{ repo.full_name }</span>
            <span className="result-language">{ repo.language }</span>
          </div>
          <div className="result-stats">
            <span className="result-stars"><i className="fa fa-star-half-o"></i> {repo.stargazers_count} </span>
            <span className="result-forks"><i className="fa fa-code-fork"></i> {repo.forks} </span>
          </div>
        </div>
      );
    });
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <div className="search-loading center">
          <img src={searchLoading} />
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.search.bind(this)} className="search-form">
          <div className="input-field">
            <input type="text" ref="searchText" placeholder="Add a repository to watch" />
          </div>
        </form>
          { this.renderLoading() }
        <div className="search-results">
          { this.renderRepos() }
        </div>
      </div>
    );
  }
}
