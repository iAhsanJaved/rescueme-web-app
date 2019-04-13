'use strict'

const Location = use('App/Models/Location')

class LocationController {

    async index ({ view, auth }) {
        // Fetch all Locations with 'en' Language
        const locations = await Location.query()
        
        // Response
        return view.render('locations.index', { 
            locations: locations.toJSON() 
        });
    }
  
    async create({ view, auth }) {
        // Response
        return view.render('locations.create', { 
            organizations: organizations.toJSON() 
        });
    }

    async store({ response, request, session, auth }) {
        // Request Data
        const data = request.only([
            'name', 'latitude', 'longitude', 'google_map_url', 
        ])

        
        // Create Location
        const location = await Location.create({
            latitude: data.latitude,
            longitude: data.longitude,
            google_map_url: data.google_map_url,
        })

        // Response
		session.flash({ message: 'Location has been added.' });
		return response.redirect('back');
    }

    async show({ params, view, auth, request }) {
        // Find Location
        const location = await Location.findOrFail(params.id)
        
        // Response
        return view.render('locations.show', { 
            location: location.toJSON() 
        });
    }

    async edit({ params, view, auth, request }) {
        // Find Location
        const location = await Location.findOrFail(params.id)
        
        // Response
        return view.render('locations.edit', { 
            location: location.toJSON()
        });
    }

    async update({ params, response, request, session, auth }) {
        // Find Location
        const location = await Location.findOrFail(params.id)
        
        // Request Data
        const data = request.only([
            'name', 'latitude', 'longitude', 'google_map_url'
        ])
        
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
        // Find Location
        const location = await Location.findOrFail(params.id);
        
        // Delete Location
		await location.delete();
        
        // Response
		session.flash({ message: 'Location has been deleted.' });
		return response.redirect('back');
    }
    
}

module.exports = LocationController
