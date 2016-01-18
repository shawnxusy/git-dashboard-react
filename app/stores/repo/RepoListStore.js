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
    this.createRepo = false;
  }

  static displayName = 'ReposStore';

  onGetReposSuccess(data) {
    this.repos = data;
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
  }

  onCreateGetRepoFail(errorMessage) {
    console.log(errorMessage);
  }

  onUpdateName(event) {
    this.newRepo.name = event.target.value;
  }

  onUpdateDescription(event) {
    this.newRepo.description = event.target.value;
  }

  onUpdateHomepage(event) {
    this.newRepo.homepage = event.target.value;
  }

  onUpdatePrivacy(event) {
    this.newRepo.privacy = event.target.value;
  }

  onToggleCreateRepo() {
    this.createRepo = !this.createRepo;
  }
}

export default alt.createStore(RepoListStore);
