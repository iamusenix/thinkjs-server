const Base = require('./base.js');
const bcrypt = require('bcrypt');
const oauth2 = require('../oauth2');
const RSA = require('../oauth2/rsa');

module.exports = class extends Base {
  /*
  indexAction() {
    this.success({ip:this.ip},'');
  }*/
  async loginAction() {
    let param = this.post();
    let Account = this.mongoose(param.role);
    let ac = await Account.findOne({name:param.username}).lean();
    let password = RSA.decrypt(param.password);
    let valid = false;
    if(ac){
      valid = bcrypt.compare(password, ac.passHash);
    }
    if(valid){
        this.success(await oauth2.owToken(this.ctx, password));
    }else{
      this.ctx.status = 401;
    }
  }
  async rsaKeyAction(){
    let data = {key:RSA.publicKey()};
    this.success(data);
  }
  async signupAction() {
    let param = this.post();
    let User = this.mongoose(param.role);
    let ObjectId = think.Mongoose.mongoose.Types.ObjectId;
    // let password = RSA.decrypt(param['password']);
    let password = param['password'];
    console.log('password is ',password);
    let passHash = await bcrypt.hash(password,10);
    let data = {
      id:new ObjectId(),
      name:param['name'],
      passHash:passHash,
      email:param['email'],
      sex:param['sex'],
      birthday:param['birthday'],
      phone:param['phone']
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
