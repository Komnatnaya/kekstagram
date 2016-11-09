'use strict';

var pictures = function () {
  var createCallback = require('./load');
  var getPictureElement = require('./picture');

  var picFilter = document.querySelector('.filters');
  picFilter.classList.add('.hidden');

  var PICTURES_URL = 'http://localhost:1507/api/pictures?callback=JSONPCallback';
  var container = document.querySelector('.pictures');

  createCallback(PICTURES_URL, function(data) {
    var pictures = data;
    pictures.forEach(function(photo) {
      container.appendChild(getPictureElement(photo));
    });
  });

  picFilter.classList.remove('.hidden');
};

module.exports = pictures;