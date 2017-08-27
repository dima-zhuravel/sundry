//styles 
require('./sass/main');

//scripts
const Piano = require('Pages/piano/piano.js');
const handlePiano = new Piano();
handlePiano.listenKeys();