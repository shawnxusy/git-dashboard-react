/* jshint esnext:true */

import React from 'react';
import CreateTask from 'components/task/CreateTask';
import RepoActions from 'actions/repo/RepoActions';

export default class RepoIssue extends React.Component {

  toggleCreateTask = () => {
    let data = {
      type: "issue",
      id: this.props.issue.id
    }
    RepoActions.toggleCreateTask(data);
  }

  render() {
    return (
      <div key={this.props.issue.id}>
        {this.props.issue.title}
        <a onClick={this.toggleCreateTask}>Create task</a>
        <span className={this.props.issue.taskBox ? '': 'no-display'}><CreateTask isDone={this.toggleCreateTask} issueName={this.props.issue.title} repoName={this.props.repoName}/></span>
      </div>
    );
  }
}
