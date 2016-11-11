'use strict';

(function() {
  var createCallback = require('./load');
  var getPictureElement = require('./picture');
  var gallery = require('./gallery');

  var picFilter = document.querySelector('.filters');
  picFilter.classList.add('.hidden');

  var PICTURES_URL = 'http://localhost:1507/api/pictures?callback=JSONPCallback';
  var container = document.querySelector('.pictures');

  createCallback(PICTURES_URL, function(data) {
    var pictures = data;
    pictures.forEach(function(photo, pictureIndex) {
      container.appendChild(getPictureElement(photo, pictureIndex));
    });
    gallery.setPictures(pictures);
  });

  picFilter.classList.remove('.hidden');
})();
