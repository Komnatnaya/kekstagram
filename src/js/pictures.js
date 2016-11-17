'use strict';

(function() {
  var createCallback = require('./load');
  var Picture = require('./picture');
  var gallery = require('./gallery');

  var pictureFilter = document.querySelector('.filters');
  pictureFilter.classList.add('hidden');

  var THROTTLE_TIMEOUT = 100;
  var GAP = 200;
  var PICTURES_URL = 'api/pictures';

  var activeFilter = 'filter-popular';
  var container = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var pageNumber = 0;
  var pageSize = 12;

  var renderPictures = function(data) {
    var pictures = data;
    pictures.forEach(function(photo, pictureIndex) {
      container.appendChild(new Picture(photo, pictureIndex).element);
    });
    gallery.setPictures(pictures);
  };

  var loadPictures = function(filter, currentPageNumber) {
    createCallback(PICTURES_URL, {
      from: currentPageNumber * pageSize,
      to: currentPageNumber * pageSize + pageSize,
      filter: filter
    }, renderPictures);
  };

  var checkVisibility = function() {
    var scrollHeight = document.body.scrollHeight;
    var clientHeight = document.body.clientHeight;

    if(clientHeight < scrollHeight) {
      loadPictures(activeFilter, ++pageNumber);
    }
  };

  var changeFilter = function(filterID) {
    container.innerHTML = '';
    activeFilter = filterID;
    pageNumber = 0;
    loadPictures(filterID, pageNumber);
    checkVisibility();
  };

  pictureFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      changeFilter(evt.target.id);
    }
  });

  var lastCall = Date.now();

  window.addEventListener('load', checkVisibility());

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
      if (footer.getBoundingClientRect().top - window.innerHeight <= GAP) {
        loadPictures(activeFilter, ++pageNumber);
      }

      lastCall = Date.now();
    }
  });

  pictureFilter.classList.remove('hidden');
  changeFilter(activeFilter);
})();
