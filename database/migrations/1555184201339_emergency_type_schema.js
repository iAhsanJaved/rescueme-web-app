'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmergencyTypeSchema extends Schema {
  up () {
    this.create('emergency_types', (table) => {
      table.increments()
      table.string('name', 35)
      table.timestamps()
    })
  }

  down () {
    this.drop('emergency_types')
  }
}

module.exports = EmergencyTypeSchema
