var _ = require('underscore');
var request = require('request');
var fs = require('fs');
var path = require('path');
var uploads = {};

// var pluginServerUrl = 'http://plugins.trudesk.io';
var pluginServerUrl = 'http://localhost:8117'

uploads.uploadMeta = function(file, pluginJSON, callback) {
    var obj = _.clone(pluginJSON);
    obj.pluginJSON = pluginJSON;
    request({
        method: 'POST',
        uri: pluginServerUrl + '/api/registry/package/meta',
        body: JSON.stringify(obj, null, 2),
        headers: {
            'content-type': 'application/json'
        }
    }, function (err, response, body) {
        if (err) return console.error('Failed to send Metadata:', err);
        if (response.statusCode === 201) {
            // Good to upload File
            var resObj = JSON.parse(response.body);
            return uploads.upload(file, resObj.plugin._id, resObj.plugin.pluginjson.version);
        } else {
            return console.error('Failed to send Metadata:', JSON.parse(response.body).error);
        }
    });
}

uploads.upload = function(file, newPackageId, version) {
    request({
        method: 'PUT',
        url: pluginServerUrl + '/api/registry/package/' + newPackageId + '/' + version ,
        formData: {package: fs.createReadStream(file) }
    },
    function (err, response, body) {
        if (err) {
            return console.error('Upload Failed:', err);
        }

        console.log('Upload Successful! Server Response:', body);
    });
};

module.exports = uploads;