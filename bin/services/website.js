#! /usr/bin/env node
const { exec } = require('child_process');
const chalk = require('chalk');

const { config } = require('../store/store');
const { tools } = require('../utils');
const { service } = require('./services');

const start = async (inquiry) => {
  const wordpress = await service.wp().then(info => info);

  if (wordpress.status) {
    tools.handle.log(`Please stop the Website located at: ` + chalk.underline( wordpress.info.Labels['com.docker.compose.project.working_dir'] ), 'error');
  } else {
    exec(
      'docker-compose up -d', 
      {cwd: config.get('path') + inquiry.target}, 
      (err, stdout) => {
        if (err) { tools.handle.error(err); }

        tools.handle.log(stdout, 'normal');

        exec('docker ps', (err, stdout) => {
          err 
            ? (err) => { 
                tools.handle.error(err); 
                return; 
              } 
            : tools.handle.log(stdout, 'success');
        });
    });
  }
}

const stop = async (inquiry) => {
  const phpmyadmin = await service.pma().then(info => info);

  if (phpmyadmin.status) {
    tools.handle.log(
      'Please stop ' + chalk.underline(phpmyadmin.info.Names[0]) + ' first.'
        + '\n\n'
        + chalk.yellow('$  doho stop phpmyadmin'), 
      'error'
    );
  } else {
    exec(
      'docker-compose down',
      {cwd: config.get('path') + inquiry.target},
      (err, stdout) => {
        if (err) { tools.handle.error(err); }

        tools.handle.log(stdout, 'normal');
      }
    );
  }
}

const handle = async (inquiry) => {
  switch (inquiry.action) {
    case 'start':
      start(inquiry);
      break;
    case 'stop':
      stop(inquiry)
      break;
  } 
}

exports.handle = handle;