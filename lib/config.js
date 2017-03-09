"use strict"
var _       = require('underscore');
var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var Spinner = CLI.Spinner;
var request = require('request');
var fs = require('fs');
var path = require('path');
var request = require('request');

var questions = require('./questions').config;
var prompt = require('prompt');

var configCmd = {};

var configObj = {};

var tdprcPath = path.join(__dirname, '../.tdprc');

var hasTDPRC = fs.existsSync(tdprcPath);
if (!hasTDPRC) {
    console.log(chalk.red('No Configuration file. Please run `tdp config init`'));
}

configCmd.init = function() {
    if (hasTDPRC) {
        return console.log(chalk.yellow('Configuration file already exists. Please use set/get to edit configuration file.'));
    }

    prompt.start();
    prompt.message = '';
    prompt.delimiter = ':';
    prompt.get(questions, function(err, result) {
        if (err) {
            return console.log(chalk.red('Error', err));
        }

        configObj.host = result['host'];

        request.post({
            url: configObj.host + '/api/v1/login',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': result['username'],
                'password': result['password']
            })
        }, function(err, response, body) {
            if (err) return console.log(chalk.red('Error: ', err));

            var resJson = JSON.parse(body);
            if (resJson.success) {
                configObj.accesstoken = resJson.accessToken;

                fs.writeFile(tdprcPath, JSON.stringify(configObj, null, 2) + '\n', function(err) {
                    if (err) return console.log(chalk.red('Error: ', err));

                    console.log(chalk.green('Configuration Saved!'));
                });
            } else {
                console.log(chalk.red('Error: ', resJson.error));
            }            
        });
    });
};

configCmd.set = function(key, value) {

};

module.exports = configCmd;