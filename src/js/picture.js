'use strict';

var getPictureElement = function(photos) {
  var template = document.querySelector('#picture-template');
  var templateContainer = 'content' in template ? template.content : template;
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

module.exports = getPictureElement;
