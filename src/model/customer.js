module.exports = class extends think.Mongoose {
  get schema() {
    return {
      id:String,
      name:String,
      passHash:String,
      email:String,
      nickName:String,
      avatar: String,
      phone:String,
      sex:Number,
      birthday:Date,
      star:[String],
      address:String
    }
  }
}