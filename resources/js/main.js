$(document).ready(function(){

  moveHeadItems();

});

//Toggle dropdown functionality
$('.nav-toggle').on('click', function(e) {
  e.preventDefault();
  if (scrollCheck() == false) {
    return;
  } else {
    $('.nav-list').slideToggle(250);
    $(this).toggleClass('active');
  }
});

//Configure dropdown on window resize

$(window).on('resize', function() {
  if ($(window).width() > 768) {
    $('.nav-list').show();
  } else if ($('.nav-toggle').hasClass('active')) {
    $('.nav-toggle').removeClass('active');
    $('.nav-list').slideToggle(250);
  } else if (!$('.nav-toggle').hasClass('active') && $('.nav-list').is(':visible')) {
    $('.nav-list').hide();
  };
});

//Header fade in/out on Scroll

$(window).scroll(function() {
  moveHeadItems();
  scrollLoop();
});

//Slide Timeline Events when inview

$('.check-view').on('inview', function(e, isInView) {
  if (isInView) {
    $(this).parent().delay(9000).addClass('is-inview');
  };
});

//Move header items on initial scroll

function moveHeadItems() {
  if (scrollCheck() == true) {
    $('header').addClass('isScrolled');
    $('.title h2').addClass('isFaded');
    $('line').addClass('isAnimated');
  } else {
    $('header').removeClass('isScrolled');
    $('.title h2').removeClass('isFaded');
    if ($('.nav-toggle').hasClass('active') && $(window).width() <= 768) {
      $('.nav-toggle').removeClass('active');
      $('.nav-list').slideToggle(250);
    }
  }
}

//Smooth scroll for anchors

var $root = $('html, body');

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
  var $viewHeight = $(window).height();
  var xScrollPosition = window.scrollX;
  var yScrollPosition = window.scrollY;
  var $introSection = document.querySelector("section:nth-of-type(1)");

  if (window.scrollY > $viewHeight) {
    return;
  }

  setTranslate(0, yScrollPosition * -0.2, $introSection);

  requestAnimationFrame(scrollLoop);
}
