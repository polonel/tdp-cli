(function() {
    var async = require('async');
    var gfs = require('graceful-fs');
    var fs = gfs.gracefulify(require('fs'));
    var path = require('path');
    var touch = require('touch');
    var EventEmitter = require('events').EventEmitter;
    var chalk = require('chalk');
    var clear = require('clear');
    var CLI = require('clui');
    var Spinner = CLI.Spinner;
    var _ = require('underscore');
    var minimist = require('minimist');
    var tdp = module.exports = new EventEmitter;
    var cwd = process.cwd();

    //tdp modules
    var tdp_config = require('./config');
    tdp.config = tdp_config;

    var plugin_js = require('./plugin.json');
    var tdp_init = require('./init');
    tdp.init = tdp_init.init;

    var tdp_view = require('./view');
    tdp.view = tdp_view.view;

    var tdp_pack = require('./packer');
    tdp.pack = tdp_pack.pack;
    tdp.unpack = tdp_pack.unpack;

    var tdp_install = require('./install');
    tdp.install = tdp_install.install;
    tdp.remove = tdp_install.remove;

    var tdp_upload = require('./upload');
    tdp.upload = tdp_upload;
    tdp.register = function(file) {
        tdp.pack('.', function(err) {
            if (err) {
                return console.log(chalk.red(err));
            }

            const pluginFile = process.cwd() + '/plugin.json';
            plugin_js.getPluginJSON(process.cwd() + '/plugin.json', function(err, pluginJSON) {
                if (err) {
                    return console.log(chalk.red(err));
                }

                var pluginTar = path.join(__dirname, '../plugins/', path.basename(process.cwd()) + '.tar');

                return tdp_upload.uploadMeta(pluginTar, pluginJSON);
            });
        });
    }
})();