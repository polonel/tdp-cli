var colors = require('colors/safe');

module.exports.init = [
    {
        name: 'name',
        description: colors.magenta('Name of Plugin'),
        required: true,
        type: 'string'
    },
    {
        name: 'version',
        description: 'Plugin initial version',
        'default': '1.0.0',
        pattern: /^([0-9]){1,2}\.([0-9]){1,3}\.([0-9]){1,3}$/,
        message: 'Version must be a valid semver. (1.0.0)'
    },
    {
        name: 'description',
        description: 'Plugin description',
        type: 'string'
    },
    {
        name: 'github',
        description: 'Github repository',
        type: 'string'
    },
    {
        name: 'author:name',
        description: "Author's name",
        type: 'string'
    },
    {
        name: 'author:email',
        description: "Author's Email",
        type: 'string'
    },
    {
        name: 'author:url',
        description: "Author's URL",
        type: 'string'
    }
];

module.exports.config = [
    {
        name: 'host',
        description: colors.magenta('Host address of the trudesk server'),
        required: true,
        type: 'string',
        //pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
        message: 'Host must be the full url. (http://www.trudesk.io)'
    },
    {
        name: 'username',
        description: colors.magenta('Trudesk username for an admin account'),
        required: true,
        type: 'string',
    },
    {
        name: 'password',
        description: colors.magenta('Password for given username'),
        required: true,
        hidden: true,
        type: 'string'
    }
];