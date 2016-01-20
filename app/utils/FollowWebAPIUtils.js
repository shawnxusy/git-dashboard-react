/* jshint esnext: true */
import $ from 'jquery';

const utils = {

  searchRepo: (searchText) => {
    return $.ajax({
      url: 'https://api.github.com/search/repositories?q=' + searchText,
      type: 'GET'
    });
  },

  addFollow: (owner, name) => {
    return $.ajax({
      url: "/api/follow",
      type: 'POST',
      data: {owner: owner, name: name}
    });
  },

  getFollowedRepos: () => {
    return $.ajax({
      url: "/api/follow",
      type: "GET"
    });
  }
};

export default utils;
