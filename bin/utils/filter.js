#! /usr/bin/env node
const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

const getCurrentProject = async () => {
  docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
      console.log(containerInfo);
    });
  });
}

exports.filter = {
  currentProject: getCurrentProject
}