/* jshint esnext: true */
import $ from 'jquery';

const utils = {
  /*
   * @param
   * @return {Promise}
   */
  getRepos: () => {
    return $.ajax({
      url: '/api/repos',
      type: 'GET'
    });
  },

  getRepo: (repoName) => {
    return $.ajax({
      url: '/api/repo/' + repoName,
      type: 'GET'
    });
  },

  createRepo: (name, description, homepage, privacy) => {
    return $.ajax({
      url: '/api/repo',
      type: 'POST',
      data: {name: name, description: description, homepage: homepage, 'private': privacy}
    });
  },

  getBranches: (repoName) => {
    return $.ajax({
      url: '/api/branches/' + repoName,
      type: 'GET'
    });
  },

  getBranch: (repoName, branchName) =>{
    return $.ajax({
      url: '/api/branch/' + repoName + '/' + branchName,
      type: 'GET'
    });
  },

  createBranch: (name, branchFrom, repoName) => {
    return $.ajax({
      url: '/api/' + repoName + '/branch',
      type: 'POST',
      data: {ref: name, sha: branchFrom}
    });
  },

  getIssues: (repoName) => {
    return $.ajax({
      url: '/api/issues/' + repoName,
      type: 'GET'
    });
  },

  createIssue: (title, body, repoName) => {
    return $.ajax({
      url: '/api/' + repoName + '/issue',
      type: 'POST',
      data: {title: title, body: body}
    });
  }

};

export default utils;
