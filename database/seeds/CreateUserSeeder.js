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
const Language = use('App/Models/Language')
const Organization = use('App/Models/Organization')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Location = use('App/Models/Location')
const Device = use('App/Models/Device')
const SurveyQuestion = use('App/Models/SurveyQuestion')
const Reaction = use('App/Models/Reaction')
const Advertisement = use('App/Models/Advertisement')

class CreateUserSeeder {
  async run () {
   
    const en = await Language.create({
      id: 'en',
      name: 'English',
    });
    
    const ar = await Language.create({
      id: 'ar',
      name: 'Arabic',
    });
    const ur = await Language.create({
      id: 'ur',
      name: 'Urdu',
    });

    const organization = new Organization()
    organization.primaryKeyValue = uuidv4()
    await organization.save()

    await organization.languagesSupport().attach(['en', 'ar'])
    await organization.languages().attach(['en'], (row) => {
        row.name = "Face Survey Inc."
    })
    await organization.languages().attach(['ar'], (row) => {
      row.name = "وجه"
    })

    const organization1 = new Organization()
    organization1.primaryKeyValue = uuidv4()
    await organization1.save()

    await organization1.languagesSupport().attach(['en', 'ar'])
    await organization1.languages().attach(['en'], (row) => {
        row.name = "STC"
    })
    await organization1.languages().attach(['ar'], (row) => {
      row.name = "شركة الاتصالات السعودية"
    })

    const superAdmin = await Role.create({
      id: 1,
      slug: 'super_admin',
      name: 'Super Admin',
      description: 'Super Admin....'
    });

    const tenantAdmin = await Role.create({
      id: 2,
      slug: 'tenant_admin',
      name: 'Tenant Admin',
      description: 'Tenant Admin....'
    });

    const admin = await Role.create({
      id: 3,
      slug: 'admin',
      name: 'Admin',
      description: 'Admin....'
    });

    const superUser = await User.create({
      id: uuidv4(),
      username: 'iahsanjaved',
      email: 'i@test.com',
      password: 'helloworld!',
      name: 'Ahsan Javed',
      status: 1,
      gender: 1,
      role_id: superAdmin.id,
      organization_id: organization.id
    });


    const tenantUser = await User.create({
      id: uuidv4(),
      username: 'fawad',
      email: 'f@test.com',
      password: 'helloworld!',
      name: 'Fawad Kareem',
      status: 1,
      gender: 1,
      role_id: tenantAdmin.id,
      organization_id: organization.id
    });



    const adminUser = await User.create({
      id: uuidv4(),
      username: 'junaid',
      email: 'j@test.com',
      password: 'helloworld!',
      name: 'Junaid Raja',
      status: 1,    
      gender: 0,  
      role_id: admin.id,
      organization_id: organization.id
    });

    const locJeddah = await Location.create({
      latitude: -0.62616,
      longitude: -55.6666,
      google_map_url: 'http://maps.google.com',
      organization_id: organization.id
    })
    await locJeddah.languages().attach(['en'], (row) => {
        row.name = "Jeddah"
    })
    await locJeddah.languages().attach(['ar'], (row) => {
      row.name = "جدّة"
    })

    const rhdLoc = await Location.create({
      latitude: -0.62616,
      longitude: -55.6666,
      google_map_url: 'http://maps.google.com',
      organization_id: organization1.id
    })
    await rhdLoc.languages().attach(['en'], (row) => {
        row.name = "Multan"
    })

    const device = await Device.create({
      id: uuidv4(),
      status: 1,
      location_id: locJeddah.id,
      organization_id: organization.id
    })
  
    await device.languages().attach(['en'], (row) => {
      row.name = "Central Device",
      row.description = "Desc....."
    })

    await device.languages().attach(['ar'], (row) => {
      row.name = "وسط",
      row.description = "وصف"
    })


    const device1 = await Device.create({
      id: uuidv4(),
      status: 1,
      location_id: rhdLoc.id,
      organization_id: organization1.id
    })
    
    await device1.languages().attach(['en'], (row) => {
      row.name = "Basement Device",
      row.description = "Desc....."
    })

    const q1 = await SurveyQuestion.create({
      status: 1,
      rating_type: 1,
      expire_at: '2019-03-20 06:31:07',
      organization_id: organization1.id
    })
  
    await q1.languages().attach(['en'], (row) => {
      row.question = "Like or Dislike?"
    })

    await q1.languages().attach(['ar'], (row) => {
      row.question = "مثل أو كره"
    })

    await q1.devices().attach([device1.id])

    const reactions = await Reaction.createMany([
      { title: 'Good' },
      { title: 'Awesome' },
      { title: 'Bad' },
      { title: 'Worst' },
    ])

    const ads = await Advertisement.create({
      client_gender: 1,
      client_min_age: 20,
      client_max_age: 30,
      expire_at: '2019-03-20 06:31:07',
      organization_id: organization1.id,
    })

    await ads.languages().attach(['en'], (row) => {
      row.name = "STC ads",
      row.content = "content"
    })

    await ads.languages().attach(['ar'], (row) => {
      row.name = "مثل أو كره",
      row.content = "content"
    })

    await ads.devices().attach([device1.id])

    await ads.reactions().attach([reactions[0].id, reactions[1].id])

  }
}

module.exports = CreateUserSeeder
