const Base = require('./base.js');
const bcrypt = require('bcrypt');
const oauth2 = require('../oauth2');
module.exports = class extends Base {
  /*
  indexAction() {
    this.success({ip:this.ip},'');
  }*/
  loginAction() {
    this.success({ip:this.ip},'');
  }
  async signupAction() {
    let param = this.post();
    let User = this.mongoose('user');
    let ObjectId = think.Mongoose.mongoose.Types.ObjectId;
    let passHash = await bcrypt.hash(param['password'],10);
    let data = {
      id:new ObjectId(),
      userName:param['username'],
      passHash:passHash
    }
    let user = new User(data);
    try{
      await user.save();
    }catch(err){
      this.fail('1001');
    }
    delete data.passHash;
    this.success(data);
  }
  async tokenAction(){
    this.success(await oauth2.token(this.ctx));
  }
};
