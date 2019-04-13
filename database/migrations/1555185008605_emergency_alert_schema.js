'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmergencyAlertSchema extends Schema {
  up () {
    this.create('emergency_alerts', (table) => {
      table.increments()
      table.uuid('node_id').references('id').inTable('nodes')
      table.integer('emergency_type_id').unsigned().references('id').inTable('emergency_types')
      table.text('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('emergency_alerts')
  }
}

module.exports = EmergencyAlertSchema
