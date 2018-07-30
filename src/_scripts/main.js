// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import './f';
import ontime from 'ontime';

$(() => {

  window.production = false;

  // time on first load
  var hour = (new Date()).getHours(),
  daybg = $('.day'),
  nightbg = $('.night'),
  touchtopledge = $('.touchtopledge'),
  countholder = $('.count'),
  audio = $('audio'),
  page = $('.page');

  getbackground(hour);
  getcount();

  ontime({
    cycle: [ '00:00', '30:00' ] // runs every half hour to check time of day
  }, function (ot) {

    var hournow = (new Date()).getHours();

    getbackground(hournow);

    console.log('30 mins to next run');

    ot.done();
    return
  });

  $('body').on('click', function() {
    addcount();
    var randomboolean = Math.random() >= 0.5;
    audio[0].currentTime = 0;
    audio[0].play();
  });


  // helper functions
  // function showpew() {
  //
  //   $('.pew').remove();
  //
  //   let pew = new Image();
  //
  //
  //   let top = Math.floor(Math.random() * (60 - 10 + 1)) + 10,
  //   left = Math.floor(Math.random() * (80 - 5 + 1)) + 5,
  //   rotate = Math.floor(Math.random() * (25 + 25 + 1)) - 25,
  //   height = Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  //   srcidx = Math.floor(Math.random() * (9 - 2 + 1)) + 2;
  //
  //   srcidx = `0${srcidx}`;
  //
  //   let pathtopew;
  //
  //   if (window.production) {
  //     pathtopew = '../images';
  //   } else {
  //     pathtopew = '../wp-content/themes/twentyseventeen/assets/images';
  //   }
  //
  //   pew.src = `${pathtopew}/PEWs-${srcidx}.png`;
  //
  //   let $pew = $(pew);
  //
  //   $pew.addClass('pew').css({
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     transform: `rotate(${rotate}deg)`,
  //     height: `${height}px`
  //   });
  //
  //   // append to .page
  //   page.append(pew);
  //
  //   // let it fadeIn
  //   $pew.addClass('show');
  //
  //   setTimeout(function() {
  //     $pew.removeClass('show');
  //   }, 1000);
  //
  // }

  function displaycount(number) {
    number = number.toLocaleString();
    countholder.html(number);
  }

  function addcount() {

    if (!window.production) {
      $.ajax({
        type: 'POST',
        dataType: 'text',
        url: ccsndp.ajaxurl,
        data: {
          'action': 'add_count'
        },
        success: function success(data) {

          let newcount = data;

          newcount = parseInt(newcount);

          displaycount(newcount);
        },
        error: function error(e) {
          console.log(e);
        }
      });
    }

  }

  function getcount() {

    if (!window.production) {
      $.ajax({
        type: 'GET',
        dataType: 'text',
        url: ccsndp.ajaxurl,
        data: {
          'action': 'get_count'
        },
        success: function success(data) {

          console.log(data);

          let currentcount = data;
          currentcount = parseInt(currentcount);
          displaycount(currentcount);
        },
        error: function error(e) {
          console.log(e);
        }
      });
    }

  }

  function getbackground(hourval) {
    if (hourval >= 19) {
      nightbg.show();
      daybg.hide();
    } else {
      nightbg.hide();
      daybg.show();
    }
  }

});
