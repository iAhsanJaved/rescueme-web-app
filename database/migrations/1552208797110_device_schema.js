'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
  up () {
    this.create('devices', (table) => {
      table.uuid('id').primary()
      table.boolean('status').notNullable()
      table.integer('location_id').unsigned().references('id').inTable('locations')
      table.timestamps()
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DeviceSchema
