'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SurveyQuestion extends Model {
    organization () {
        return this.belongsTo('App/Models/Organization')
    }

    languages () {
        return this
          .belongsToMany('App/Models/Language')
          .pivotTable('survey_question_languages')
          .withPivot(['question'])
          .withTimestamps()
    }

    devices () {
        return this
          .belongsToMany('App/Models/Device', 'survey_question_id', 'device_id', 'id', 'id' )
          .pivotTable('survey_question_devices')
          .withTimestamps()
    }
}

module.exports = SurveyQuestion
