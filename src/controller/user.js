const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    getResource(){
        return 'user';
    }
};
