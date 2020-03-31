#! /usr/bin/env node
const doho = () => {
  const inquiry = require('./store/inquiry');
  const { actions } = require('./handler');

  const inq = inquiry.generate();

  actions[inq.action]();
}
exports.doho = doho;