'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Advertisement extends Model {
    organization () {
        return this.belongsTo('App/Models/Organization')
    }

    languages () {
        return this
          .belongsToMany('App/Models/Language')
          .pivotTable('advertisement_languages')
          .withPivot(['name', 'content'])
          .withTimestamps()
    }

    devices () {
        return this
          .belongsToMany('App/Models/Device', 'advertisement_id', 'device_id', 'id', 'id' )
          .pivotTable('advertisement_devices')
          .withTimestamps()
    }

    reactions () {
        return this
          .belongsToMany('App/Models/Reaction', 'advertisement_id', 'reaction_id', 'id', 'id' )
          .pivotTable('advertisement_reactions')
          .withTimestamps()
    }
}

module.exports = Advertisement
