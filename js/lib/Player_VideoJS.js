var Player_VideoJS = (function() {
  var addEventListenerOnce = function(element, event_name, func) {
    var one_time_function = function() {
      element.removeEventListener(event_name, one_time_function);
      func();
    };
    element.addEventListener(event_name, one_time_function);
  }

  var on_video_ready = function(player_id, callback){
    if(callback != null)
      addEventListenerOnce(document.getElementById(player_id), "canplay", callback);
  }

  var is_initialized = {'core': false, 'youtube': false};

  var init = function(callback) {
    if(callback === undefined) callback = null;

    if(is_initialized['core'] === false) {
      var link_videojs_css = document.createElement('link');
      link_videojs_css.href = 'https://vjs.zencdn.net/6.6.3/video-js.css';
      link_videojs_css.rel = 'stylesheet';
      link_videojs_css.setAttribute("data-videojs", "true");
      document.getElementsByTagName('head')[0].appendChild(link_videojs_css);

      var script_videojs_js = document.createElement('script');
      script_videojs_js.src = 'https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js';
      script_videojs_js.setAttribute("data-videojs", "true");
      document.getElementsByTagName('head')[0].appendChild(script_videojs_js);

      var script = document.createElement("script");
      script.src = "https://vjs.zencdn.net/6.6.3/video.js";
      script.setAttribute("data-videojs", "true");
      if(callback != null) script.onload = callback;
      document.body.appendChild(script);
      is_initialized['core'] = true;
    } else {
      if(callback != null) callback();
    }
  }

  var no_js_message = function() {
    return '\n<p class="vjs-no-js">'
      + '\nTo view this video please enable JavaScript, and consider upgrading to a web browser that'
      + '\n<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>'
      + '\n</p>';
  }

  var init_youtube = function(callback) {
    if(callback === undefined) callback = null;

    if(is_initialized['youtube'] === false) {
      var script = document.createElement("script");
      script.src = "./js/lib/videojs-youtube/Youtube.min.js";
      script.setAttribute("data-videojs", "true");
      if(callback != null) script.onload = callback;
      document.body.appendChild(script);
      is_initialized['youtube'] = true;
    } else {
      if(callback != null) callback();
    }
  }

  var inject_insite_video_player = function(node, player_id, filename, extra_video_elements, callback) {
    if(player_id === undefined) player_id = 'my_video';
    if(extra_video_elements === undefined) extra_video_elements = '';
    if(callback === undefined) callback = null;

    var body_data = '<video id="' + player_id + '" style="width:100%;height:100%;" class="video-js" \n'
      + 'controls playsinline ' + extra_video_elements + ' preload="auto"'
      + '\n data-setup="{}">'
      + '\n<source src="' + (window.backend_url) + 'stream_mp4.php?filename=' + filename + '"'
      + ' type=\'video/mp4\'>'
      + no_js_message()
      + '\n</video>';
    node.innerHTML = body_data;

    on_video_ready(player_id, callback);
  }

  var inject_external_video_player = function(node, player_id, url, extra_video_elements, callback) {
    if(player_id === undefined) player_id = 'my_video';
    if(extra_video_elements === undefined) extra_video_elements = '';
    if(callback === undefined) callback = null;

    var body_data = '<video id="' + player_id + '" style="width:100%;height:100%;" class="video-js" '
      + 'controls playsinline ' + extra_video_elements + ' preload="auto" data-setup="{}">'
      + '\n<source src="' + url + '"'
      + ' type=\'video/mp4\'>'
      + no_js_message()
      + '\n</video>';
    node.innerHTML = body_data;
    
    on_video_ready(player_id, callback);
  }

  var inject_youtube_video_player = function(node, player_id, video_id, extra_video_elements, callback) {
    init_youtube(function() {
      if(player_id === undefined) player_id = 'my_video';
      if(extra_video_elements === undefined) extra_video_elements = '';
      if(callback === undefined) callback = null;

      var body_data = '<video id="' + player_id + '" class="video-js vjs-default-skin" ' +
        'controls playsinline ' + extra_video_elements + ' preload="auto" ' +
        'style="width:100%;height:100%;">' +
        '</video>';
      node.innerHTML = body_data;

      videojs(player_id, {    // data-setup tag
        "techOrder": ["youtube"],   // Also "html5"
        "sources": [{"type": "video/youtube", "src": video_id}], // Also "?playsinline=1" in src
      });

      on_video_ready(player_id, callback);
    });
  }

  return {
    init: init,
    inject_insite_video_player: inject_insite_video_player,
    inject_youtube_video_player: inject_youtube_video_player,
    inject_external_video_player: inject_external_video_player
  }
})();