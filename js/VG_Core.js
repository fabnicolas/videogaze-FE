// Enable logger
JSLoader.load_once("lib/Logger.js", function() {
  Logger.enable();
});

var page_to_set = '';

// Handle # urls like routing
JSLoader.load_once("lib/HashRouting.js", function() {
  var param_roomcode = HashRouting.get_parameter("roomcode");
  if(param_roomcode) {
    page_to_set = "room";
    JSLoader.load_once('lib/SPA.js', function() {
      SPA.init('./page_fragments/', function() {
        SPA.setVar('roomcode', param_roomcode);
      });
    });
  }
});

JSLoader.load_once("global.js");

JSLoader.load_once("lib/MultiLanguage.js", function(){
  _lang.loadActualLanguage();
});

JSLoader.load_once('lib/slideshowify.js', function() {
  BackgroundImageSlideshow(
    './images/backgrounds/',
    [
      'background1.jpg',
      'background2.jpg',
      'background3.jpg',
      'background4.jpg',
      'background5.jpg',
      'background6.jpg',
      'background7.jpg',
      'background8.jpg',
      'background9.jpg'
    ],
    document.getElementById("div_presentation"),
    {
      time_visible: 3,
      time_transition: 2,
    }
  );
});


JSLoader.load_once('lib/SPA.js', function() {
  SPA.init('./page_fragments/', function() {
    SPA.setRoutes({
      'home': function() {
        SPA.setPage("vg-home-content.html", "spa-content");
        SPA.setPage("vg-home-bottom.html", "spa-bottom");
      },
      'room': function() {
        SPA.setPage("room.html", "spa-content");
        SPA.setPage(null, "spa-bottom");
      },
      'local_video': function() {
        SPA.setPage("local_video.html", "spa-content");
        SPA.setPage("vg-home-bottom.html", "spa-bottom");
      }
    })

    if(page_to_set == '') page_to_set = "home";
    SPA.navigateRoute(page_to_set);
  });
});