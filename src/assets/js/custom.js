$(window).on("load", function () {
  "use strict";
  /*=========================================================================
            Preloader
    =========================================================================*/
  $("#preloader").delay(750).fadeOut("slow");
});

/*=========================================================================
            Home Slider
=========================================================================*/
$(document).ready(function () {
  "use strict";

  /*=========================================================================
            Slick sliders
    =========================================================================*/
  $(".post-carousel-lg").slick({
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $(".post-carousel-featured").slick({
    dots: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $(".post-carousel-twoCol").slick({
    dots: false,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
  // Custom carousel nav
  $(".carousel-topNav-prev").click(function () {
    $(".post-carousel-twoCol").slick("slickPrev");
  });
  $(".carousel-topNav-next").click(function () {
    $(".post-carousel-twoCol").slick("slickNext");
  });

  $(".post-carousel-widget").slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          slidesToScroll: 1,
        },
      },
    ],
  });
  // Custom carousel nav
  $(".carousel-botNav-prev").click(function () {
    $(".post-carousel-widget").slick("slickPrev");
  });
  $(".carousel-botNav-next").click(function () {
    $(".post-carousel-widget").slick("slickNext");
  });

  /*=========================================================================
            Sticky header
    =========================================================================*/
  var $header = $(
      ".header-default, .header-personal nav, .header-classic .header-bottom"
    ),
    $clone = $header.before($header.clone().addClass("clone"));

  $(window).on("scroll", function () {
    var fromTop = $(window).scrollTop();
    $("body").toggleClass("down", fromTop > 300);
  });
});

$(function () {
  "use strict";

  /*=========================================================================
            Sticky Sidebar
    =========================================================================*/
  $(".sidebar").stickySidebar({
    topSpacing: 60,
    bottomSpacing: 30,
    containerSelector: ".main-content",
  });

  /*=========================================================================
            Vertical Menu
    =========================================================================*/
  $(".submenu").before('<i class="icon-arrow-down switch"></i>');

  $(".vertical-menu li i.switch").on("click", function () {
    var $submenu = $(this).next(".submenu");
    $submenu.slideToggle(300);
    $submenu.parent().toggleClass("openmenu");
  });

  /*=========================================================================
            Canvas Menu
    =========================================================================*/
  $("button.burger-menu").on("click", function () {
    $(".canvas-menu").toggleClass("open");
    $(".main-overlay").toggleClass("active");
  });

  $(".canvas-menu .btn-close, .main-overlay").on("click", function () {
    $(".canvas-menu").removeClass("open");
    $(".main-overlay").removeClass("active");
  });

  /*=========================================================================
            Popups
    =========================================================================*/
  $("button.search").on("click", function () {
    $(".search-popup").addClass("visible");
  });

  $(".search-popup .btn-close").on("click", function () {
    $(".search-popup").removeClass("visible");
  });

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(".search-popup").removeClass("visible");
    }
  });

  /*=========================================================================
            Tabs loader
    =========================================================================*/
  $('button[data-bs-toggle="tab"]').on("click", function () {
    $(".tab-pane").addClass("loading");
    $(".lds-dual-ring").addClass("loading");
    setTimeout(function () {
      $(".tab-pane").removeClass("loading");
      $(".lds-dual-ring").removeClass("loading");
    }, 500);
  });

  /*=========================================================================
            Social share toggle
    =========================================================================*/
  $(".post button.toggle-button").each(function () {
    $(this).on("click", function (e) {
      $(this).next(".social-share .icons").toggleClass("visible");
      $(this).toggleClass("icon-close").toggleClass("icon-share");
    });
  });

  /*=========================================================================
    Spacer with Data Attribute
    =========================================================================*/
  var list = document.getElementsByClassName("spacer");

  for (var i = 0; i < list.length; i++) {
    var size = list[i].getAttribute("data-height");
    list[i].style.height = "" + size + "px";
  }

  /*=========================================================================
    Background Image with Data Attribute
    =========================================================================*/
  var list = document.getElementsByClassName("data-bg-image");

  for (var i = 0; i < list.length; i++) {
    var bgimage = list[i].getAttribute("data-bg-image");
    list[i].style.backgroundImage = "url('" + bgimage + "')";
  }
});

//Heart button
$.fn.boom = function (e) {
  var colors = [
    "#ff4b2b",
    "#ff416c",
    "#ff0000",
    // '#FFD100',
    // '#FF9300',
    // '#FF7FA4'
  ];
  var shapes = [
    '<polygon class="star" points="21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632"></polygon>',
    '<path class="circle" d="m 20 1 a 1 1 0 0 0 0 25 a 1 1 0 0 0 0 -25"></path>',
    '<polygon class="other-star" points="18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716"></polygon>',
    '<polygon class="diamond" points="18,0,27.192388155425117,8.80761184457488,36,18,27.19238815542512,27.192388155425117,18.000000000000004,36,8.807611844574883,27.19238815542512,0,18.000000000000004,8.80761184457488,8.807611844574884"></polygon>',
  ];

  var btn = $(this);
  var group = [];
  var num = Math.floor(Math.random() * 10) + 6;

  for (i = 0; i < num; i++) {
    var randBG = Math.floor(Math.random() * colors.length);
    var getShape = Math.floor(Math.random() * shapes.length);
    var c = Math.floor(Math.random() * 10) + 5;
    var scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
    var x = Math.floor(Math.random() * (150 + 100)) - 100;
    var y = Math.floor(Math.random() * (150 + 100)) - 100;
    var sec = Math.floor(Math.random() * 1000) + 1000;
    var cir = $('<div class="cir"></div>');
    var shape = $('<svg class="shape">' + shapes[getShape] + "</svg>");

    shape.css({
      top: e.pageY - btn.offset().top + 20,
      left: e.pageX - btn.offset().left + 40,
      transform: "scale(0." + scale + ")",
      transition: sec + "ms",
      fill: colors[randBG],
    });

    btn.siblings(".my-btn-particles").append(shape);

    group.push({ shape: shape, x: x, y: y });
  }

  for (var a = 0; a < group.length; a++) {
    var shape = group[a].shape;
    var x = group[a].x,
      y = group[a].y;
    shape.css({
      left: x + 50,
      top: y + 15,
      transform: "scale(0)",
    });
  }

  setTimeout(function () {
    for (var b = 0; b < group.length; b++) {
      var shape = group[b].shape;
      shape.remove();
    }
    group = [];
  }, 2000);
};

$(function () {
  $(document).on("click", ".heart  ", function (e) {
    $(this).boom(e);
    $(this).toggleClass("animated-heart");
  });
});

$(function () {
  $(document).on("click", ".none-heart  ", function (e) {
    $(this).boom(e);
    $(this).toggleClass("animated-none-heart");
  });
});

// Follow button
