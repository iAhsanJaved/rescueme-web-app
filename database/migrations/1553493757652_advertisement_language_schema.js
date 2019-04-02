'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertisementLanguageSchema extends Schema {
  up () {
    this.create('advertisement_languages', (table) => {
      table.increments()
      table.integer('advertisement_id').unsigned().index()
      table.foreign('advertisement_id').references('id').on('advertisements').onDelete('cascade')
      table.string('language_id', 3).index()
      table.foreign('language_id').references('id').on('languages').onDelete('cascade')
      table.unique(['advertisement_id', 'language_id'])
      table.string('name', 200).notNullable()
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('advertisement_languages')
  }
}

module.exports = AdvertisementLanguageSchema
