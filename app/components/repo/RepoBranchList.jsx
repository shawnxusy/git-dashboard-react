/* jshint esnext:true */

import React from 'react';
import RepoBranch from 'components/repo/RepoBranch';

export default class RepoBranchList extends React.Component {

  render() {
    let branchNodes = this.props.branches.map((branch) => {
      return (
        <div key={branch.commit.sha}>
          <RepoBranch branch={branch} repoName={this.props.repoName} />
        </div>
      );
    });

    return (
      <div>
        <div> {branchNodes} </div>
      </div>
    );

  }
}
