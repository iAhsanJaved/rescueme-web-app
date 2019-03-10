'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizationSchema extends Schema {
  up () {
    this.create('organizations', (table) => {
      table.uuid('id').primary()
      table.timestamps()
    })
  }

  down () {
    this.drop('organizations')
  }
}

module.exports = OrganizationSchema
