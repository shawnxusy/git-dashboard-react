/* jshint esnext:true */

import React from 'react';

import RepoActions from 'actions/repo/RepoActions';

export default class CreateIssue extends React.Component {

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label">Issue title</label>
            <input type="text" className="form-control" ref="titleTextField" placeholder="issue title" value={this.props.newIssue.title}
                   onChange={RepoActions.updateIssueTitle} autoFocus required/>
          </div>
          <div className="form-group">
            <label className="control-label">Issue body</label>
            <textarea type="text" className="form-control" ref="bodyTextField" placeholder="issue body" value={this.props.newIssue.body}
                   onChange={RepoActions.updateIssueBody} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    let title = this.props.newIssue.title.trim();
    let body = this.props.newIssue.body.trim();

    if (!title) {
      this.refs.nameTextField.focus();
    } else if (!body) {
      this.refs.bodyTextField.focus();
    }

    if (title && body) {
      RepoActions.createIssue(title, body, this.props.repoName);
      this.props.isDone();
    }
  }
}
