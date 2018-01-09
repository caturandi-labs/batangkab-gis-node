/*!
 * Shamcey v2.0.0 (https://themepixels.me/shamcey)
 * Copyright 2017-2018 ThemePixels
 * Licensed under ThemeForest License
 */

 'use strict';

 $(document).ready(function(){

  // custom scrollbar style
  $('.sh-sideleft-menu').perfectScrollbar();

  // showing sub navigation to nav with sub nav.
  $('.with-sub.active + .nav-sub').slideDown();

  // showing sub menu while hiding others
  $('.with-sub').on('click', function(e) {
    e.preventDefault();
    var nextElem = $(this).next();
    if(!nextElem.is(':visible')) {
      $('.nav-sub').slideUp();
    }
    nextElem.slideToggle();
  });

  // hide left menu bar
  $('#navicon').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('hide-left');
  });

  // push/hide left menu bar in mobile
  $('#naviconMobile').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('show-left');
  });

});
