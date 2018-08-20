const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    getResource(){
        return 'oauth2/client';
    }

};
