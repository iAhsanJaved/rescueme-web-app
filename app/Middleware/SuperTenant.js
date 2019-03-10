'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const GE = require('@adonisjs/generic-exceptions')

class SuperTenant {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request, response }, next) {
    let loggedIn = false

    try {
      await auth.check()
      loggedIn = true
    } catch (e) {}

    if(loggedIn) {
      const user_role = await auth.user.role().fetch();
      if(user_role.slug != 'super_admin' && user_role.slug != 'tenant_admin' ) {
        throw new GE.HttpException(`User cannot access the route ${request.method()} ${request.url()}`, 403, 'E_UNAUTHORIZED')              
      }
    } else {
      return response.redirect('/login')
    }

    await next()
  }
}

module.exports = SuperTenant
