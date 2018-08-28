const Base = require('./base.js');

module.exports = class extends Base {

  async existAction() {
    let param = this.get();
    let Account = this.mongoose(param.role);
    let ac = await Account.findOne({name:param.name});
    this.success(!think.isEmpty(ac)); 
  }
  
};
