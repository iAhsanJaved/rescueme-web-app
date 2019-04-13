'use strict'

class UpdateUser {
  get rules () {
    const userId = this.ctx.params.id
    return {
      'username': `required|max:35|unique:users,username,id,${userId}`,
      'email': `required|max:254|email|unique:users,email,id,${userId}`,
      'name': 'required|max:35',
      'gender': 'required|number',
      'status': 'required|number',
      'role_id': 'required|number',
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'email': 'Please provide a valid email.',
      'role_id.required': 'Please select a user role.',
      'unique': 'This {{ field }} is not available.',
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

module.exports = UpdateUser
