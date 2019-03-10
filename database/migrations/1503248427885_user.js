'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.uuid('id').primary()
      table.string('username', 35).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name', 35).notNullable()
      table.boolean('gender').notNullable()
      table.boolean('status').notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.uuid('organization_id').references('id').inTable('organizations')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
