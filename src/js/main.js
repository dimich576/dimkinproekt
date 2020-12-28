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

  $('#menu-btn').click(function () {
    $(this).closest('header').toggleClass('menu-open');
    $('body').toggleClass('oh');
  });

  $(document).on('click', function (e) {
    if($(e.target).closest('.header.menu-open').length === 0 && $('.header.menu-open').length > 0 && $(e.target).closest('#menu-btn').length === 0) {
      $('.header').removeClass('menu-open');
      $('body').removeClass('oh');
    }
  });

  $('.nav__item-arrow').click(function (e) {
    $(this).parent('.parent').toggleClass('open');
  });

  if($(document).width() < 992){
    $('.nav__triangle').click(function (e) {
      $(this).closest('.nav__item').toggleClass('open');
    });
  }
  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 150) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });


  /*popups start*/
  $(document).on('click', '[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
  });

  $(document).on('click', '.popup', function (e) {
    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
    }
  });
  /*popups end*/

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


  $(document).on('click', '[data-tab-nav]', function (e) {
    e.preventDefault();
    var tab = $(this).attr('data-tab-nav');
    var content = $(this).closest('.menu__body-item').find('[data-tab-content="'+ tab +'"]');

    $(this).closest('.menu__body-item').find('[data-tab-nav]').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.menu__body-item').find('[data-tab-content]').removeClass('active');
    $(content).addClass('active');

    menuSlider.updateAutoHeight(300);

  })

  $(document).on('click', '.menu__item-btn-i', function (e) {
    e.preventDefault();
    $(this).toggleClass('menu__item-btn-i--added');
  })


  if($('[data-tab-card-content]').length > 0){


    $(document).on('click', '[data-tab-card]', function (e) {
      e.preventDefault();
      var tab = $(this).attr('data-tab-card');
      $('[data-tab-card]').removeClass('active');
      $(this).addClass('active');
      // $('.active[data-tab-card-content]').slideToggle();
      $('.active[data-tab-card-content]').removeClass('active');
      $('[data-tab-card-content="'+ tab + '"]').addClass('active');
    })
  }


  // basket-count
  $(document).on('click', '.basket-count button', function (e) {
    var value = $(this).siblings('input').val();

    if($(this).hasClass('minus')){
      if ($(this).siblings('input').val() <= 0){
        $(this).siblings('input').val(0);
      } else{
        value--;
        $(this).siblings('input').val(value);
      }
    } else {
      value++;
      $(this).siblings('input').val(value);
    }
  });

  // (function($){
  //   $(window).on("load",function(){
  //     $(".top-basket-scroll-js").mCustomScrollbar({
  //       axis:"x",
  //       theme:"light-3",
  //       autoHideScrollbar: true
  //     });
  //   });
  // })(jQuery);

  (function($){
    $(window).on("load",function(){
      $(".cart-scroll-js").mCustomScrollbar({
        axis:"y",
        theme:"light-3",
      });
    });
  })(jQuery);

  $('#cartDate, #cartTime, #country').selectmenu();

  $('.phonemask').inputmask("+380 (99) 999-99-99");
  $('.cardmask').inputmask("9999 9999 9999 9999");
  $('.mmmymask').inputmask("99/99");


  /*validation start*/

  function validateForm (that) {

    that.closest('.cart__personal-step').find('input[type="text"].required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__input').addClass('error-field');
        $(this).closest('.site-form__input').removeClass('correct');
      } else {
        $(this).closest('.site-form__input').addClass('correct');
        $(this).closest('.site-form__input').removeClass('error-field');
      }
    });

    if (that.closest('.cart__personal-step').find('input[type="tel"].required').length != 0) {
      var inputTel = that.closest('form').find('input[type="tel"].required');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__input').addClass('correct');
        $(inputTel).closest('.site-form__input').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-form__input').addClass('error-field');
        $(inputTel).closest('.site-form__input').removeClass('correct');
      }
    }

    if(that.closest('.cart__personal-step').find('input.required').length > 0) {
      if (that.closest('.cart__personal-step').find('.error-field').length == 0 && that.closest('form').find('.correct').length > 0) {
        return true;
      }
    } else {
      return true;
    }

  }

  $(document).on('click', '.personal-step-btn-js', function (e) {
    e.preventDefault();

    var that = $(this);
    var tabActuel = $(this).closest('[data-personal-step]').attr('data-personal-step');

    if(validateForm(that)) {
      $(document).find('.cart__personal-step').removeClass('active');
      $(this).closest('[data-personal-step]').next().addClass('active');

      var ofsetPersonalCart = $('#cartPersonal').offset().top;

      if($(window).width() > 992) {
        jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 50}, 300);
      } else {
        jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 150 }, 300);
      }

      $('[data-personal-tab]').each(function () {
        if($(this).data('personal-tab') == tabActuel){
          $(this).addClass('check')
          $(this).next().addClass('active');
        }
      });
    }

  });
  $(document).on('click', '#sendForm', function (e) {
    e.preventDefault();
    window.location.href = './order.html';
  });

  $(document).on('click', '.back-link-js', function (e) {
    var tabActuel = $(this).closest('[data-personal-step]').attr('data-personal-step');

    $(document).find('.cart__personal-step').removeClass('active');
    $(this).closest('[data-personal-step]').prev().addClass('active');

    var ofsetPersonalCart = $('#cartPersonal').offset().top;

    if($(window).width() > 992) {
      jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 50}, 300);
    } else {
      jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 150 }, 300);
    }

    $('[data-personal-tab]').each(function () {
      if($(this).data('personal-tab') == tabActuel){
        $(this).removeClass('active')
        $(this).removeClass('check')
        $(this).prev().addClass('active');
        $(this).prev().removeClass('check');
      }
    });

  });

  $('.header__mobile-menu').on('click', function (e) {
    $(this).next().addClass('active');
  });

  $('.header__nav-close').on('click', function (e) {
    $(this).parent().removeClass('active');
  });

  $('.header__nav-link').on('click', function (e) {
      $(this).next().slideToggle();
  });

  $(document).on('click', function (e) {
    if(
        $(e.target).closest('.header__nav.active').length === 0 && $('.header__nav').hasClass('active') &&
        $(e.target).closest('.header__mobile-menu').length === 0
    ){
      $('.header__nav').removeClass('active');
    }
  });

  var className = $('.site-slider-pagination__number');

  var siteSliderJs = new Swiper('.site-slider-js', {

    slidesPerView: 1.25,
    spaceBetween: 30,
    centeredSlides: true,



    navigation: {
      nextEl: '.site-slider-button-next',
      prevEl: '.site-slider-button-prev',
    },

    pagination: {
      el: '.site-slider-pagination',
      clickable: true,
    },

    breakpoints: {
      450: {
        slidesPerView: 1.5,
        spaceBetween: 35,
        centeredSlides: true,
        pagination: {
          el: '.site-slider-pagination',
          clickable: true,
          type: 'fraction',
        },
      },

      680: {
        slidesPerView: 2.25,
        spaceBetween: 40,
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
        spaceBetween: 44,
        centeredSlides: false,
        loop: true,
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

  $('[data-tab]').click(function (e) {
    e.preventDefault();
    var contenttab = $(this).attr('data-tab');
    $('[data-tab]').removeClass('active');
    $(this).addClass('active');

    $('[data-tab-content]').removeClass('active');
    $('[data-tab-content='+ contenttab +']').addClass('active');

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

});

