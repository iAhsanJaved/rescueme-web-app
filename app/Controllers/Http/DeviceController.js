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
            .with('languages')
            .with('location', (builder) => {
                builder.where('organization_id', '=', auth.user.organization_id)
            }).fetch()
        }

        console.log(devices.toJSON())
        
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
            .with('languages').with('languagesSupport').fetch()

        } else {
            // Fetch Organization with Languages they support(translation)
            // (organization_id of organization must be equal to Authenticated User's organization_id) 
            organizations = await Organization.query()
            .where('organization_id', '=', auth.user.organization_id)
            .with('languages').with('languagesSupport').fetch()
        }
        
        console.log(organizations.toJSON())
        
        // Response
        return view.render('locations.create', { 
            organizations: organizations.toJSON() 
        });
    }

    async store({ response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Request Data
        const data = request.only([
            'name', 'latitude', 'longitude', 'google_map_url', 'organization_id'
        ])

        if(user_role != 'super_admin') {
            data.organization_id = auth.user.organization_id;
        }

        // Create Location
        const location = await Location.create({
            latitude: data.latitude,
            longitude: data.longitude,
            google_map_url: data.google_map_url,
            organization_id: data.organization_id
        })

        // Fetch Organization
        const organization = await Organization.findOrFail(location.organization_id)
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()

        for(var i=0; i<data.name.length; i++) {
            await location.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i]
            })
        }

        // Response
		session.flash({ message: 'Location has been added.' });
		return response.redirect('back');
    }

    async show({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Location
        const location = await Location.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && location.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        // Load Languages to Location 
        await location.load('languages')
        
        // Fetch Organization
        const organization = await location.organization().fetch()
        await organization.load('languages')
        
        // Attach Organization to Location 
        location.organization = organization.toJSON()
        // Response
        return view.render('locations.show', { 
            location: location.toJSON() 
        });
    }

    async edit({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Location
        const location = await Location.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && location.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Load Languages to Location 
        await location.load('languages')

        // Fetch Organization
        const organization = await Organization.findOrFail(location.organization_id)
        await organization.loadMany(['languages', 'languagesSupport'])
        // Attach Organization to Location 
        location.organization = organization.toJSON()

        // Response
        return view.render('locations.edit', { 
            location: location.toJSON()
        });
    }

    async update({ params, response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Location
        const location = await Location.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && location.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }

        // Request Data
        const data = request.only([
            'name', 'latitude', 'longitude', 'google_map_url'
        ])
        
        // Fetch Organization
        const organization = await Organization.findOrFail(location.organization_id)
        // Fetch Supported Languages array ['en', 'ar']
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()
        
        console.log(location);
        console.log(supportLangs)
        await location.languages().detach()
        for(var i=0; i<data.name.length; i++) {
            await location.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i]
            })
        }
        
        // Update Location 
        location.latitude = data.latitude
        location.longitude = data.longitude
        location.google_map_url = data.google_map_url
        await location.save()
        // Response
		session.flash({ message: 'Location has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session, auth, request, view }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Location
        const location = await Location.findOrFail(params.id);
        
        if(user_role != 'super_admin' 
            && location.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Delete Location
		await location.delete();
        // Response
		session.flash({ message: 'Location has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = DeviceController
