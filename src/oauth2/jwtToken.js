const jwt = require('jsonwebtoken');

const options = {
    algorithm: "HS256",
    expiresIn: "24h"
};
const secret = 'secret';
module.exports = {
    sign:function(payload){
        let token = jwt.sign(payload,secret,options);
        return token;
    },
    verify: function(token){
        try{
            let decoded = jwt.verify(toekn,secret);
            return decoded.payload;
        }catch(e){
            return null;
        }
    }
}
