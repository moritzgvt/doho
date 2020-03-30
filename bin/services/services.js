#! /usr/bin/env node
const { tools } = require('../utils');

const wordpress = async () => {
  const service = await tools.check.activity('wordpress')
    .then(res => res)
    .catch(err => tools.handle.error(err))

  return service;
}

const phpmyadmin = async () => {
  const service = await tools.check.activity('phpmyadmin')
    .then(res => res)
    .catch(err => tools.handle.error(err))

  return service;
}

exports.service = {
  wordpress: wordpress,
  wp: wordpress,
  phpmyadmin: phpmyadmin,
  pma: phpmyadmin
}
exports.wordpress = wordpress;
exports.phpmyadmin = phpmyadmin;