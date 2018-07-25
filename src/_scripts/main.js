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
  count = 1000;

  getbackground(hour);
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

  touchtopledge.on('click touchstart', function() {
    count++;
    count = count.toLocaleString();

    countholder.fadeOut(200, function() {
      $(this).html(count).fadeIn(200);
    });
    // countholder.html(count.toLocaleString());
  });


  // helper functions
  function getbackground(hourval) {
    if (hourval >= 14) {
      nightbg.show();
      daybg.hide();
    } else {
      nightbg.hide();
      daybg.show();
    }
  }

});
