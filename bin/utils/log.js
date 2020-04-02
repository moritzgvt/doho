#! /usr/bin/env node
const chalk = require('chalk');

const printToConsole = (message, type, title=undefined) => {

  console.log('\n');

  switch (type) { 
    case 'error':
        console.log(
          chalk.black.bgRed((title ? '  ' + title + '  ' : '  Error!  ') + '\n')
        );
        console.log(message);
      break;
    case 'success':
        console.log(
          chalk.black.bgGreen((title ? '  ' + title + '  ' : '  Success!  ') + '\n'),
        );
        console.log(message);
      break;
    default:
        console.log(
          chalk.black.bgYellow((title ? '  ' + title + '  ' : '  Hello from doho!  ') + '\n')
        );
        console.log(message);
      break;
  } 

  console.log('\n');
}

exports.print = printToConsole;