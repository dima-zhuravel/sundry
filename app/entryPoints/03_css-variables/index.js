//styles
require('./sass/main');

const DynamicVariables = require('Pages/css-variables/css-variables');
const dynamicVariables = new DynamicVariables();
dynamicVariables.handleInputs();