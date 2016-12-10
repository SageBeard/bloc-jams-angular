(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};
    
    var currentAlbum = Fixtures.getAlbum();
    /**
     * @desc Returns albumPicasso
     * @type {Object}
     */
    
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    
    /**
     * @function getSongIndex
     * @desc returns index of song
     * @type {object}
     */
    
    SongPlayer.currentSong = null;

     /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null; 
    var currentBuzzObject = null;
    
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
 
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
      
      currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
      
      SongPlayer.currentSong = song;
    };
    
    /**
      * @function songPlayer.play
      * @desc Sets & plays new song if new song is clicked
      * @type {Object}
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);//currentBuzzObject.play();
        //song.playing = true;
      } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
 };
    /**
      * @function playSong
      * @desc Plays current song, sets property of song to true
      * @type {Object}
    */
    
     SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;

      if (currentSongIndex < 0) {
         stopSong(song);
       } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
  };
    
    /**
     * @function songPlayer.previous
     * @desc plays previous song
     * @type {Object}
    */
    
    SongPlayer.next = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;

      if (currentSongIndex < 0) {
         currentBuzzObject.pause();
         SongPlayer.currentSong.playing = null;
       } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
  };
    
    /**
     * @function songPlayer.next
     * @desc plays next song
     * @type {Object}
    */
   
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };
 
  /** * @function setCurrentTime
  * @desc Set current time (in seconds) of currently playing song
  * @param {Number} time
  */
    
    SongPlayer.volume = function(value) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(value);
      }
    };
    
    
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };
     /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
    
    function playSong(song) {
      currentBuzzObject.play();
      song.playing = true;
    }
    
    function stopSong(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }
    
    return SongPlayer;
}
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();