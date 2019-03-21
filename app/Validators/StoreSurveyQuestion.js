'use strict'

class StoreSurveyQuestion {
  get rules () {
    return {
      'question': 'required',
      'device': 'required',
      'status': 'required|number',
      'rating_type': 'required|number',
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

module.exports = StoreSurveyQuestion
