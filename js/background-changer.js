/**
 * BackgroundImageSlideshow library.
 * 
 * Example usage:
 * 
 * BackgroundImageSlideshow(
      './images/backgrounds/',
      [
        'background1.jpg',
        'background2.jpg',
        'background3.jpg'
      ],
      document.getElementById("showcase"),
      3000
    );

    Result: Node "showcase" has background-image changed every 3 seconds.
    Images are loaded and cached in the best possible way.
 * 
 * @author Fabio Crispino
 * 
 * @param {string} image_path 
 * @param {Object} images 
 * @param {Node} div_slideshow 
 * @param {int} interval_time
 */

var BackgroundImageSlideshow = (function(image_path, images, div_slideshow, interval_time){
  if(image_path === undefined) image_path = './images/';
  if(images === undefined) images = [];
  if(div_slideshow === undefined) return;
  if(interval_time === undefined) interval_time=3000;

  var cached_images = [];

  var load_images = (function(image_path, images, callback) {
    var images_left=images.length;
    for(var i=0; i<images.length; i++){
      cached_images[i] = new Image();
      cached_images[i].onload = function() {
        images_left--;
        if(images_left==0) callback();
      }
      cached_images[i].src = image_path + images[i];
      i++;
      if(i == images.length) i = 0;
    }
  });

  var slideshowify = (function(div_container, images){
    var show_image = (function(images, i){
      div_container.style.backgroundImage = "url('" + images[i].src + "')";
      i++;
      if(i == images.length) i=0;
      setTimeout(function(){show_image(images, i)}, 3000);
    });
    show_image(images, 0);
  });

  load_images(image_path, images, function(){
    slideshowify(div_slideshow, cached_images);
  });
});