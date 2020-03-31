#! /usr/bin/env node
const { exec } = require('child_process');

const { print } = require('../log');

const up = async (project) => {
  const promise = new Promise((resolve, reject) => {
    exec(
      'docker-compose up -d', 
      { cwd: project.path },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stdout ? stdout : stderr);
      }
    );
  });

  const response = await promise
    .then((res) => {
      print(
        res, 
        'success',
        'Started project ' + project.name
      );
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while starting project' + project.name);
      return;
    });
  
  return response;
}

const down = async (project) => {
  const promise = new Promise((resolve, reject) => {
    exec(
      'docker-compose down', 
      { cwd: project.path },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stdout ? stdout : stderr);
      }
    );
  });

  const response = await promise
    .then((res) => {
      print(
        res, 
        'success',
        'Stopped project ' + project.name
      );
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while stopping project ' + project.name);
      return;
    });
  
  return response;
}

exports.actions = {
  'compose': {
    up: up,
    down: down
  }
}