'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertisementSchema extends Schema {
  up () {
    this.create('advertisements', (table) => {
      table.increments()
      table.boolean('client_gender')
      table.integer('client_min_age')
      table.integer('client_max_age')
      table.datetime('expire_at').notNullable()
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.timestamps()
    })
  }

  down () {
    this.drop('advertisements')
  }
}

module.exports = AdvertisementSchema
