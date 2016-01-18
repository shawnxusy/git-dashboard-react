/* jshint esnext:true */

import React from 'react';
import RepoIssue from 'components/repo/RepoIssue';

export default class RepoIssueList extends React.Component {

  render() {
    let issueNodes = this.props.issues.map((issue) => {
      return (
        <div key={issue.id}>
          <RepoIssue issue={issue} repoName={this.props.repoName} />
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
