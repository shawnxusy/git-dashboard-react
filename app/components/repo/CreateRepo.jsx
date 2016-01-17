/* jshint esnext:true */

import React from 'react';
import ReposActions from 'actions/repo/ReposActions';

export default class CreateRepo extends React.Component {

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label">Repository Name</label>
            <input type="text" className="form-control" ref="nameTextField" value={this.props.newRepo.name}
                   onChange={ReposActions.updateName} autoFocus/>
          </div>
          <div className="form-group">
            <label className="control-label">Description</label>
            <input type="text" className="form-control" ref="descriptionTextField" value={this.props.newRepo.description}
                   onChange={ReposActions.updateDescription} />
          </div>
          <div className="form-group">
            <label className="control-label">Homepage</label>
            <input type="text" className="form-control" value={this.props.newRepo.homepage}
                   onChange={ReposActions.updateHomepage} />
          </div>
          <div className="form-group">
            <div className="radio radio-inline">
              <input type="radio" name="privacy" id="public" value="public" checked={this.props.newRepo.privacy === 'public'}
                     onChange={ReposActions.updatePrivacy}/>
              <label htmlFor="public">Public</label>
            </div>
            <div className="radio radio-inline">
              <input type="radio" name="privacy" id="private" value="private" checked={this.props.newRepo.privacy === 'private'}
                     onChange={ReposActions.updatePrivacy}/>
              <label htmlFor="private">Private</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.props.newRepo.name.trim();
    let description = this.props.newRepo.description;
    let homepage = this.props.newRepo.homepage;
    let privacy = this.props.newRepo.privacy;

    if (!name) {
      this.refs.nameTextField.focus();
    } else if (!description) {
      this.refs.descriptionTextField.focus();
    }

    if (name && description) {
      ReposActions.createRepo(name, description, homepage, privacy);
    }
  }
}
