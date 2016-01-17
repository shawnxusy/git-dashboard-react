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

  getIssues: (repoName) => {
    return $.ajax({
      url: '/api/issues/' + repoName,
      type: 'GET'
    });
  }

};

export default utils;
