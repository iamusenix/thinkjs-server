const bcrypt = require('bcrypt');
module.exports = {
     getUser:async function(username, password){
        let User = think.mongoose('user');
        let passHash = await bcrypt.hash(password,10);
        return await User.findOne({userName:username, passHash:passHash},'id, userName');
    },
    saveToken:async function(token, client, user){
        let data = {
            accessToken: token.accessToken,
            accessTokenExpiresOn: token.accessTokenExpiresOn,
            clientId: client.id,
            refreshToken: token.refreshToken,
            refreshTokenExpiresOn: token.refreshTokenExpiresOn,
            userId: user.id
        };
        let Token = think.mongoose('oauth2/token');
        let t = new Token(data);
        return await t.save();
    },
    getClient : async function(clientId, clientSecret) {
        let Client = think.mongoose('auth2/client');
        return await Client.findOne({clientId, clientSecret});
    }
}