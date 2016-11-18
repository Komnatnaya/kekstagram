'use strict';

var gallery = require('./gallery');

var getPictureElement = function(photos) {
  var template = document.querySelector('#picture-template');
  var templateContainer = 'content' in template ? template.content : template;
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);

  pictureElement.querySelector('.picture-comments').textContent = photos.comments;
  pictureElement.querySelector('.picture-likes').textContent = photos.likes;

  var pictureImage = new Image();

  pictureImage.onload = function() {
    var pictureElementImage = pictureElement.querySelector('img');

    pictureElementImage.src = pictureImage.src;
    pictureElementImage.setAttribute('width', 182);
    pictureElementImage.setAttribute('height', 182);
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

var Picture = function(photos, picturesIndex) {
  this.data = photos;
  this.element = getPictureElement(photos);

  this.element.onclick = function(event) {
    event.preventDefault();
    gallery.show(picturesIndex);
  };

  this.element.remove = function() {
    this.element.onclick = null;
  };
};

module.exports = Picture;
