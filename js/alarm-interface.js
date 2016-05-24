var Alarm = require('./alarm.js').Alarm;

$(document).ready(function() {
  $("#alarm").submit(function(event) {
    event.preventDefault();

    var hour = $("#hour").val();
    var minute = $('#minute').val();
    var am_pm = $('#am_pm')
    var newAlarm = new Alarm (hour, minute, am_pm)
    var setAlarm = newAlarm.set();
    var time = moment().format();

    if (time ==)

  });
});
