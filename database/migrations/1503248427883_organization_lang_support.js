'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizationLangSupportSchema extends Schema {
  up () {
    this.create('organization_lang_supports', (table) => {
      table.increments()
      table.uuid('organization_id').index()
      table.foreign('organization_id').references('id').on('organizations').onDelete('cascade')
      table.string('language_id', 3).index()
      table.foreign('language_id').references('id').on('languages').onDelete('cascade')
      table.unique(['organization_id', 'language_id'])
    })
  }

  down () {
    this.drop('organization_lang_supports')
  }
}

module.exports = OrganizationLangSupportSchema
