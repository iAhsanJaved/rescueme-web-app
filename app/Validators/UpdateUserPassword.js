'use strict'

class UpdateUserPassword {
  get rules () {
    return {
      'password': 'required',
      'password_confirmation': 'required_if:password|same:password'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'password_confirmation.same': 'Please provide the same password.',
    }
  }

  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = UpdateUserPassword
