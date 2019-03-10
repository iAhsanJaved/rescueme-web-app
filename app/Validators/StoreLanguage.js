'use strict'

class StoreLanguage {
  get rules () {
    return {
      'id': 'required|max:3|unique:languages',
      'name': 'required|max:35',
    }
  }

  get messages() {
    return {
      'required': 'Please provide a {{ field }}.',
      'unique': 'This {{ field }} is not available.',
      'max': 'The {{ field }} must not exceed than {{ argument.0 }} characters.',
    }
  }


  async fails (error) {
  	this.ctx.session.withErrors(error)
  		.flashAll();
  	return this.ctx.response.redirect('back');
  }
}

module.exports = StoreLanguage
