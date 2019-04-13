'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NodeSchema extends Schema {
  up () {
    this.create('nodes', (table) => {
      table.uuid('id').primary()
      table.string('key', 60).notNullable()
      table.string('name', 100).notNullable()
      table.string('address', 250).notNullable()
      table.float('latitude', 10, 6).notNullable()
      table.float('longitude', 10, 6).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('nodes')
  }
}

module.exports = NodeSchema
