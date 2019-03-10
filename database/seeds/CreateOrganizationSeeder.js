'use strict'

/*
|--------------------------------------------------------------------------
| CreateOrganizationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const uuidv4 = require('uuid/v4');

const Language = use('App/Models/Language')
const Organization = use('App/Models/Organization')

class CreateOrganizationSeeder {
  async run () {
    
    

  }
}

module.exports = CreateOrganizationSeeder
