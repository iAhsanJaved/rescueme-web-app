'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table.increments()
      table.float('latitude', 10, 6)
      table.float('longitude', 10, 6)
      table.text('google_map_url')
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = LocationSchema
