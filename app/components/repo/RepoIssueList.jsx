/* jshint esnext:true */

import React from 'react';
import {Link} from 'react-router';

export default class RepoIssueList extends React.Component {

  render() {
    let issueNodes = this.props.issues.map((issue) => {
      return (
        <div key={issue.id}>
            <div>Title: {issue.title} Body: {issue.body}</div>
        </div>
      );
    });

    return (
      <div>
        <div> {issueNodes} </div>
      </div>
    );
  }
}
