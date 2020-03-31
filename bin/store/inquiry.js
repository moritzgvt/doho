#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const { store } = require('./store');

const generateRequestObject = () => {
    const newInquiry = {
      action: argv._[0],
      payload: argv._,
      source: argv
    }

    store.updateInquiry(newInquiry);

    return newInquiry;
}

exports.generate = generateRequestObject;