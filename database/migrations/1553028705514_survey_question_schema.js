'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveyQuestionSchema extends Schema {
  up () {
    this.create('survey_questions', (table) => {
      table.increments()
      table.boolean('rating_type').notNullable()
      table.boolean('status').notNullable()
      table.datetime('expire_at')
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.timestamps()
    })
  }

  down () {
    this.drop('survey_questions')
  }
}

module.exports = SurveyQuestionSchema
