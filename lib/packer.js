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
    if (typeof(callback) !== 'function')
        throw new Error('Callback is not a function');
    var directory = '.';
    if (dir !== undefined && dir !== '.')
        directory = dir;

    var fileName = path.basename(path.resolve(directory));
    var pluginsDir = path.join(__dirname, '../plugins/');
    if (!fs.existsSync(pluginsDir)) fs.mkdirSync(pluginsDir);
    var dirDest = fs.createWriteStream(path.join(pluginsDir, fileName + '.tar'));

    tar.create({
        file: path.join(pluginsDir, fileName + '.tar'),
        preservePaths: true,
        filter: function(dir, state) {
            if (dir.includes('.git'))
                return false;
            if (dir.includes('.idea'))
                return false;

            return true;
        }
    }, [directory], callback);
}

module.exports.unpack = function(file, callback) {
    var baseFilename = path.basename(file, '.tar');
    var extractDir = path.join(__dirname, '../plugins/');
    if (!fs.existsSync(extractDir)) fs.mkdirSync(extractDir);
    
    // var extracter = tar.Extract({path: extractDir})
    // .on('error', callback)
    // .on('end', function() { return callback(null, extractDir + baseFilename); });

    // fs.createReadStream(path.join(extractDir, file))
    // .on('error', callback)
    // .pipe(extracter);
}
