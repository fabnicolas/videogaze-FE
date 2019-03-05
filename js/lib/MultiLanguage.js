var _lang = (function() {
  var user_language;
  var lang = {};

  var init = function() {
    user_language = navigator.language || navigator.userLanguage;
    user_language = user_language.substring(0,2);
  }

  var getActualLanguage = function() {
    return user_language;
  }

  var loadActualLanguage = function(callback) {
    return loadLanguage(user_language, callback);
  }

  var loadLanguage = function(language_name, callback) {
    if(callback === undefined) callback = null;

    if(!(language_name == 'it' || language_name == 'en')) language_name='en'; 

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        lang[language_name] = JSON.parse(xhr.responseText);
        if(callback != null) callback(lang[language_name]);
      }
    };
    xhr.open("GET", "./languages/"+language_name+".json", true);
    xhr.send();
  }

  var get = function(key_message){
    return lang[user_language][key_message];
  }

  var patch_page = function(strings){
    var l = strings.length;
    for(var i=0; i<l; i++){
      document.getElementById("lang-"+strings[i]).innerHTML = _lang.get(strings[i]);
    }
  }

  init();

  return {
    getActualLanguage: getActualLanguage,
    loadActualLanguage: loadActualLanguage,
    loadLanguage: loadLanguage,
    patch_page: patch_page,
    get: get
  }
})();