'use strict';

(function() {
  var createCallback = require('./load');
  var Picture = require('./picture');
  var gallery = require('./gallery');
  var throttle = require('./throttle');

  var pictureFilter = document.querySelector('.filters');
  pictureFilter.classList.add('hidden');

  var THROTTLE_TIMEOUT = 100;
  var GAP = 200;
  var PICTURES_URL = 'api/pictures';

  var activeFilter = localStorage.getItem('activeFilter') || 'filter-popular';
  var container = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var pageNumber = 0;
  var pageSize = 12;

  var renderPictures = function(data) {
    var pictures = data;
    pictures.forEach(function(photo, pictureIndex) {
      container.appendChild(new Picture(photo, pictureIndex + pageNumber * pageSize).element);
    });
    gallery.setPictures(pictures);

    if(!pictures.length) {
      window.removeEventListener('scroll', getNewPicturesThrottle);
    }
  };

  var loadPictures = function(filter, currentPageNumber) {
    createCallback(PICTURES_URL, {
      from: currentPageNumber * pageSize,
      to: currentPageNumber * pageSize + pageSize,
      filter: filter
    }, renderPictures);
  };

  clickFilter();

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
    gallery.clearPictures();
    loadPictures(filterID, pageNumber);
    checkVisibility();
  };

  function clickFilter() {
    document.getElementById(activeFilter).checked = true;
  }

  pictureFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      changeFilter(evt.target.id);
      window.addEventListener('scroll', getNewPicturesThrottle);
      localStorage.setItem('activeFilter', activeFilter);
    }
  });

  window.addEventListener('load', checkVisibility());

  var getNewPicturesThrottle = throttle(function() {
    if (footer.getBoundingClientRect().top - window.innerHeight <= GAP) {
      loadPictures(activeFilter, ++pageNumber);
    }
  }, THROTTLE_TIMEOUT);

  window.addEventListener('scroll', getNewPicturesThrottle);

  pictureFilter.classList.remove('hidden');
  changeFilter(activeFilter);
})();
