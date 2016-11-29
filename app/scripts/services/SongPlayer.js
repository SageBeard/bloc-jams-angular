(function() {
  function SongPlayer() {
    var SongPlayer = {};
    
    var currentSong = null;
    var currentBuzzObject = null;

    
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
 
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
      
      currentSong = song;
    };
    
    /**
      * @function songPlayer.play
      * @desc Sets & plays new song if new song is clicked
      * @type {Object}
    */
    SongPlayer.play = function(song) { 
      if (currentSong !== song) {
        setSong(song);
        playSong(song);//currentBuzzObject.play();
        //song.playing = true;
      } else if (currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
    } 
  };
    /**
      * @function songPlayer.pause
      * @desc Pauses currently playing song 
      * @type {Object}
    */
    
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
 };
    /**
      * @function playSong
      * @desc Plays current song, sets property of song to true
      * @type {Object}
    */
    function playSong(song) {
      currentBuzzObject.play();
      song.playing = true;
    }
    
    return SongPlayer;
}
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();