/* jshint esnext:true */

import React from 'react';
import CreateTask from 'components/task/CreateTask';
import RepoActions from 'actions/repo/RepoActions';

export default class RepoIssue extends React.Component {

  toggleCreateTask = () => {
    let data = {
      type: "issue",
      id: this.props.idx
    }
    RepoActions.toggleCreateTask(data);
  }

  render() {
    return (
      <div className="issue">
        <div className="row">
          <div className="issue-info col-sm-8">
            <div className="issue-title">
              {this.props.issue.title}
            </div>
            <div className="issue-body">
              {this.props.issue.body}
            </div>
          </div>
          <a onClick={this.toggleCreateTask} className="add-task col-sm-3 center">
            <i className={this.props.issue.taskBox ? 'fa fa-times' : 'fa fa-tasks'}></i>
            {this.props.issue.taskBox ? 'Cancel' : 'New Task'}
          </a>
        </div>
        <span className={this.props.issue.taskBox ? '': 'no-display'}><CreateTask isDone={this.toggleCreateTask} issue={this.props.issue} repoName={this.props.repoName} idx={this.props.idx} /></span>
      </div>
    );
  }
}
