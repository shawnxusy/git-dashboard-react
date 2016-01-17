/* jshint esnext:true */

import React from 'react';
import {Link} from 'react-router';

export default class RepoList extends React.Component {

  render() {
    let repoNodes = this.props.repos.map((repo) => {
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
        <div> {repoNodes} </div>
      </div>
    );
  }
}
