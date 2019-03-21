'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveyQuestionLanguageSchema extends Schema {
  up () {
    this.create('survey_question_languages', (table) => {
      table.increments()
      table.integer('survey_question_id').unsigned().index()
      table.foreign('survey_question_id').references('id').on('survey_questions').onDelete('cascade')
      table.string('language_id', 3).index()
      table.foreign('language_id').references('id').on('languages').onDelete('cascade')
      table.unique(['survey_question_id', 'language_id'])
      table.text('question').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('survey_question_languages')
  }
}

module.exports = SurveyQuestionLanguageSchema
