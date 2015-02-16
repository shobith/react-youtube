/**
 * Module dependencies
 */

var load = require('require-sdk');

/**
 * Expose `createPlayer`
 */

module.exports = createPlayer;

/**
 * Create a new `player` by requesting and using the YouTube Iframe API
 *
 * @param {String} id - reference to element for player
 * @param {Function} cb
 */

function createPlayer(id, cb) {
  var sdk = loadApi();

  return sdk(function(err) {
    var player = new YT.Player(id);
    return cb(player);
  });
}

/**
 * Load the YouTube API
 *
 * @returns {Function}
 */

function loadApi() {
  var sdk = load('https://www.youtube.com/iframe_api', 'YT');
  var loadTrigger = sdk.trigger();

  /**
   * The YouTube API requires a global ready event handler.
   * The YouTube API really sucks.
   */

  window.onYouTubeIframeAPIReady = function () {
    loadTrigger();
    delete window.onYouTubeIframeAPIReady;
  };

  return sdk;
}
