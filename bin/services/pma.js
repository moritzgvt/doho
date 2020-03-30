#! /usr/bin/env node
const start = (inquiry) => {
  console.log('Start phpmyadmin');
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