/* jshint esnext:true */

import alt from 'altInstance';
import CreateRepoActions from 'actions/repo/CreateRepoActions';

class CreateRepoStore {
  constructor() {
    this.bindActions(CreateRepoActions);
    this.name = '';
    this.description = '';
    this.homepage = '';
    this.privacy = 'public';
    this.nameValidationState = '';
    this.descriptionValidationState = '';
  }

  static displayName = 'CreateRepoStore';

  onCreateRepoSuccess(successMessage) {
    console.log(successMessage);
  }

  onCreateGetRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }

  onUpdateDescription(event) {
    this.description = event.target.value;
  }

  onUpdateHomepage(event) {
    this.homepage = event.target.value;
  }

  onUpdatePrivacy(event) {
    this.privacy = event.target.value;
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a repo name.';
  }

  onInvalidDescription() {
    this.descriptionValidationState = 'has-error';
    this.helpBlock = 'Please enter a description';
  }

}

export default alt.createStore(CreateRepoStore);
