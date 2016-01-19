/* jshint esnext:true */

import React from 'react';

const githubImageBye = require('images/github-image-bye.png');

export default class Logout extends React.Component {
  render() {
    return (
      <div className="logout center">
        <h3>Ciao!</h3>
        <img src={githubImageBye} id="logout-github-image" />
      </div>
    );
  }
}
