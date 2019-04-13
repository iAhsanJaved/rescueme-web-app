'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Node extends Model {
    static get incrementing () {
        return false
    }
}

module.exports = Node
