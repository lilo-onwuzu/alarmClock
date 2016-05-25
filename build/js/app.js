(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// construct
exports.Alarm = function (minute, hour, am_pm){
  this.minute = minute;
  this.hour = hour;
  this.am_pm = am_pm;
};

// prototypes
exports.Alarm.prototype.set = function() {
  return this.hour + ":" + this.minute  + " " + this.am_pm ;
};

},{}],2:[function(require,module,exports){
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

$(document).ready(function() {

  // moment() here is a function that has been installed through Bower and packaged in the vendor.js and vendor.css files
  // time variable should be independent of document or form submit status
  var time = moment().format('LT');

  // QUESTION??? how can we update the time synchronously
  setInterval(function() {
    time = moment().format('LT');
  }, 60000);

  //show current time
  $("#currentTime").text(time);

  // add alarm when document is loaded
  $(".addAlarm").click(function() {
    $("#alarm").append(
      '<form class="alarm" action="index.html" method="post">' +
        '<label for="hour">Hour</label>' +
        '<input type="text" name="hour" id="hour">' +
        '<label for="minute">Minute</label>' +
        '<input type="text" name="minute" id="minute">' +
        '<label for="am_pm"></label>' +
        '<select id="am_pm" name="am_pm">' +
          '<option value=""></option>' +
          '<option value="am">am</option>' +
          '<option value="pm">pm</option>' +
        '</select>' +
        '<button type="submit" name="button">Set Alarm</button><br><br>' +
        '<button class="btn btn-info" id="five" type="button">Snooze 5 mins</button>' +
        '<button class="btn btn-success ten" id="ten" type="button">Snooze 10 mins</button>' +
      '</form>'
    );
  });

  // remove alarm when document is loaded
  $(".removeAlarm").click(function() {
    $(".alarm").last().remove();
  });

  var alarm = false;
  var setAlarm;

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

    // resetFields so new alarm can be set easily
    resetFields();

  // end of submit event
  });

  // snooze 5 --continuos
  $("#five").click(function() {
    alarm = false;
    setInterval(alert = true, 2000);
  });

  // snooze 10 --continuos
  $("#ten").click(function() {
    alarm = false;
    // alarm.delay(600000);
  });

  // set alarm to true and display whenever time = setAlarm --continuos
  if (time === setAlarm) {
    alarm = true;
    $("#ring").text("ALARM!!!!");
  } else {
    $("#ring").text("");
  }

// end of document ready
});

},{"./../js/alarm.js":1}]},{},[2]);
