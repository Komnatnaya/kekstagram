'use strict';

var picFilter = document.querySelector('.filters');
picFilter.classList.add('.hidden');

var PICTURES_URL = 'http://localhost:1507/api/pictures?callback=JSONPCallback';

var template = document.querySelector('#picture-template');
var templateContainer = 'content' in template ? template.content : template;
var container = document.querySelector('.pictures');

var getPictureElement = function(photos) {
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);

  pictureElement.querySelector('.picture-comments').textContent = photos.comments;
  pictureElement.querySelector('.picture-likes').textContent = photos.likes;

  var pictureImage = new Image();

  pictureImage.onload = function() {
    pictureElement.querySelector('img').src = pictureImage.src;
    pictureElement.querySelector('img').setAttribute('width', 182);
    pictureElement.querySelector('img').setAttribute('height', 182);
  };

  pictureImage.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
  };

  if (photos.preview) {
    pictureImage.src = photos.preview;
  } else {
    pictureImage.src = photos.url;
  }

  return pictureElement;
};

var createCallback = function(src, callback) {
  var scriptPic = document.createElement('script');
  scriptPic.src = src;
  document.body.appendChild(scriptPic);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};

createCallback(PICTURES_URL, function(data) {
  var pictures = data;
  pictures.forEach(function(photo) {
    container.appendChild(getPictureElement(photo));
  });
});

picFilter.classList.remove('.hidden');
