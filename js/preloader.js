//preloader sivu
jQuery(document).ready(function ($) {
  $(window).on("load", function () {
    var $preloader = $(".preloader"),
      $loader = $preloader.find(".preloader__loader");

    var elem = document.getElementById("edistymispalkki");
    var width = 1;
    var id = setInterval(frame, 10);
    
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width * 1 + "%";
      }
    }

    // $loader.fadeOut();
    // $loader.delay(250).fadeOut(5000);
    $preloader.delay(2050).fadeOut(5000);
  });
});