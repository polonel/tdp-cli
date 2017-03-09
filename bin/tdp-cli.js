#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode

  process.title = 'tdp'

  var path = require('path')
  var tdp = require('../lib/tdp.js')
  var minimist = require('minimist');
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
      default:
        console.log('Invalid Command. Show Help here.');
  }

//   log.verbose('cli', process.argv)

//   log.info('using', 'tdp', '1.0.0')
//   log.info('using', 'node', process.version)

})()