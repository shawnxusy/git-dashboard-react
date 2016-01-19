/* jshint esnext:true */

import React from 'react';

import UserProfileStore from 'stores/user/UserProfileStore';
import UserProfileActions from 'actions/user/UserProfileActions';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserProfileStore.listen(this.onChange);
    UserProfileActions.getUserProfile();
  }

  componentWillUnmount() {
    UserProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className="profile row">
        <div className="col-sm-3">
          <div className="avatar-container center">
            <img src={this.state.userProfile.avatar_url} id="user-avatar" className="vertical-center" />
          </div>
        </div>
        <div className="username col-sm-2">
          <h3>{this.state.userProfile.name}</h3>
        </div>
        <div className="userstats col-sm-offset-1 col-sm-6">
          <p><i className="fa fa-users"></i> {this.state.userProfile.followers} followers</p>
          <p><i className="fa fa-binoculars"></i> {this.state.userProfile.following} following</p>
          <p><i className="fa fa-archive"></i> {this.state.userProfile.public_repos} public repos</p>
          <i className="fa fa-link"></i><a href={this.state.userProfile.html_url}>{this.state.userProfile.html_url}</a>
        </div>
      </div>
    );
  }
}
