'use strict'

const EmergencyType = use('App/Models/EmergencyType')

class EmergencyTypeController {
    async index ({ view }) {
        // Fetch all EmergencyTypes
        const emergencyTypes = await EmergencyType.all()
        
        // Response
        return view.render('emergencyTypes.index', { 
            emergencyTypes: emergencyTypes.toJSON() 
        });
    }
  
    async create({ view }) {
        // Response
        return view.render('emergencyTypes.create');
    }

    async store({ response, request, session }) {
        // Request Data
        const data = request.only([
            'name'
        ])


        // Create EmergencyType
        await EmergencyType.create(data)

        // Response
		session.flash({ message: 'Emergency Type has been added.' });
		return response.redirect('back');
    }

    async show({ params, view }) {
        // Find EmergencyType
        const emergencyType = await EmergencyType.findOrFail(params.id)
        
        // Response
        return view.render('emergencyTypes.show', { 
            emergencyType: emergencyType.toJSON() 
        });
    }

    async edit({ params, view }) {
        // Find EmergencyType
        const emergencyType = await EmergencyType.findOrFail(params.id)
        
        // Response
        return view.render('emergencyTypes.edit', { 
            emergencyType: emergencyType.toJSON()
        });
    }

    async update({ params, response, request, session }) {
        // Find EmergencyType
        const emergencyType = await EmergencyType.findOrFail(params.id)
        
        // Request Data
        const data = request.only([
            'name'
        ])
        
        // Update EmergencyType 
        emergencyType.name = data.name
        await emergencyType.save()
        
        // Response
		session.flash({ message: 'Emergency Type has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session }) {
        // Find EmergencyType
        const emergencyType = await EmergencyType.findOrFail(params.id)
        
        // Delete Node
		await emergencyType.delete();
        
        // Response
		session.flash({ message: 'Emergency Type has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = EmergencyTypeController
