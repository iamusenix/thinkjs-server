module.exports = class extends think.Mongoose {
  get schema() {
    return {
      userId:String,
      clientId:String,
      accessToken:String,
      accessTokenExpiresAt:Date,
      refreshToken: String,
      refreshTokenExpiresAt:String
    }
  }
}