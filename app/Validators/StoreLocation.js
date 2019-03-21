'use strict'

class StoreLocation {
  get rules () {
    return {
      'name': 'required|max:100',
      'organization_id': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'organization_id.required': 'Please select the organiation.',
    }
  }

  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = StoreLocation
