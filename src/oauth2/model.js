const bcrypt = require('bcrypt');
const jwtToken = require('./jwtToken');
module.exports = {
     getUser:async function(username, password){
        let User = think.mongoose('user');
        let passHash = await bcrypt.hash(password,10);
        console.log(username,password,passHash);
        let user =  await User.findOne({userName:username}).lean();
        let valid = await bcrypt.compare(password, user.passHash);
        if(valid){
            delete user.passHash;
            console.log(user);
            return user;
        }else{
            return valid;
        }
    },
    saveToken:async function(token, client, user){
        let data = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            clientId: client.id,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            userId: user.id
        };
        let Token = think.mongoose('oauth2/token');
        let t = new Token(data);
        
        await t.save();
       
        token.client = client;
        token.user = user;
        return token;
    },
    getClient : async function(clientId, clientSecret) {
        let Client = think.mongoose('auth2/client');
        let client = await Client.findOne({clientId}).lean();
        delete client.clientSecret;
        return client;
    },
    generateAccessToken: async function(client, user, scope){
        let payload = {
            userId:user.id,
            clientId:client.clientId
        };
        let token = jwtToken.sign(payload);
        return token;
    }

}