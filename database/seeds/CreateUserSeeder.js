'use strict'

/*
|--------------------------------------------------------------------------
| CreateUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const uuidv4 = require('uuid/v4');
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Location = use('App/Models/Location')

class CreateUserSeeder {
  async run () {
   
    const admin = await Role.create({
      id: 1,
      slug: 'admin',
      name: 'Admin',
      description: 'Admin....'
    });

    const operator = await Role.create({
      id: 2,
      slug: 'operator',
      name: 'Operator',
      description: 'Operator'
    });

   
    const adminUser = await User.create({
      id: uuidv4(),
      username: 'iahsanjaved',
      email: 'i@test.com',
      password: 'helloworld!',
      name: 'Ahsan Javed',
      status: 1,
      gender: 1,
      role_id: admin.id,
    });


    const operatorUser = await User.create({
      id: uuidv4(),
      username: 'fawad',
      email: 'f@test.com',
      password: 'helloworld!',
      name: 'Fawad Kareem',
      status: 1,
      gender: 1,
      role_id: operator.id,
    });


    const locJeddah = await Location.create({
      latitude: -0.62616,
      longitude: -55.6666,
      google_map_url: 'http://maps.google.com',
    })
    
    const rhdLoc = await Location.create({
      latitude: -0.62616,
      longitude: -55.6666,
      google_map_url: 'http://maps.google.com',
    })
    
  
    
  }
}

module.exports = CreateUserSeeder
