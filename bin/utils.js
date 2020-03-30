#! /usr/bin/env node
// const { exec } = require('child_process');
const chalk = require('chalk');

const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

const packageConfig = require('../package.json');

const services = {
  wordpress: 'wordpress:latest',
  pma: 'phpmyadmin/phpmyadmin',
  phpmyadmin: 'phpmyadmin/phpmyadmin',
  mysql: 'mysql:latest',
  db: 'mysql:latest'
}

const checkActivity = async (service, type) => {
  let promises = [];
  let output = {status: false, info: {}};

  const containers = await docker.listContainers()
    .then(containers => containers)
    .catch((err) => {
      handleError('Error in listContainers: ' + err);
    })
  
  containers.forEach( (container) => {
    promises.push(
      checkPresence(container.Image, services[service])
        .then((res) => {
          if (res) {
            output = {status: true, info: container};
          }
          return '0';
        })
    )
  })

  return new Promise(
    function (resolve) {
      Promise.all(promises)
        .then(() => {
          resolve(output);
        })
        .catch((err) => {
          handleError(err);
        })
    }
  )
}

const checkPresence = (location, payload) => {
  return new Promise( 
    function(resolve) {
      location === payload
        ? resolve(true)
        : resolve(false)
    }
  );
}

const handleError = (payload) => {
  handleLog(payload, 'error');
  return;
}

const handleLog = (message, type='normal') => {
  switch (type) {
    case 'success':
      console.log(
        chalk.green(message)
      );
      break;
    case 'error':
      console.log(
        chalk.red(message)
          + '\n\n'
          + chalk.gray('For more information visit '
            + chalk.underline(packageConfig.repository.url)
          )
      );
      break;
    case 'normal':
      console.log(message);
      break;
    default:
      console.log(
        chalk.red('Please pass one of the following output types: [success, error, normal].')
      );
      break;
  }
}

exports.tools = {
  check: {
    activity: checkActivity,
    presence: checkPresence
  },
  handle: {
    error: handleError,
    log: handleLog
  }
}