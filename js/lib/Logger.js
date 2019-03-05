var Logger = (function(){
  var debug_mode=false;

  var enable = function(){
    debug_mode=true;
  }

  var log = function(){
    if(debug_mode) console.log.apply(null, arguments);
  }

  return {
    enable: enable,
    log: log
  }
})();