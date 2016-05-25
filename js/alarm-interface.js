// require alarm.js back-end logic
// alarm-interface will get concatenated and placed in tmp folder. In this folder, alarm.js is in the js folder directory one level above tmp
var Alarm = require('./../js/alarm.js').Alarm;
//  when "require" the js files execution knows to look in the directory for the file. In the case above "require('./alarm.js')" it finds the alarm.js file here.
// if it does not find the required element in the directory, it will search in the node_modules folder for an npm dependency. Note that require cannot find bower dependencies.
// js uses bower packages that have been packaged into the vendor files included in the html. So when the html runs, all the bower variables get initialized

function resetFields () {
  $("#hour").val("");
  $("#minute").val("");
  $("#am_pm").val("");
}

// moment() here is a function that has been installed through Bower and packaged in the vendor.js and vendor.css files
// time variable should be independent of document or form submit status
var time = moment().format('LT');
var alarm = false;
var setAlarm;

$(document).ready(function() {

  // show current time synchronously. update every half a second.
  setInterval(function(){
    time = moment().format('LT');
    $("#currentTime").text(time);
  }, 500);

  // // add alarm when document is loaded
  // $(".addAlarm").click(function() {
  //   $("#alarm").append(
  //     '<form class="alarm" action="index.html" method="post">' +
  //       '<label for="hour">Hour</label>' +
  //       '<input type="text" name="hour" id="hour">' +
  //       '<label for="minute">Minute</label>' +
  //       '<input type="text" name="minute" id="minute">' +
  //       '<label for="am_pm"></label>' +
  //       '<select id="am_pm" name="am_pm">' +
  //         '<option value=""></option>' +
  //         '<option value="am">am</option>' +
  //         '<option value="pm">pm</option>' +
  //       '</select>' +
  //       '<button type="submit" name="button">Set Alarm</button><br><br>' +
  //       '<button class="btn btn-info" id="five" type="button">Snooze 5 mins</button>' +
  //       '<button class="btn btn-success ten" id="ten" type="button">Snooze 10 mins</button>' +
  //     '</form>'
  //   );
  // });
  //
  // // remove alarm when document is loaded
  // $(".removeAlarm").click(function() {
  //   $(".alarm").last().remove();
  // });

  // what to do on submit
  $("#alarm").submit(function(event) {
    event.preventDefault();

    // transfer parameters
    var hour = $("#hour").val();
    var minute = $('#minute').val();
    var am_pm = $('#am_pm').val();
    var newAlarm = new Alarm (minute, hour, am_pm);
    // format alarm time to same format as moment().format('LT')
    setAlarm = newAlarm.set();
    // display alarm set time
    $("#alarmTime").text(setAlarm);

    // resetFields after parameter transfer so new alarm can be set easily
    resetFields();

  // end of submit event
  });

  // set alarm to true and display whenever time = setAlarm --check every half a second
  setInterval(function(){
    if (time == setAlarm) {

      // snooze 5min while alarm is true -- set alarm to true after 5 mins
      $("#five").click(function() {
        alarm = false;
        $("#ring").text("");
        setInterval(function(){
            alarm = true;
            $("#ring").text("ALARM!!!!");
        }, 300000);
      });

      // snooze 10 while alarm is true --continuos
      $("#ten").click(function() {
        alarm = false;
        setInterval(function(){
            alarm = true;
            $("#ring").text("ALARM!!!!");
        }, 600000);
      });

      alarm = true;
      $("#ring").text("ALARM!!!!");

    } else {
      alarm = false;
      $("#ring").text("");
    }
  }, 50);

// end of document ready
});
