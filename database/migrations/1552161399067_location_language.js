'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationLanguageSchema extends Schema {
  up () {
    this.create('location_languages', (table) => {
      table.increments()
      table.integer('location_id').unsigned().index()
      table.foreign('location_id').references('id').on('locations').onDelete('cascade')
      table.string('language_id', 3).index()
      table.foreign('language_id').references('id').on('languages').onDelete('cascade')
      table.unique(['location_id', 'language_id'])
      table.string('name', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('location_languages')
  }
}

module.exports = LocationLanguageSchema
