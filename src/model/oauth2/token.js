module.exports = class extends think.Mongoose {
  get schema() {
    return {
      userId:String,
      clientId:String,
      accessToken:String,
      accessTokenExpiresOn:Date,
      refreshToken: String,
      refreshTokenExpiresOn:String
    }
  }
}