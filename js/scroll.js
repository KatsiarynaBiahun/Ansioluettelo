//jos scroll, valittu sivukohde valitaan oikealla olevasta valikosta
 $(window).bind("scroll", function () {
    var currentTop = $(window).scrollTop();
    var elems = $(".scrollspy");
    elems.each(function (index) {
      var elemTop = $(this).offset().top;
      var elemBottom = elemTop + $(this).height();
      if (currentTop >= elemTop && currentTop <= elemBottom) {
        var id = $(this).attr("id");
        var navElem = $('a[href="#' + id + '"]');
        navElem
          .parent()
          .addClass("current")
          .siblings()
          .removeClass("current");
      }
    });
  });

//navigointipalkin tasainen vieritys, navbar smooth scrolling
$(document).ready(function () {
  $("#na, #contact, #header-link, .down, .up").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
          top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });
});
 