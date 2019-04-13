'use strict'

class StoreEmergencyType {
  get rules () {
    return {
      'name': 'required|max:35',
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

module.exports = StoreEmergencyType
