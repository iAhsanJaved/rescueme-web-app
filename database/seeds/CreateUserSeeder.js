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
const Node = use('App/Models/Node')
const EmergencyType = use('App/Models/EmergencyType')
const EmergencyAlert = use('App/Models/EmergencyAlert')

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


    const n1 = await Node.create({
      id: uuidv4(),
      key: 'abcdef',
      name: 'AUMC CS Dep.',
      address: 'Khan Center Multan Cantt.',
      latitude: -0.62616,
      longitude: -55.6666,
    })
    
    const fall = await EmergencyType.create({
      id: 1,
      name: 'Human Fall'
    })

    const fire = await EmergencyType.create({
      id: 2,
      name: 'Fire'
    })

    const car_accident = await EmergencyType.create({
      id: 3,
      name: 'Car Accident'
    })

    
  }
}

module.exports = CreateUserSeeder
