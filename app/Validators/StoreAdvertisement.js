'use strict'

class StoreAdvertisement {
  get rules () {
    return {
      'name': 'required',
      'content': 'required',
      'device': 'required',
      'client_min_age': 'number',
      'client_max_age': 'number',
      'expire_at': 'required',
      'organization_id': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'organization_id.required': 'Please select the organiation.',
      'number': 'The {{ field }} value must be a number.'
    }
  }

  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = StoreAdvertisement
