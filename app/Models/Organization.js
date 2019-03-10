'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Organization extends Model {
    static get incrementing () {
        return false
    }
    
    languages () {
        return this
          .belongsToMany('App/Models/Language')
          .pivotTable('organization_languages')
          .withPivot(['name'])
          .withTimestamps()
    }

    languagesSupport () {
        return this
          .belongsToMany('App/Models/Language', 'organization_id', 'language_id', 'id', 'id' )
          .pivotTable('organization_lang_supports')
    }

    users () {
        return this.hasMany('App/Models/User')
    }

    locations () {
        return this.hasMany('App/Models/Location')
    }
}

module.exports = Organization
