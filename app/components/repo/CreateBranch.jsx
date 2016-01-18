/* jshint esnext:true */

import React from 'react';
import _ from 'lodash';

import RepoActions from 'actions/repo/RepoActions';

export default class CreateBranch extends React.Component {

  render() {
    let branchOptions = this.props.branches.map((branch, index) => {
      return (
        <option value={branch.name} key={index}>{branch.name}</option>
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label">Branch Name</label>
            <input type="text" className="form-control" ref="nameTextField" value={this.props.newBranch.name}
                   onChange={RepoActions.updateBranchName} autoFocus/>
          </div>
          <div className="form-group">
            <label className="control-label">Branch from:</label>
            <select className="form-control" ref="branchFromField" value={this.props.newBranch.branchFrom}
                   onChange={RepoActions.updateBranchFrom} >
               {branchOptions}
             </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.props.newBranch.name.trim();
    let branchFrom = this.props.newBranch.branchFrom;
    console.log(branchFrom);

    if (!name) {
      this.refs.nameTextField.focus();
    } else if (!branchFrom) {
      this.refs.branchFromField.focus();
    }

    if (name && branchFrom) {
      let sha = _.find(this.props.branches, function(branch) {
        return branch.name === branchFrom;
      }).commit.sha;

      name = "refs/heads/" + name; // as required by git post ref API

      RepoActions.createBranch(name, sha, this.props.repoName);
      this.props.isDone();
    }
  }
}
