'use strict';

var Gallery = function() {
  this.pictures = [];
  this.activePicture = null;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = document.querySelector('.gallery-overlay-image');
  this.setPictures = this.setPictures.bind(this);
  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);
  this.setActivePicture = this.setActivePicture.bind(this);
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = this.pictures.concat(pictures);
};

Gallery.prototype.show = function(index) {
  var self = this;

  this.galleryOverlayClose.onclick = function() {
    self.hide();
  };

  this.galleryOverlayImage.onclick = function() {
    if(self.activePicture < self.pictures.length - 1) {
      self.setActivePicture(self.activePicture + 1);
    } else {
      self.setActivePicture(0);
    }
  };

  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(index);
};

Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.galleryOverlayClose.onclick = null;
  this.galleryOverlayImage.onclick = null;
};

Gallery.prototype.setActivePicture = function(index) {
  this.activePicture = index;

  if (this.pictures[index].preview) {
    this.galleryOverlayImage.src = this.pictures[index].preview;
  } else {
    this.galleryOverlayImage.src = this.pictures[index].url;
  }

  document.querySelector('.comments-count').textContent = this.pictures[index].comments;
  document.querySelector('.likes-count').textContent = this.pictures[index].likes;
};

module.exports = new Gallery();
