    var async = require('async');
    var gfs = require('graceful-fs');
    var fs = gfs.gracefulify(require('fs'));
    var path = require('path');
    var touch = require('touch');

    var chalk = require('chalk');
    var clear = require('clear');
    var CLI = require('clui');
    var Spinner = CLI.Spinner;
    var _ = require('underscore');
    var minimist = require('minimist');

    var cwd = process.cwd();

    tdp_init = {};

    tdp_init.init = function() {
        var argv = minimist(process.argv.slice(2));
        if (argv._[0] !== 'init') {
            console.log(chalk.red('Invalid Command!'));
        } else {
            var status = new Spinner('Creating folder structure...');
            status.start();
            async.series([
                function(done) {
                    // Routes
                    fs.stat(path.join(cwd, '/routes'), function(err, stats) {
                        if (err) {
                            if (err.code === 'ENOENT') {
                                return fs.mkdir(path.join(cwd, '/routes'), done);
                            } else {
                                return done();
                            }
                        }

                        return done();
                    });
                },
                function(done) {
                    var file = path.join(cwd, '/routes/', 'index.js');
                    if (!fileExists(file)) {
                        touch(file, function(err) {
                            if (err) return done(err);

                            fs.appendFile(file, '//Routes File', done);
                        });
                    } else {
                        done();
                    }
                },
                function(done) {
                    var viewsDir = path.join(cwd, '/views');
                    fs.stat(viewsDir, function(err, stats) {
                        if (err) {
                            if (err.code === 'ENOENT') {
                                return fs.mkdir(viewsDir, done);
                            } else {
                                return done();
                            }
                        }

                        return done();
                    });
                },
                function(done) {
                    var file = path.join(cwd, '/views/', 'main.hbs');
                    if (!fileExists(file)) {
                        touch(file, function(err) {
                            if (err) return done(err);

                            fs.appendFile(file, '<HTML>\r\n</HTML>', done);
                        });
                    } else {
                        done();
                    }
                    
                },
                function(done) {
                    var modelsDir = path.join(cwd, '/models');
                    fs.stat(modelsDir, function(err, stats) {
                        if (err) {
                            if (err.code === 'ENOENT') {
                                return fs.mkdir(modelsDir, done);
                            } else {
                                return done();
                            }
                        }

                        return done();
                    });
                },
                function(done) {
                    var controllersDir = path.join(cwd, '/controllers');
                    fs.stat(controllersDir, function(err, stats) {
                        if (err) {
                            if (err.code === 'ENOENT') {
                                return fs.mkdir(controllersDir, done);
                            } else {
                                return done();
                            }
                        }

                        return done();
                    });
                },
                function(done) {
                    var file = path.join(cwd, '/controllers/', 'index.js');
                    if (!fileExists(file)) {
                        touch(file, function(err) {
                            if (err) return done(err);

                            fs.appendFile(file, '//Controllers', done);
                        });
                    } else {
                        done();
                    }
                    
                },
                function(done) {
                    var file = path.join(cwd, 'plugin.json');
                    if (!fileExists(file)) {
                        touch(file, function(err) {
                            return done(err);
                        });
                    } else {
                        done();
                    }
                }, 
                function(done) {
                    var file = path.join(cwd, 'plugin.json');
                    var prompt = require('prompt');
                    var questions = require('./questions');
                    var obj = {};
                    fs.readFile(file, 'utf8', function(err, contents) {
                        if (err) return done(err);
                        if (contents.length > 0)
                            obj = JSON.parse(contents);
                        else
                            obj = {}; //Defaults

                        prompt.start();
                        prompt.message = '';
                        prompt.delimiter = ':';
                        status.stop();
                        prompt.get(questions.init, function(err, result) {
                            if (err) return done(err);
                            
                            obj.name = result['name'];
                            obj.version = result['version'];
                            if (result['description']) obj.description = result['description'];
                            if (result['github']) obj.github = result['github'];
                            if (result['author:name'] ||
                                result['author:email'] ||
                                result['author:url']) {
                                    obj.author = {
                                        name: result['author:name'],
                                        email: result['author:email']
                                    }
                                    if (result['author:url']) obj.author.url = result['author:url'];
                            }
                            

                            fs.writeFile(file, JSON.stringify(obj, null, 2) + '\n', done);
                            
                        });
                    });
                }
            ], function(err) {
                status.stop();
                if (err) {
                    console.log(chalk.red(err));
                } else {
                    console.log(chalk.blue('Plugin initialized.'));
                }
            });   
        }   
    };

    function fileExists(file) {
        try {
            fs.accessSync(file);
            return true;
        } catch (e) {
            return false;
        }
    }

module.exports = tdp_init;