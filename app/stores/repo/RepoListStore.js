/* jshint esnext:true */

import alt from 'altInstance';
import RepoListActions from 'actions/repo/RepoListActions';

class RepoListStore {
  constructor() {
    this.bindActions(RepoListActions);
    this.repos = [];
    this.newRepo = {
      name: "",
      description: "",
      homepage: "",
      privacy: "public"
    };
  }

  static displayName = 'ReposStore';

  onGetReposSuccess(data) {
    this.repos = data;
    this.emitChange();
  }

  onGetReposFail(errorMessage) {
    console.log(errorMessage);
  }

  onCreateRepoSuccess(newRepo) {
    this.repos.unshift(newRepo);

    // Reset input box
    this.newRepo.name = "";
    this.newRepo.description = "";
    this.newRepo.homepage = "";
    this.newRepo.privacy = "public";

    this.emitChange();
  }

  onCreateGetRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onUpdateName(event) {
    this.newRepo.name = event.target.value;
    this.emitChange();
  }

  onUpdateDescription(event) {
    this.newRepo.description = event.target.value;
    this.emitChange();
  }

  onUpdateHomepage(event) {
    this.newRepo.homepage = event.target.value;
    this.emitChange();
  }

  onUpdatePrivacy(event) {
    this.newRepo.privacy = event.target.value;
    this.emitChange();
  }
}

export default alt.createStore(RepoListStore);
