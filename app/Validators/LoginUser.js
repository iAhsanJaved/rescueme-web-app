'use strict'

class LoginUser {
  get rules () {
    return {
      'username': 'required',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = LoginUser
