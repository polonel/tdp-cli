var tar = require('tar')
var fstream = require('fstream')
var fs = require('fs')
var path = require('path')

function onError(err) {
    // switch(err.code) {
    //     case 'EROFS':
    //     default:
    //         console.error('An error occurred:', err);
    //         break;
    // }
    console.error('An error occurred:', err);
}

function onEnd() {
    console.log('Packed!');
}

module.exports.pack = function(dir, callback) {
    var directory = '.';
    if (dir !== undefined && dir !== '.')
        directory = dir;

    var fileName = path.basename(path.resolve(directory));
    var pluginsDir = path.join(__dirname, '../plugins/');
    if (!fs.existsSync(pluginsDir)) fs.mkdirSync(pluginsDir);
    var dirDest = fs.createWriteStream(path.join(pluginsDir, fileName + '.tar'));

    var packer = tar.Pack({ noProprietary: true })
    .on('error', callback)
    .on('end', callback);

    fstream.Reader({path: process.cwd(), type: "Directory"})
    .on('error', callback)
    .pipe(packer)
    .pipe(dirDest)
}

module.exports.unpack = function(file, callback) {
    var baseFilename = path.basename(file, '.tar');
    // fs.mkdirSync(path.join(process.cwd(), '/', baseFilename));
    //console.log(path.join(process.cwd(), '/', baseFilename));
    var extractDir = path.join(__dirname, '../plugins/');
    if (!fs.existsSync(extractDir)) fs.mkdirSync(extractDir);
    var extracter = tar.Extract({path: extractDir})
    .on('error', callback)
    .on('end', function() { return callback(null, extractDir + baseFilename); });

    fs.createReadStream(path.join(extractDir, file))
    .on('error', callback)
    .pipe(extracter);
}
