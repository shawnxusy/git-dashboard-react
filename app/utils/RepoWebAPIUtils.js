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
  }

};

export default utils;
