"use strict"
var _       = require('underscore');
var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var Spinner = CLI.Spinner;
var request = require('request');
var fs = require('fs');
var path = require('path');

var configFile = path.join(__dirname, '../.tdprc');
var config = {};
if (fs.existsSync(configFile))
    config = JSON.parse(fs.readFileSync(configFile));

var installCmd = {};

var pluginServer = 'http://plugins.trudesk.io';

installCmd.install = function(pluginName) {
    if (_.isUndefined(pluginName)) {
        console.log(chalk.red('Invalid command'))
        console.log(chalk.black('usage: tdp install plugin'));
        return;
    }
    var spinner = new Spinner('Installing plugin...');
    spinner.start();

    request.get(pluginServer + '/api/plugin/' + pluginName, function (err, response, body) {
        if (err) {
            console.log(chalk.red(err));
            spinner.stop();
            return
        }

        var plugin = JSON.parse(body).plugin[0];
        if (_.isUndefined(plugin)) {
            console.log(chalk.red('No plugin ' + pluginName + ' found.'));
            spinner.stop();
            return;
        }

        request({
                method: 'GET',
                url: config.host + '/api/v1/plugins/install/' + plugin._id, 
                headers: { 'Content-Type': 'application/json', 'accesstoken': config.accesstoken}
            },
            function(err, response, body) {
                if (err) {
                    spinner.stop();
                    return console.log(chalk.red(err));
                }

                var res = JSON.parse(body);
                if (!res.success) {
                    spinner.stop();                
                    return console.log(chalk.red(res.error));
                } else {
                    request.get(pluginServer + '/api/plugin/package/' + plugin._id + '/increasedownloads', function() {
                        //Doesn't really matter if it errored out or not.
                        
                        spinner.stop();                
                        console.log(chalk.green('Plugin ' + pluginName + ' installed at server: ' + config.host));
                    });
                }            
        });
    });
};

installCmd.remove = function(pluginName) {
    if (_.isUndefined(pluginName)) {
        console.log(chalk.red('Invalid Command'));
        console.log(chalk.black('usage: tdp remove plugin'));
        return;
    }

    var spinner = new Spinner('Removing plugin...');
    spinner.start();

    request.get(pluginServer + '/api/plugin/' + pluginName, function(err, response, body) {
        if (err) {
            console.log(chalk.red(err));
            spinner.stop();
            return;
        }

        var plugin = JSON.parse(body).plugin[0];

        if (_.isUndefined(plugin)) {
            console.log(chalk.red('No plugin ' + pluginName + ' found.'));
            spinner.stop();
            return;
        }

        request({
                method: 'DELETE',
                url: config.host + '/api/v1/plugins/remove/' + plugin._id, 
                headers: { 'Content-Type': 'application/json', 'accesstoken': config.accesstoken}
            }, function(err, response, body) {
                if (err) {
                    spinner.stop();
                    return console.log(chalk.red(err));
                }

                var res = JSON.parse(body);
                if (!res.success) {
                    spinner.stop();
                    return console.log(chalk.red(res.error));
                } else {
                    spinner.stop();
                    console.log(chalk.green('Plugin ' + pluginName + ' removed at server: ' + config.host));
                }
            });
    });
};


module.exports = installCmd;
