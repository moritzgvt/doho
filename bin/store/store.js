#! /usr/bin/env node
const Configstore = require('configstore');
const fs = require('fs');

const packageConfig = require('../../package.json');
const { print } = require('../utils/log');

const config = new Configstore(packageConfig.name, {
  default_path: '',
  current_project: '',
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

const getCurrentProject = async () => {
  const promise = new Promise((resolve, reject) => {
    const currentProject = config.get('current_project');
    currentProject
      ? resolve(currentProject)
      : reject('There\'s currently no project running!')
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while getting currentProject');
      return;
    })

    return response;
}

const getProject = async (target=undefined) => {
  const searched = target ? target : config.get('inq').payload[1];
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
      return;
    });
  
  return response;
}

const getProjects = async () => {
  const projects = config.get('projects');

  const promise = new Promise((resolve, reject) => {
    projects
      ? resolve(projects)
      : reject('Something went wrong.');
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while getting projects');
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

const setCurrentProject = async (payload) => {
  const promise = new Promise((resolve, reject) => {
    config.delete('current_project');
    config.set('current_project', payload);

    const currentProject = config.get('current_project');

    currentProject === payload
      ? resolve(currentProject)
      : reject('Couldn\'t set current_project')
  });

  const response = await promise
    .then((res) => {
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while setting current project')
      return err;
    })
  
    return response;
}

const updateInq = async (newInquiry) => {
  const promise = new Promise((resolve, reject) => {
    config.delete('inq');
    config.set('inq', newInquiry);

    const inq = config.get('inq');

    inq
      ? resolve('New Inquiry set!')
      : reject('Could not set new inquiry')
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

const addProject = async (newProject) => {
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
        res,
        'success',
        'New project \'' + res.name + '\' added:'
      );
      return res;
    })
    .catch((err) => {
      print(err, 'error', 'Error while adding new project');
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

// showers
const showProject = async (target=undefined) => {
  const inq = await getInquiry();

  if (inq.source.all || inq.source.a) {
    await getProjects()
      .then((res) => {
        print(res, 'success', 'This is your project registry:');
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
    return;
  }

  if (target) {
    await getProject(target)
      .then((res) => {
        print(res, 'success', 'This is the project ' + target + ':');
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
    return;
  }

  const currentProject = await getCurrentProject();

  if (currentProject) {
    await getProject(currentProject)
      .then((res) => {
          print(res, 'success', 'This is the currently running project');
        return;
      })
  }
}

const showPath = async (target=undefined) => {
  const inq = await getInquiry();

  if (inq.source.default || inq.source.d) {
    await getPath()
      .then((res) => {
        print(res, 'success', 'This is your default path:');
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
    return;
  }

  if (inq.source.all || inq.source.a) {
    await getProjects()
      .then((res) => {
        const projectPaths = [];
        res.forEach((project) => {
          const elm = {
            project: project.name,
            path: project.path
          }
          projectPaths.push(elm);
        })
        print(projectPaths, 'success', 'These are all your paths in use:');
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
    return;
  }

  if (target) {
    await getProject(target)
      .then((res) => {
        print(res.path, 'success', 'This is the path of ' + target);
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
    return;
  }

  const currentProject = await getCurrentProject();

  if (currentProject) {
    await getProject(currentProject)
      .then((res) => {
          print(res.path, 'success', 'This is the path of the currently running project');
        return;
      })
  }
}

const showType = async (target) => {
  const inq = await getInquiry();

  if (inq.source.all || inq.source.a) {
    await getProjects()
      .then((res) => {
        const projectTypes = [];
        res.forEach((project) => {
          const elm = {
            project: project.name,
            type: project.type
          }
          projectTypes.push(elm);
        })
        print(projectTypes, 'success', 'This is a list of all types of your projects:');
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
    return;
  }

  if (target) {
    await getProject(target)
      .then((res) => {
        print(res.type, 'success', 'This is the path of ' + target);
      })
      .catch((err) => {
        print(err, 'error');
        return;
      })
      return;
  }

  const currentProject = await getCurrentProject();

  if (currentProject) {
    await getProject(currentProject)
      .then((res) => {
          print(res.type, 'success', 'This is the type of the currently running project');
        return;
      })
  }
}

exports.store = {
  config: config,
  updateInquiry: updateInq,
  inq: getInquiry,
  project: getProject,
  add: addProject,
  projects: getProjects,
  set: {
    path: setPath,
  },
  get: {
    path: getPath
  },
  clear: {
    projects: clearProjects
  },
  show: {
    project: showProject,
    path: showPath,
    type: showType
  },
  isolated: {
    set: {
      currentProject: setCurrentProject
    },
    get: {
      currentProject: getCurrentProject
    }
  }
}