'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizationLanguageSchema extends Schema {
  up () {
    this.create('organization_languages', (table) => {
      table.increments()
      table.uuid('organization_id').index()
      table.foreign('organization_id').references('id').on('organizations').onDelete('cascade')
      table.string('language_id', 3).index()
      table.foreign('language_id').references('id').on('languages').onDelete('cascade')
      table.unique(['organization_id', 'language_id'])
      table.string('name', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('organization_languages')
  }
}

module.exports = OrganizationLanguageSchema
