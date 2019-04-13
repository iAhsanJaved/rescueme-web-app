'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EmergencyAlert extends Model {

    node () {
        return this.belongsTo('App/Models/Node')
    }

    emergencyType () {
        return this.belongsTo('App/Models/EmergencyType')
    }
}


module.exports = EmergencyAlert
