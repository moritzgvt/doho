#! /usr/bin/env node
const { tools } = require('../utils');

const wordpress = async () => {
  const regex = /\/(.*)(\_wordpress_1)/;
  const service = await tools.check.activity('wordpress')
    .then(res => res)
    .catch(err => tools.handle.error(err))

  return {
    website: regex.exec(service.info.Names[0])[1],
    ...service
  };
}

const phpmyadmin = async () => {
  const service = await tools.check.activity('phpmyadmin')
    .then(res => res)
    .catch(err => tools.handle.error(err))

  return service;
}

const mysql = async () => {
  const regex = /\/(.*)(\_database_1)/;
  const service = await tools.check.activity('mysql')
    .then(res => res)
    .catch(err => tools.handle.error(err))

  

  return {
    website: regex.exec(service.info.Names[0])[1],
    ...service
  };
}

exports.service = {
  wordpress: wordpress,
  wp: wordpress,
  phpmyadmin: phpmyadmin,
  pma: phpmyadmin,
  mysql: mysql,
  db: mysql
}
exports.wordpress = wordpress;
exports.phpmyadmin = phpmyadmin;
exports.mysql = mysql;