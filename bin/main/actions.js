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

const set = async () => {
  const inq = await store.inq();
  await store.set[inq.payload[1]](inq.payload[2]);
}

const get = async () => {
  const inq = await store.inq();
  await store.get[inq.payload[1]](inq.payload[2]);
}

const clear = async () => {
  const inq = await store.inq();
  await store.clear[inq.payload[1]]();
}

const show = async () => {
  const inq = await store.inq();
  await store.show[inq.payload[1]](inq.payload[2]);
}

exports.actions = {
  start: start,
  stop: stop,
  add: add,
  set: set,
  get: get,
  clear: clear,
  show: show
}