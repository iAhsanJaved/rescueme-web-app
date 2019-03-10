'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceLanguageSchema extends Schema {
  up () {
    this.create('device_languages', (table) => {
      table.increments()
      table.uuid('device_id').index()
      table.foreign('device_id').references('id').on('devices').onDelete('cascade')
      table.string('language_id', 3).index()
      table.foreign('language_id').references('id').on('languages').onDelete('cascade')
      table.unique(['device_id', 'language_id'])
      table.string('name', 100).notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('device_languages')
  }
}

module.exports = DeviceLanguageSchema
