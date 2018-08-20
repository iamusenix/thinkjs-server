module.exports = class extends think.Mongoose {
  get schema() {
    return {
      id:String,
      userName:String,
      passHash:String,
      email:String,
      nickName:String,
      avatar: String,
      mobileNo:String,
      birthday:Date,
      address:String
    }
  }
}