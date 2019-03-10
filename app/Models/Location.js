'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Location extends Model {
    organization () {
        return this.belongsTo('App/Models/Organization')
    }

    devices () {
        return this.hasMany('App/Models/Device')
    }

    languages () {
        return this
          .belongsToMany('App/Models/Language')
          .pivotTable('location_languages')
          .withPivot(['name'])
          .withTimestamps()
    }
}

module.exports = Location
