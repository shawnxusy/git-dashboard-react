/* jshint esnext:true */

import React from 'react';
import {Link} from 'react-router';

export default class RepoBranchList extends React.Component {

  render() {
    let branchNodes = this.props.branches.map((branch) => {
      return (
        <div key={branch.commit.sha}>
            <div>{branch.name}</div>
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
