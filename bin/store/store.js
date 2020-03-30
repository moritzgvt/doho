#! /usr/bin/env node

const Configstore = require('configstore');
const packageConfig = require('../../package.json');

const config = new Configstore(packageConfig.name, {
  path: ''
});

const setPath = (payload) => {
  config.delete('path');
  config.set('path', payload);
}

const getPath = () => {
  return config.get('path');
}

exports.config = config;
exports.setPath = setPath;
exports.getPath = getPath;