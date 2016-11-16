'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-popular':
      list.sort(function(a, b) {
        return b.likes - a.likes;
      });
      break;

    case 'filter-new':
      var lastThreeDays = Date.now() - (1000 * 3600 * 24 * 3);

      list.filter(function(item) {
        return item.created >= lastThreeDays;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
      break;

    case 'filter-discussed':
      list.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
  }
  return list;
};
