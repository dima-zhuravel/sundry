//styles 
require('./app/sass/main');

//scripts
const helloUser = require('Pages/piano/piano.js');
helloUser('Dima');

const mainBundle = require('Pages/main/main.js');
mainBundle();