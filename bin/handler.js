#! /usr/bin/env node
const chalk = require('chalk');

const store = require('./store/store');
const website = require('./services/website');
const phpmyadmin = require('./services/pma');

const handleMutation = (inquiry) => {
  switch (inquiry.mutation) {
    case 'set-path':
      store.setPath(inquiry.payload);
      console.log(
        chalk.green('Successfully changed path to ' + 
          chalk.underline( store.getPath() ) + 
        '.')
      );
      break;
    case 'get-path':
      const res = store.getPath();
      console.log(res);
      break;
  } 
}

const handleAction = (inquiry) => {
  switch (inquiry.service) {
    case 'website':
      website.handle(inquiry);
      break;
    case 'phpmyadmin':
      phpmyadmin.handle(inquiry);
      break;

  }
}

exports.action = handleAction;
exports.mutation = handleMutation;