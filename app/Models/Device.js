'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Device extends Model {
    location () {
        return this.belongsTo('App/Models/Location')
    }

    languages () {
        return this
          .belongsToMany('App/Models/Language')
          .pivotTable('device_languages')
          .withPivot(['name', 'description'])
          .withTimestamps()
    }

    organization () {
        return this.belongsTo('App/Models/Organization')
    }
    
    survey_questions () {
        return this
          .belongsToMany('App/Models/SurveyQuestion', 'device_id', 'survey_question_id', 'id', 'id' )
          .pivotTable('survey_question_devices')
          .withTimestamps()
    }

    advertisements () {
        return this
          .belongsToMany('App/Models/Advertisement', 'device_id', 'advertisement_id', 'id', 'id' )
          .pivotTable('advertisement_devices')
          .withTimestamps()
    }

    static get incrementing () {
        return false
    }
}

module.exports = Device
