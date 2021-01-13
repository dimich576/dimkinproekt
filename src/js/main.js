var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}


if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}


$(document).ready(function () {

  var menuSlider = new Swiper('.menu-slider-js', {
    // Optional parameters
    autoHeight: true, //enable auto height
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.custom-button-next',
      prevEl: '.custom-button-prev',
    },



    calculateHeight:true,

  })

  var className = $('.site-slider-pagination__number');

  var siteSliderJs = new Swiper('.site-slider-js', {

    slidesPerView: 1.25,
    // spaceBetween: 30,
    centeredSlides: true,
    loop: true,



    navigation: {
      nextEl: '.site-slider-button-next',
      prevEl: '.site-slider-button-prev',
    },

    pagination: {
      el: '.site-slider-pagination',
      clickable: true,
      type: 'fraction',
      hideOnClick: true,
    },

    breakpoints: {
      450: {
        slidesPerView: 1.5,
        // spaceBetween: 35,
        centeredSlides: true,
        pagination: {
          el: '.site-slider-pagination',
          clickable: true,
          type: 'fraction',
        },
      },

      680: {
        slidesPerView: 2,
        // spaceBetween: 40,
        centeredSlides: false,
        pagination: {
          el: '.site-slider-pagination',
          clickable: true,
          type: 'fraction',
        },
      },
      800: {
        slidesPerView: 2.5,
        spaceBetween: 40,
        centeredSlides: false,
        pagination: {
          el: '.site-slider-pagination',
          clickable: true,
          type: 'fraction',
        },
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: false,
        loop: true,
        pagination: {
          el: '.site-slider-pagination',
          clickable: true,
          type: 'bullets',
        },
      },
    }

  });

  $(document).on('click', '.header-mobile__menu-img', function (e) {
    $('.header-mobile__list').addClass('opened');
    $(this).addClass('d-hidden');
    $(this).next().removeClass('d-hidden');
  });

  $(document).on('click', '.header-mobile__close-img', function (e){
    $('.header-mobile__list').removeClass('opened');
    $(this).addClass('d-hidden');
    $(this).prev().removeClass('d-hidden');
  });

  $(document).mouseup(function (e) {
    if($(".header-mobile__list.opened").hasClass('opened')){
      var container = $(".header-mobile__list.opened");
      console.log(container);
      if (container.has(e.target).length === 0){
        $('.header-mobile__close-img').click();
      }
    }
  });

  $('[data-tab]').click(function (e) {
    e.preventDefault();
    var contenttab = $(this).attr('data-tab');
    $('[data-tab]').removeClass('active');
    $(this).addClass('active');

    $('[data-tab-content]').removeClass('active');
    $('[data-tab-content='+ contenttab +']').addClass('active');

  });

  $('[data-video-tab]').click(function (e) {
    e.preventDefault();
    var contenttab = $(this).attr('data-video-tab');
    $('[data-video-tab]').removeClass('active');
    $(this).addClass('active');

    $('[data-video-tab-content]').removeClass('active');
    $('[data-video-tab-content='+ contenttab +']').addClass('active');

  });

  console.log($('.page-tabs__item'));

  function tabArrow(){
    if($('.page-tabs__item').first().hasClass('active')){
      $('.first-nav__item').removeClass('active');
    } else {
      $('.first-nav__item').addClass('active');
    }

    if($('.page-tabs__item').last().hasClass('active')){
      $('.second-nav__item').removeClass('active');
    } else {
      $('.second-nav__item').addClass('active');
    }
  }

  tabArrow();

  $('.first-nav__item').click(function (e) {
    if( $('.page-tabs__item.active').prev().length > 0) {
      $('.page-tabs__item.active').prev().click();
    }

    tabArrow();
  });
  $('.second-nav__item').click(function (e) {
    if( $('.page-tabs__item.active').next().length > 0) {
      $('.page-tabs__item.active').next().click();
    }

    tabArrow();
  });

  $(document).on('click', '.site-form-submit-js', function(e){
    e.preventDefault();
    /*validation start*/

    if($(this).closest('form').find('input[type="tel"]').length != 0) {
      var inputTel = $(this).closest('form').find('input[type="tel"]');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__row').addClass('correct');
        $(inputTel).closest('.site-form__row').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-form__row').addClass('error-field');
        $(inputTel).closest('.site-form__row').removeClass('correct');
      }
    }

    if($(this).closest('form').find('input[type="email"].required').length != 0) {
      var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

      var input = $(this).closest('form').find('input[type="email"].required');
      var email = $(this).closest('form').find('input[type="email"].required').length > 0
          ? $(this).closest('form').find('input[type="email"].required')
          : false;


      if (email.val() == "" && email !== false) {
        email.closest('.site-form__row').addClass('error-field');

      } else {
        if (reg.test(email.val()) == false) {
          email.closest('.site-form__row').addClass('error-field');
          email.closest('.site-form__row').removeClass('correct');

        } else {
          email.closest('.site-form__row').addClass('correct');
          email.closest('.site-form__row').removeClass('error-field');
        }
      }
    }

    $(this).closest('form').find('input[type="text"].required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__row').addClass('error-field');
        $(this).closest('.site-form__row').removeClass('correct');
      } else {
        $(this).closest('.site-form__row').addClass('correct');
        $(this).closest('.site-form__row').removeClass('error-field');
      }
    });

    $(this).closest('form').find('input[type="password"].required').each(function () {
      if($(this).val().length < 6){
        $(this).closest('.site-form__row').addClass('error-field');
        $(this).closest('.site-form__row').removeClass('correct');
      } else {
        $(this).closest('.site-form__row').addClass('correct');
        $(this).closest('.site-form__row').removeClass('error-field');
      }
    });

    $(this).closest('form').find('textarea.required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__row').addClass('error-field');
        $(this).closest('.site-form__row').removeClass('correct');
      } else {
        $(this).closest('.site-form__row').addClass('correct');
        $(this).closest('.site-form__row').removeClass('error-field');
      }
    });

    if($(this).closest('form').find('.error-field').length == 0 && ($(this).closest('form').find('.required').length === 0 || $(this).closest('form').find('.correct').length > 0)){
      $(this).closest('form').find('.correct').removeClass('correct');
      $(this).siblings('input[type="submit"]').click();
    }

  });


  $(document).on('click', '.subscribe-form__i', function(e){
    e.preventDefault();
    /*validation start*/


    if($(this).closest('form').find('input[type="email"].required').length != 0) {
      var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

      var input = $(this).closest('form').find('input[type="email"].required');
      var email = $(this).closest('form').find('input[type="email"].required').length > 0
          ? $(this).closest('form').find('input[type="email"].required')
          : false;


      if (email.val() == "" && email !== false) {
        email.closest('.subscribe-form__row').addClass('error-field');

      } else {
        if (reg.test(email.val()) == false) {
          email.closest('.subscribe-form__row').addClass('error-field');
          email.closest('.subscribe-form__row').removeClass('correct');

        } else {
          email.closest('.subscribe-form__row').addClass('correct');
          email.closest('.subscribe-form__row').removeClass('error-field');
        }
      }
    }


    if($(this).closest('form').find('.error-field').length == 0 && ($(this).closest('form').find('.required').length === 0 || $(this).closest('form').find('.correct').length > 0)){
      $(this).closest('form').find('.correct').removeClass('correct');
      $(this).siblings('input[type="submit"]').click();
    }

  });
    // AOS.init();

  $(".accordeon__wrap").mCustomScrollbar({
    axis:"y", // vertical and horizontal scrollbar
  });

  $(".video__list").mCustomScrollbar({
    axis:"y" // vertical and horizontal scrollbar
  });

  $(document).on('click', '.accordeon__inner', function(e){
    if($(this).parent().hasClass('active')){
      return;
    } else {
      $('.sending__accordeon').removeClass('active');
      $(this).parent().addClass('active');
      $('.sending__list').slideUp();
      $(this).next().slideDown();
    }
  });

  $(document).on('click', '.about-block__tab', function(e){
    $(this).next().slideToggle();
  });

  $(document).on('click', '.search-hidden-mobile-js', function(e){
    $('.header-fixed-search').removeClass('hidden');
  });

  $(document).on('click', function (e) {
    if(!$('.header-fixed-search').hasClass('hidden')){
      if (e.target.closest('.header-fixed-search') === null && e.target.closest('.search-hidden-mobile-js') === null ){
        $('.header-fixed-search').addClass('hidden');
      }
    }
  });


    $('.js-example-basic-single').select2({
        minimumResultsForSearch: Infinity,
        dropdownAutoWidth : true,
        width: 'auto'
    });

  AOS.init({disable: 'mobile'});

// checking browser for WEBP
  hasWebP().then(function () {

    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var webp = $(this).data('webp');
        $(this).attr('data-blazy', webp);

        var bLazy = new Blazy({
          src: 'data-blazy' // Default is data-src
        });
      });
    } else {
      $('.webp-img').each(function () {
        var webp;
        if($(this).data('webp-mobile') !== undefined)
          webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
        console.log($(this).data('webp-mobile'));
        // $(this).attr('src', webp);
        $(this).attr('style', 'background-image: url('+webp+')');
      });
    }

    // var bLazy = new Blazy({
    //   src: 'data-blazy' // Default is data-src
    // });

  }, function () {
    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var img = $(this).data('img');
        $(this).attr('data-blazy', img);

        var bLazy = new Blazy({
          src: 'data-blazy' // Default is data-src
        });
      });
    } else {
      $('.webp-img').each(function () {
        var img;
        if($(this).data('img-mobile') !== undefined)
          img = $(this).data('img-mobile'); else webp = $(this).data('img');
        $(this).attr('style', 'background-image: url('+img+')');
      });
    }


  });

});



//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();