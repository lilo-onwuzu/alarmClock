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
