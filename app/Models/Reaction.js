'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reaction extends Model {
    advertisements () {
        return this
          .belongsToMany('App/Models/Advertisement', 'reaction_id', 'advertisement_id', 'id', 'id' )
          .pivotTable('advertisement_reactions')
          .withTimestamps()
    }
}

module.exports = Reaction
