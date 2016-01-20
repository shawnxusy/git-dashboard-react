/* jshint esnext:true */

import React from 'react';
import {Link} from 'react-router';

export default class RepoList extends React.Component {

  render() {
    let repoNodes = this.props.repos.map((repo) => {
      return (
        <Link to={'/repo/' + repo.name} key={repo.id} className="repo-node row">
          <div className="repo-wrapper col-sm-10">
            <div className="repo-name">{repo.name}</div>
            <div className="repo-stats row">
              <div className="col-lg-4"><i className="fa fa-star-half-o"></i>{repo.stargazers_count} stars</div>
              <div className="col-lg-4"><i className="fa fa-eye"></i>{repo.watchers_count} watchers</div>
              <div className="col-lg-4"><i className="fa fa-code-fork"></i>{repo.forks_count} forks</div>
            </div>
          </div>
          <div className="repo-arrow col-sm-2"><i className="fa fa-arrow-circle-o-right"></i></div>
        </Link>
      );
    });

    return (
      <div className="repo-list">
        <div> {repoNodes} </div>
      </div>
    );
  }
}
