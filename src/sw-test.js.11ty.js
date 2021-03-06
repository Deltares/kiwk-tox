const path = require('path');
const createJsModule = require('../config/eleventy/create-js-module');

const MODULE_FILE = 'sw-test.js';
const filePath = path.join(__dirname, `/${MODULE_FILE}`);

module.exports = createJsModule(filePath, {
  permalink: '/sw-test.js',
});
