#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));

const actions = ['start', 'stop'];

const generateRequestObject = () => {
  if (actions.includes(argv._[0])) {
    const newInquiry = {
      type: 'action',
      action: argv._[0],
      service: argv._[1],
      target: argv._[2],
      source: argv
    }
    return newInquiry;
  } else {
    const newInquiry = {
      type: 'mutation',
      mutation: argv._[0],
      payload: argv._[1],
      source: argv
    }
    return newInquiry;
  }
}

exports.generate = generateRequestObject;