var fs = require('fs'),
    path = require('path');

module.exports.getPluginJSON = function(file, cb) {
    fs.readFile(file, function(err, data) {
        if (err) {
            console.error('Error Occurred:', err);
            return cb(err);
        }

        var pluginJSON = JSON.parse(data);

        return cb(null, pluginJSON);
    })
};