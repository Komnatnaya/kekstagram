'use strict';

var createCallback = function(src, callback) {
  var scriptPic = document.createElement('script');
  scriptPic.src = src;
  document.body.appendChild(scriptPic);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};

module.exports = createCallback;
