#! /usr/bin/env node
const { store } = require('../store/store');
const { service } = require('./services')

const start = async () => {
  const project = await store.project();
  service.compose.up(project);
}

const stop = async () => {
  const project = await store.project();
  service.compose.down(project);
}

const add = async () => {
  const inq = await store.inq();
  const path = inq.payload[3]
    ? inq.payload[3]
    : await store.path.get();

  if (!path) { return; }

  const newProject = {
    name: inq.payload[1],
    type: inq.payload[2],
    path: path + inq.payload[1]
  }

  await store.add(newProject);
}

const path = async () => {
  const inq = await store.inq();
  await store.path[inq.payload[1]]();
}

const clear = async () => {
  const inq = await store.inq();
  await store.clear[inq.payload[1]]();
}

exports.actions = {
  start: start,
  stop: stop,
  add: add,
  clear: clear,
  path: path
}