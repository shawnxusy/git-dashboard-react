/* jshint esnext:true */

import React from 'react';
import CreateRepoStore from 'stores/repo/CreateRepoStore';
import CreateRepoActions from 'actions/repo/CreateRepoActions';

export default class CreateRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = CreateRepoStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CreateRepoStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CreateRepoStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className={'form-group ' + this.state.nameValidationState}>
            <label className="control-label">Repository Name</label>
            <input type="text" className="form-control" ref="nameTextField" value={this.state.name}
                   onChange={CreateRepoActions.updateName} autoFocus/>
            <span className="help-block">{this.state.helpBlock}</span>
          </div>
          <div className={'form-group ' + this.state.descriptionValidationState}>
            <label className="control-label">Description</label>
            <input type="text" className="form-control" ref="descriptionTextField" value={this.state.description}
                   onChange={CreateRepoActions.updateDescription} />
          </div>
          <div className="form-group">
            <label className="control-label">Homepage</label>
            <input type="text" className="form-control" value={this.state.homepage}
                   onChange={CreateRepoActions.updateHomepage} />
          </div>
          <div className="form-group">
            <div className="radio radio-inline">
              <input type="radio" name="privacy" id="public" value="public" checked={this.state.privacy === 'public'}
                     onChange={CreateRepoActions.updatePrivacy}/>
              <label htmlFor="public">Public</label>
            </div>
            <div className="radio radio-inline">
              <input type="radio" name="privacy" id="private" value="private" checked={this.state.privacy === 'private'}
                     onChange={CreateRepoActions.updatePrivacy}/>
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

    let name = this.state.name.trim();
    let description = this.state.description;
    let homepage = this.state.homepage;
    let privacy = this.state.privacy;

    if (!name) {
      CreateRepoActions.invalidName();
      this.refs.nameTextField.focus();
    } else if (!description) {
      CreateRepoActions.invalidDescription();
      this.refs.descriptionTextField.focus();
    }

    if (name && description) {
      CreateRepoActions.createRepo(name, description, homepage, privacy);
      // Update the RepoList via callback
      this.props.addRepo();
    }
  }
}
