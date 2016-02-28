require('shelljs/global');

function length() {
  var path = require('path');
  return ls(path.join('manuscript','page-*')).length;
}

module.exports.length = length;