/**
    * Set room content.
    * 
    * @param {string} video_container_id 
    * @param {string} video_player_id 
    * @param {string} room_data
    * @param {function} callback - Callback to execute on success.
    */
function set_room_content(video_container_id, video_player_id, room_data, callback) {
  if(callback === undefined) callback = null;

  Player_VideoJS.init(function() {
    window.history.replaceState({}, document.title, './#roomcode=' + room_data.roomcode);
    SPA.setVar("roomcode", room_data.roomcode);
    SPA.setVar("video_to_play", room_data.stream_key);
    var video_to_play = room_data.stream_key;
    if(room_data.stream_type == 'local' || room_data.stream_type == 'youtube') {
      Player_VideoJS.inject_insite_video_player(
        video_container_id,
        video_player_id,
        video_to_play,
        '',
        function() {
          attach_videojs_handler("my_video");
          if(callback != null) callback();
        }
      );
    } else if(room_data.stream_type == 'external_mp4') {
      var inject_video_player = function(video){
        Player_VideoJS.inject_external_video_player(
          video_container_id,
          video_player_id,
          video,
          '',
          function() {
            Room.attach_videojs_handler("my_video");
            if(callback != null) callback();
          }
        );
      }

      if(video_to_play.startsWith("blob:http") && SPA.getVariable("blob_loaded") == null) {
        JSLoader.load_once("lib/LocalFileSelector.js", function() {
          document.getElementById("video_selector").style.display = "block";
          LocalFileSelector.listenTo("video_selector", function(file) {
            inject_video_player(file);
          });
        })
      } else {
        inject_video_player(video_to_play);
      }
    }
  });
}