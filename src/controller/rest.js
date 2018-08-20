const assert = require('assert');

module.exports = class extends think.Controller {
  static get _REST() {
    return true;
  }

  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
    assert(think.isFunction(this.model), 'this.model must be a function');
    this.modelInstance = this.mongoose(this.resource);
    console.log(this.resource);
  }
  __before() {}
  /**
   * get resource
   * @return {String} [resource name]
   */
  getResource() {
    return this.ctx.controller.split('/').pop();
  }
  getId() {
    return this.get('id');
  }
  async getAction() {
    let data;
    if (this.id) {
      data = await this.modelInstance.findOne({ _id: this.id });
      return this.success(data);
    }
    data = await this.modelInstance.find();
    return this.success(data);
  }
  /**
   * put resource
   * @return {Promise} []
   */
  async postAction() {
    const data = this.post();
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    const inserted = await this.modelInstance.create(data);
    return this.success(inserted);
  }
  /**
   * delete resource
   * @return {Promise} []
   */
  async deleteAction() {
    if (!this.id) {
      return this.fail('params error');
    }
    const data = await this.modelInstance.deleteOne({ _id: this.id });
    return this.success(data);
  }
  /**
   * update resource
   * @return {Promise} []
   */
  async putAction() {
    if (!this.id) {
      return this.fail('params error');
    }
    const data = this.post();
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    const updated = await this.modelInstance.updateOne({ _id: this.id });
    return this.success(updated);
  }
  __call() {}
};