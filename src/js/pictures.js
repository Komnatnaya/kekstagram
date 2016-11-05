'use strict';

var pictures = [{
  "likes": 40,
  "comments": 12,
  "url": "photos/1.jpg"
}, {
  "likes": 125,
  "comments": 49,
  "url": "photos/2.jpg"
}, {
  "likes": 350,
  "comments": 20,
  "url": "failed.jpg"
}, {
  "likes": 61,
  "comments": 0,
  "url": "photos/4.jpg"
}, {
  "likes": 100,
  "comments": 18,
  "url": "photos/5.jpg"
}, {
  "likes": 88,
  "comments": 56,
  "url": "photos/6.jpg"
}, {
  "likes": 328,
  "comments": 24,
  "url": "photos/7.jpg"
}, {
  "likes": 4,
  "comments": 31,
  "url": "photos/8.jpg"
}, {
  "likes": 328,
  "comments": 58,
  "url": "photos/9.jpg"
}, {
  "likes": 25,
  "comments": 65,
  "url": "photos/10.jpg"
}, {
  "likes": 193,
  "comments": 31,
  "url": "photos/11.jpg"
}, {
  "likes": 155,
  "comments": 7,
  "url": "photos/12.jpg"
}, {
  "likes": 369,
  "comments": 26,
  "url": "photos/13.jpg"
}, {
  "likes": 301,
  "comments": 42,
  "url": "photos/14.jpg"
}, {
  "likes": 241,
  "comments": 27,
  "url": "photos/15.jpg"
}, {
  "likes": 364,
  "comments": 2,
  "url": "photos/16.jpg"
}, {
  "likes": 115,
  "comments": 21,
  "url": "photos/17.jpg"
}, {
  "likes": 228,
  "comments": 29,
  "url": "photos/18.jpg"
}, {
  "likes": 53,
  "comments": 26,
  "url": "photos/19.jpg"
}, {
  "likes": 240,
  "comments": 46,
  "url": "photos/20.jpg"
}, {
  "likes": 290,
  "comments": 69,
  "url": "photos/21.jpg"
}, {
  "likes": 283,
  "comments": 33,
  "url": "photos/22.jpg"
}, {
  "likes": 344,
  "comments": 65,
  "url": "photos/23.jpg"
}, {
  "likes": 216,
  "comments": 27,
  "url": "photos/24.jpg"
}, {
  "likes": 241,
  "comments": 36,
  "url": "photos/25.jpg"
}, {
  "likes": 100,
  "comments": 11,
  "url": "photos/26.mp4",
  "preview": "photos/26.jpg"
}];

var picFilter = document.querySelector('.filters');
picFilter.classList.add('.hidden');

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

pictures.forEach(function(photo) {
    container.appendChild(getPictureElement(photo));
});

picFilter.classList.remove('.hidden');
