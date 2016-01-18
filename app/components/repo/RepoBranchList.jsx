/* jshint esnext:true */

import React from 'react';
import RepoBranch from 'components/repo/RepoBranch';

export default class RepoBranchList extends React.Component {

  render() {
    let branchNodes = this.props.branches.map((branch, index) => {
      return (
        <div key={index}>
          <RepoBranch branch={branch} repoName={this.props.repoName} idx={index} />
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
