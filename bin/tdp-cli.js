#!/usr/bin/env node
;(function () { 

  process.title = 'tdp'

  var path = require('path')
  var tdp = require('../lib/tdp.js')
  var minimist = require('minimist');
  var chalk = require('chalk');
  var argv = minimist(process.argv.slice(2));

  switch (argv._[0]) {
      case "config":
        tdp.config.init();
        break;
      case "init":
        tdp.init();
        break;
      case "view":
        tdp.view(argv._[1]);
        break;
      case "register":
        tdp.register(argv._[1]);
        break;
      case "install":
        tdp.install(argv._[1]);
        break;
      case "remove":
        tdp.remove(argv._[1]);
        break;
      case "pack":
        tdp.pack(argv._[1], function(err, data) {
          
        });
        break;
      default:
        console.log(chalk.red('Invalid Command.'));
        console.log('');
        console.log('tdp usage: tdp <command>');
        console.log('where <command> is one of:');
        console.log('   config             set the configuration for tdp');
        console.log('   init               init a new trudesk plugin in the given folder');
        console.log('   view <plugin>      search a view details of the given plugin');
        console.log('   register           register and upload the plugin to the central plugin repository')
        console.log('   install <plugin>   download and install the plugin to the configured trudesk server');
        console.log('   remove <plugin>    remove the given plugin from the configured trudesk server');
  }

//   log.verbose('cli', process.argv)

//   log.info('using', 'tdp', '1.0.0')
//   log.info('using', 'node', process.version)

})()