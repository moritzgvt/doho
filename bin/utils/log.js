#! /usr/bin/env node
const chalk = require('chalk');

const printToConsole = (message, type, title=undefined) => {

  console.log('\n');

  switch (type) { 
    case 'error':
      console.log(
        chalk.black.bgRed(('  ' + title + '  ' || '  Error!  ') + '\n\n'),
        chalk.red(message)
      )
      break;
    case 'success':
      console.log(
        chalk.black.bgGreen(('  ' + title + '  ' || '  Success!  ') + '\n\n'),
        chalk.green(message)
      )
      break;
    default:
      console.log(
        chalk.black.bgYellow(('  ' + title + '  ' || '  Hello from doho!  ') + '\n\n'),
        chalk.yellow(message)
      )
      break;
  } 

  console.log('\n');
}

exports.print = printToConsole;