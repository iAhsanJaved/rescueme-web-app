'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertisementReactionSchema extends Schema {
  up () {
    this.create('advertisement_reactions', (table) => {
      table.increments()
      table.integer('advertisement_id').unsigned().index()
      table.foreign('advertisement_id').references('id').on('advertisements').onDelete('cascade')
      table.integer('reaction_id').unsigned().index()
      table.foreign('reaction_id').references('id').on('reactions').onDelete('cascade')
      table.unique(['advertisement_id', 'reaction_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('advertisement_reactions')
  }
}

module.exports = AdvertisementReactionSchema
