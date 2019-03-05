var HashRouting = (function(){
  var req_get_parameters = {};

  var init = function(){
    var hash = window.location.hash.substr(1);
    if(hash !== ''){
      var array_split_union = hash.split("&");
      for(var i=0; i<array_split_union.length; i++){
        var combo = array_split_union[i].split("=");
        if(combo.length == 2)
          req_get_parameters[combo[0]]=combo[1];
      }
    }
  }

  var get_parameter = function(key){
    return req_get_parameters[key];
  }
  
  init();

  return {
    get_parameter: get_parameter
  }
})();