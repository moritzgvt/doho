#! /usr/bin/env node
const Configstore = require('configstore');
const fs = require('fs');

const packageConfig = require('../../package.json');
const { print } = require('../utils/log');

const config = new Configstore(packageConfig.name, {
  default_path: '',
  inq: {},
  projects: []
});

// Getter
const getPath = async () => {
  const promise = new Promise((resolve, reject) => {
    const path = config.get('default_path');
    path 
      ? resolve(path)
      : reject('No default path specified.');
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(
        err + '\n\nTry \n $ doho path set ~/your/path', 
        'error', 
        'Error while getting path'
      );
      return;
    });
  
  return response;
}

const getInquiry = async () => {
  const promise = new Promise((resolve, reject) => {
    resolve(config.get('inq'));
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while getting inquiry');
      return;
    });
  
  return response;
}

const getProject = async (custom=undefined) => {
  const searched = custom ? custom : config.get('inq').payload[1];
  const projects = config.get('projects');

  const promise = new Promise((resolve, reject) => {
    projects.forEach((project) => {
      if (project.name === searched) {
        resolve(project);
        return;
      }
    })

    reject('Project doesn\'t exist.');
    return;
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while getting project');
      return err;
    });
  
  return response;
}

// Setter
const setPath = async () => {
  const inq = config.get('inq');
  const promise = new Promise((resolve, reject) => {
    let newPath = inq.payload[2];

    if (!fs.existsSync(newPath)) {
      reject('ENOENT: Path doesn\'t exist.');
      return;
    }

    if (newPath.substr(-1) !== '/') {
      newPath = newPath + '/'
    }

    config.delete('default_path');
    config.set('default_path', newPath);

    config.get('default_path') === newPath
     ? resolve(config.get('default_path'))
     : reject('Couldn\'t set new path')
  });

  const response = await promise
    .then((res) => {
      print(
        res,
        'success',
        'Successfully set new default path'
      );
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while setting path');
      return;
    });
  
  return response;
}

const updateInq = async (newInquiry) => {
  const promise = new Promise((resolve, reject) => {
    config.delete('inq');
    config.set('inq', newInquiry);
    resolve('Inquiry set!');
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while updating inquiry');
      return;
    });
  
  return response;
}

const createProject = async (newProject) => {
  const promise = new Promise((resolve, reject) => {
    const projects = config.get('projects');
    let duplicate;

    projects.forEach((project) => {
      if (project.name === newProject.name) {
        duplicate = true;
        return;
      }
    })

    if (duplicate) {
      reject('Project already exist or duplicate name.');
      return;
    }

    const newProjects = [ ...projects, newProject ]

    config.delete('projects');
    config.set('projects', newProjects);
    resolve(newProject);
  });

  const response = await promise
    .then((res) => {
      print(
        'Overview:\n' + JSON.stringify(res), 
        'success',
        'New project \'' + res.name + '\' created:'
      );
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while creating new project');
      return;
    })
  
  return response;
}

// Clearer
const clearProjects = async () => {
  const promise = new Promise((resolve, reject) => {
    const newProjects = [];

    config.delete('projects');
    config.set('projects', newProjects);
    resolve('Projects cleared!');
  });

  const response = await promise
    .then((res) => {
      print(res, 'success');
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while clearing projects');
      return;
    });
  
  return response;
}

// User funcitons
const showProject = async (custom=undefined) => {
  if (!custom) {

  }

  await getProject(custom)
    .then((res) => {
      console.log('\n');
      console.log(res);
    })
    .catch((err) => {
      return;
    })
}

exports.store = {
  config: config,
  inq: getInquiry,
  path: {
    set: setPath,
    get: getPath
  },
  project: getProject,
  updateInquiry: updateInq,
  create: createProject,
  clear: {
    projects: clearProjects
  },
  show: {
    project: showProject
  }
  
}