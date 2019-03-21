'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveyQuestionDeviceSchema extends Schema {
  up () {
    this.create('survey_question_devices', (table) => {
      table.increments()
      table.integer('survey_question_id').unsigned().index()
      table.foreign('survey_question_id').references('id').on('survey_questions').onDelete('cascade')
      table.uuid('device_id').index()
      table.foreign('device_id').references('id').on('devices').onDelete('cascade')
      table.unique(['survey_question_id', 'device_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('survey_question_devices')
  }
}

module.exports = SurveyQuestionDeviceSchema
