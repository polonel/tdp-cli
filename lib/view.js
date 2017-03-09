'use strict'
var _ = require('underscore');
var request = require('request');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var viewCmd = {};

var pluginServer = 'http://plugins.trudesk.io';

viewCmd.view = function(pluginName) {
    request.get(pluginServer + '/api/plugin/' + pluginName, function(err, response, body) {
        if (err) return console.log(chalk.red(err));

        var parseBody = JSON.parse(body);
        if (parseBody.success) {
            if (parseBody.plugin.length < 1) {
                return console.log('No Plugin found: ' + pluginName);
            } else {
                var plugin = _.clone(parseBody.plugin[0]);
                delete plugin.__v;
                delete plugin.url;
                delete plugin.pluginjson.menu;
                delete plugin.pluginjson.permissions;
                console.log(plugin);
            }
        }
    });
};

module.exports = viewCmd;