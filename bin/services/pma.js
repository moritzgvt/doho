#! /usr/bin/env node
// const { exec } = require('child_process');
const chalk = require('chalk');

const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

const { tools } = require('../utils');
const { service } = require('./services');

const start = async (inquiry) => {
  const mysql = await service.db().then(info => info);

  if (mysql.status) {
    const databaseName = mysql.info.Names[0].substr(1);
    const network = mysql.info.NetworkSettings.Networks[mysql.website + '_default'];
    const pmaContainer = {
      Image: 'phpmyadmin/phpmyadmin',
      Tty: false,
      name: 'phpmyadmin',
      HostConfig: {
        AutoRemove: true,
        Links: [ 
          'db:db' 
        ],
        NetworkMode: mysql.website + '_default',
        PortBindings: {
          '80/tcp': [
            { 
              HostIp: '0.0.0.0',
              HostPort: '4000' 
            }
          ]
        },
      }
    }

    tools.handle.log(
      'Trying to connect database interface to '
        + '\n'
        + 'Container: ' + chalk.yellow(databaseName) 
        + '\n' 
        + 'Network: ' + chalk.yellow(network.NetworkID), 
      'normal'
    );

    docker.createContainer(
      {...pmaContainer}, 
      (err, container) => {
        if (err) { tools.handle.error('\n' + err); return; }
        
        container.start((err, container) => {
          if (err) { tools.handle.error(err); }
          tools.handle.log(
            '\n'
              + 'PhpMyAdmin is running!', 
            'success'
          );
        });
      }
    );
  }
}

const stop = (inquiry) => {
  console.log('Stop phpmyadmin');
}

const handle = (inquiry) => {
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