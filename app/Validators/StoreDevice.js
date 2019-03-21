'use strict'

class StoreDevice {
  get rules () {
    return {
      'name': 'required|max:100',
      'status': 'required|number',
      'location_id': 'required|number',
      'organization_id': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'location_id.required': 'Please select a location.',
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

module.exports = StoreDevice
