#! /usr/bin/env node
const { store } = require('./store/store');
const { actions } = require('./actions/actions')

const start = async () => {
  const project = await store.project();
  actions.compose.up(project);
}

const stop = async () => {
  const project = await store.project();
  actions.compose.down(project);
}

const create = async () => {
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

  await store.create(newProject);
}

const clear = async () => {
  const inq = await store.inq();
  await store.clear[inq.payload[1]]();
}

const path = async () => {
  const inq = await store.inq();
  await store.path[inq.payload[1]]();
}

exports.actions = {
  start: start,
  stop: stop,
  create: create,
  clear: clear,
  path: path 
}