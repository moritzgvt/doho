#! /usr/bin/env node
const doho = () => {
  const handle = require('./handler.js');
  const object = require('./store/object.js');
  const inquiry = object.generate();

  switch (inquiry.type) {
    case 'action':
      handle.action(inquiry);
      break;
    default:
      handle.mutation(inquiry);
      break;
  }
}
exports.doho = doho;