'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReactionSchema extends Schema {
  up () {
    this.create('reactions', (table) => {
      table.increments()
      table.string('title', 35)
      table.timestamps()
    })
  }

  down () {
    this.drop('reactions')
  }
}

module.exports = ReactionSchema
