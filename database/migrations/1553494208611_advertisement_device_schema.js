'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertisementDeviceSchema extends Schema {
  up () {
    this.create('advertisement_devices', (table) => {
      table.increments()
      table.integer('advertisement_id').unsigned().index()
      table.foreign('advertisement_id').references('id').on('advertisements').onDelete('cascade')
      table.uuid('device_id').index()
      table.foreign('device_id').references('id').on('devices').onDelete('cascade')
      table.unique(['advertisement_id', 'device_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('advertisement_devices')
  }
}

module.exports = AdvertisementDeviceSchema
