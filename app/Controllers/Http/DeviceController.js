'use strict'
const uuidv4 = require('uuid/v4');

const Location = use('App/Models/Location')
const Organization = use('App/Models/Organization')
const Device = use('App/Models/Device')

class DeviceController {
    async index ({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        
        let devices;
        if(user_role == 'super_admin') {
            // Fetch all Devices with 'en' Language
            devices = await Device.query()
            .with('location.languages')
            .with('languages', (builder) => {
                builder.where('language_id', '=', 'en')
            }).fetch()
        } else {
            // Fetch Devices with 'en' Language 
            // (organization_id of Device must be equal to Authenticated User's organization_id)
            devices = await Device.query()
            .where('organization_id', '=', auth.user.organization_id)
            .with('location.languages')
            .with('languages', (builder) => {
                builder.where('language_id', '=', 'en')
            }).fetch()
        }
        
        // Response
        return view.render('devices.index', { 
            devices: devices.toJSON() 
        });
    }
  
    async create({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        
        let organizations;
        if(user_role == 'super_admin') {
            // Fetch all Organizations with Languages they support(translation)
            organizations = await Organization.query()
            .with('languages').with('languagesSupport')
            .with('locations.languages').fetch()

        } else {
            // Fetch Organization with Languages they support(translation)
            // (organization_id of organization must be equal to Authenticated User's organization_id) 
            organizations = await Organization.query()
            .where('id', '=', auth.user.organization_id)
            .with('languages').with('languagesSupport')
            .with('locations.languages').fetch()
        }
        
        console.log(organizations.toJSON())
        
        // Response
        return view.render('devices.create', { 
            organizations: organizations.toJSON() 
        });
    }

    async store({ response, request, session, auth }) {
        console.log('hello')
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Request Data
        const data = request.only([
            'name', 'description', 'status', 'location_id', 'organization_id'
        ])

        if(user_role != 'super_admin') {
            data.organization_id = auth.user.organization_id;
        }

        // Create Device
        const device = await Device.create({
            id: uuidv4(),
            status: data.status,
            location_id: data.location_id,
            organization_id: data.organization_id
        })

        // Fetch Organization
        const organization = await Organization.findOrFail(device.organization_id)
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()

        for(var i=0; i<data.name.length; i++) {
            await device.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i]
                row.description = data.description[i]
            })
        }

        // Response
		session.flash({ message: 'Device has been added.' });
		return response.redirect('back');
    }

    async show({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Device
        const device = await Device.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && device.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        // Load Languages to Device 
        await device.load('languages')
        
        // Fetch Organization
        const organization = await device.organization().fetch()
        await organization.load('languages')
        // Fetch Location
        const location = await device.location().fetch()
        await location.load('languages')

        // Attach Organization to Device 
        device.organization = organization.toJSON()
        // Attach Location to Device 
        device.location = location.toJSON()
        
        // Response
        return view.render('devices.show', { 
            device: device.toJSON() 
        });
    }

    async edit({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Device
        const device = await Device.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && device.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Load Languages to Device 
        await device.load('languages')
        
        // Fetch Organization
        const organization = await device.organization().fetch()
        await organization.loadMany(['languages', 'languagesSupport', 'locations.languages'])
        // Fetch Location
        const location = await device.location().fetch()
        await location.load('languages')

        // Attach Organization to Device 
        device.organization = organization.toJSON()
        // Attach Location to Device 
        device.location = location.toJSON()

        // Response
        return view.render('devices.edit', { 
            device: device.toJSON()
        });
    }

    async update({ params, response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Device
        const device = await Device.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && device.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }

        // Request Data
        const data = request.only([
            'name', 'description', 'status', 'location_id'
        ])
        
        // Fetch Organization
        const organization = await Organization.findOrFail(device.organization_id)
        // Fetch Supported Languages array ['en', 'ar']
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()
        
        
        await device.languages().detach()
        for(var i=0; i<data.name.length; i++) {
            await device.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i]
                row.description = data.description[i]
            })
        }
        
        // Update Location 
        device.status = data.status
        device.location_id = data.location_id
        await device.save()
        // Response
		session.flash({ message: 'Device has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session, auth, request, view }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Device
        const device = await Device.findOrFail(params.id);
        
        if(user_role != 'super_admin' 
            && device.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Delete Location
		await device.delete();
        // Response
		session.flash({ message: 'Device has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = DeviceController
