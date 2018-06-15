$(document).ready(function(){

  moveHeadItems();

});

const $window = $(window);
const $root = $('html, body');
const $toggle = $('.nav-toggle');
const $navlist = $('.nav-list');
const $header = $('header');
const $title = $('.title h2');
const $line = $('line');
const $checkview = $('.check-view');

//Toggle dropdown functionality
$toggle.on('click', function(e) {
  e.preventDefault();
  if (scrollCheck() == false) {
    return;
  } else {
    $navlist.slideToggle(250);
    $(this).toggleClass('active');
  }
});

//Configure dropdown on window resize

$window.on('resize', function() {
  if ($window.width() > 768) {
    $navlist.show();
  } else if ($toggle.hasClass('active')) {
    $toggle.removeClass('active');
    $navlist.slideToggle(250);
  } else if (!$toggle.hasClass('active') && $navlist.is(':visible')) {
    $navlist.hide();
  };
});

//Header fade in/out on Scroll

$window.scroll(function() {
  moveHeadItems();
  scrollLoop();
});

//Slide Timeline Events when inview

$checkview.on('inview', function(e, isInView) {
  if (isInView) {
    $(this).parent().delay(9000).addClass('is-inview');
  };
});

//Move header items on initial scroll

function moveHeadItems() {
  if (scrollCheck() == true) {
    $header.addClass('is-scrolled');
    $title.addClass('is-faded');
    $line.addClass('is-animated');
  } else {
    $header.removeClass('is-scrolled');
    $title.removeClass('is-faded');
    if ($toggle.hasClass('active') && $(window).width() <= 768) {
      $toggle.removeClass('active');
      $navlist.slideToggle(250);
    }
  }
}

//Smooth scroll for anchors

$('.js-scroll').on('click', function(e) {
  e.preventDefault();
  $root.animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 800);

  return false;
})

//Check for initial page scroll

function scrollCheck() {
  return window.scrollY > 0;
}

//Parallax scroll - move underlayed intro section content on scroll

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
}

function scrollLoop() {
  var $viewHeight = $window.height();
  var xScrollPosition = window.scrollX;
  var yScrollPosition = window.scrollY;
  var $introSection = document.querySelector("section:nth-of-type(1)");

  if (window.scrollY > $viewHeight) {
    return;
  }

  setTranslate(0, yScrollPosition * -0.2, $introSection);

  requestAnimationFrame(scrollLoop);
}
