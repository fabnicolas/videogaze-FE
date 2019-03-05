var Logger = (function(){
  var debug_mode=false;

  var log = function(){}

  var enable = function(){
    this.log = console.log.bind(window.console);
  }

  return {
    enable: enable,
    log: log
  }
})();