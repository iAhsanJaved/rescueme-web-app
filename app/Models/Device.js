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

    static get incrementing () {
        return false
    }
}

module.exports = Device
