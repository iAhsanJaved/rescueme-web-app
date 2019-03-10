'use strict'

class StoreUser {
  get rules () {
    return {
      'username': 'required|max:35|unique:users',
      'email': 'required|max:254|email|unique:users',
      'password': 'required',
      'password_confirmation': 'required_if:password|same:password',
      'name': 'required|max:35',
      'gender': 'required|number',
      'status': 'required|number',
      'role_id': 'required|number',
      'organization_id': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'email': 'Please provide a valid email.',
      'role_id.required': 'Please select a user role.',
      'organization_id.required': 'Please select the organiation.',
      'unique': 'This {{ field }} is not available.',
      'password_confirmation.same': 'Please provide the same password.',
      'max': 'The {{ field }} must not exceed than {{ argument.0 }} characters.',
      'number': 'The {{ field }} value must be a number.'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
    }
  }

  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = StoreUser
