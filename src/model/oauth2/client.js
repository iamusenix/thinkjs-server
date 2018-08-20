module.exports = class extends think.Mongoose {
  get schema() {
    return {
      clientId:String,
      clientSecret:String,
      redirectUris:[String],
      grants:[String]
    }
  }
}