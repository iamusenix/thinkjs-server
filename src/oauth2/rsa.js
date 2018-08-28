const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const publicKey = key.exportKey('pkcs8-public');
const privateKey = key.exportKey('pkcs8-private');

module.exports = {
    publicKey:function(){
        return publicKey;
    },
    encrypt: function(data){
        let nodeRSA = new NodeRSA(publicKey,'pkcs8-public');
        return nodeRSA.encrypt(data, 'base64');
    },
    decrypt: function(data){
        let nodeRSA = new NodeRSA(privateKey,'pkcs8-private');
        return nodeRSA.decrypt(data, 'utf8');
    }
}
