'use strict'

class StoreNode {
  get rules () {
    return {
      'name': 'required|max:100',
      'address': 'required|max:250',
      'latitude': 'required',
      'longitude': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
    }
  }

  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = StoreNode
