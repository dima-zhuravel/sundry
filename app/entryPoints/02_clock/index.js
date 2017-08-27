//styles
require('./sass/main');

//scripts
const Clock = require('Pages/clock/clock.js');
const clock = new Clock;
clock.startClock();