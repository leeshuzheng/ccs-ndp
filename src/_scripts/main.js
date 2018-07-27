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
  count = 1000,
  audio = $('audio');

  getbackground(hour);
  getcount();
  countholder.html(count.toLocaleString()); // toLocaleString for adding comma to number

  ontime({
    cycle: [ '00:00', '30:00' ] // runs every half hour to check time of day
  }, function (ot) {

    var hournow = (new Date()).getHours();

    getbackground(hournow);

    console.log('30 mins to next run');

    ot.done();
    return
  });

  $('*').on('click', function() {
    addcount();
    var randomboolean = Math.random() >= 0.5;
    window.fireworks = randomboolean;
    console.log(`window.fireworks is ${window.fireworks}`);
    audio[0].play();
  });


  // helper functions
  function displaycount(number) {
    number = number.toLocaleString();
    countholder.html(number);
  }

  function addcount() {

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

  function getcount() {
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
