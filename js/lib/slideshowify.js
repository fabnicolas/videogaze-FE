/**
 * Make background autoplaying slideshows the easy way!
 * 
 * JavaScript is used to calculate the correct values for the slideshow.
 * CSS3-enabled browsers will animate the transitions.
 * 
 * Usage example:
 * 
  <script type="text/javascript" src="../js/lib/slideshowify.js"></script>
  <script type="text/javascript">
    BackgroundImageSlideshow(
      '../images/backgrounds/',
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
        time_visible: 8,
        time_transition: 2,
      }
    );
  </script>

  @author Fabio Crispino
 * 
 * @param {*} image_path The initial path of your example. Example value: <./images/backgrounds/>. Can be null.
 * @param {*} images An array containing all the images filenames. Can include paths. Just include the name if images are in same image_path folder.
 * @param {*} div_slideshow The div element that will contain the slideshow.
 * @param {*} options Available options: time_visible, time_transition. Example: {time_visible: 8, time_transition: 2}.
 */

var BackgroundImageSlideshow = (function(image_path, images, div_slideshow, options) {
  var injectCSS = (function(css_code) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var css_container = document.createElement('style');
    css_container.type = 'text/css';
    if(css_container.styleSheet) {
      css_container.styleSheet.cssText = css_code;
    } else {
      css_container.appendChild(document.createTextNode(css_code));
    }
    head.appendChild(css_container);
  });

  var init = (function(image_path, images, div_slideshow, options) {
    if(image_path === undefined || image_path == null) image_path = '';
    if(images === undefined) return;
    if(options === undefined) options = {
      time_visible: 8,
      time_transition: 2
    }
    if(options.time_visible === undefined) options.time_visible = 8;
    if(options.time_transition === undefined) options.time_transition = 2;

    // Each image has an animation-delay, which offset is determined by: delay
    var delay = (options.time_visible + options.time_transition);

    // Calculate total animation time
    var total_time = delay * images.length;

    // Calculate initial visibility percentage
    var initial_perc = parseFloat((2 / 100) * total_time);

    // Calculate animation fading percentage
    var anim_sub_perc = parseFloat((100 / images.length + initial_perc).toFixed(2));

    // Add class "slideshowified" and inject figure tags
    if(div_slideshow.className != "") div_slideshow.className+=" ";
    div_slideshow.className += "slideshowified";
    for(var i = 0;i < images.length;i++) {
      div_slideshow.appendChild(document.createElement("figure"));
    }

    // Prepare animations and inject CSS code into page
    var css_code = '';
    css_code +=
      ".slideshowified {position: absolute; top: 0; left: 0; z-index: -1; "+
      "overflow-x: hidden; overflow-y: hidden; height: 100%; width: 100%;}\n\n" +
      ".slideshowified>figure {\n" +
      " animation: imageAnimation " + total_time + "s linear infinite 0s;\n" +
      " backface-visibility: hidden;\n" +
      " background-size: cover;\n" +
      " background-position: center center;\n" +
      " width: 100%;\n" +
      " height: 100%;\n" +
      " position: absolute;\n" +
      " top: 0;\n" +
      " left: 0;\n" +
      " opacity: 0;\n" +
      " z-index: -1;\n" +
      "}\n\n" +
      "figure {margin: 0;}\n\n" +
      '@keyframes imageAnimation {\n' +
      ' 0% {animation-timing-function: ease-in; opacity: 0; transform: scale3d(1.2, 1.2, 1.2);}\n' +
      ' ' + initial_perc + '% {animation-timing-function: ease-out; opacity: 1; transform: scale3d(1.1, 1.1, 1.1);}\n' +
      ' ' + anim_sub_perc + '% {opacity: 1; transform: scale3d(1, 1, 1);}\n' +
      ' ' + parseFloat(anim_sub_perc + initial_perc).toFixed(2) + '% {opacity: 0;}\n' +
      ' 100% {opacity: 0;}\n' +
      '}\n\n';

    for(var i = 0;i < images.length;i++) {
      css_code +=
        ".slideshowified>figure:nth-child(" + (i + 1) + ") {\n" +
        "      animation-delay: " + (i * delay) + "s;\n" +
        (i==0 ? "      background-image: url('" + image_path + images[i] + "');\n" : "")+
        "}\n\n";
    }

    injectCSS(css_code);

    var load_nth_child_image = function(i){
      injectCSS(
        ".slideshowified>figure:nth-child(" + (i + 1) + ") {\n" +
        "      background-image: url('" + image_path + images[i] + "');\n" +
        "}\n\n"
      );
    }

    for(var i = 1;i < images.length;i++) {
      setTimeout(load_nth_child_image.bind(null, i), (options.time_visible * i * 1000)/2 + 1);
    }


  });
  init(image_path, images, div_slideshow, options);
});