'use strict'

const EmergencyAlert = use('App/Models/EmergencyAlert')

class EmergencyAlertController {

    async index ({ view }) {
        // Fetch all EmergencyAlerts
        const emergencyAlerts = await EmergencyAlert
            .query()
            .with('node')
            .with('emergencyType')
            .orderBy('created_at', 'desc')
            .fetch()
        
        // Response
        return view.render('emergencyAlerts.index', { 
            emergencyAlerts: emergencyAlerts.toJSON() 
        });
    }

    async show({ params, view }) {
        // Find EmergencyAlert
        const emergencyAlert = await EmergencyAlert.findOrFail(params.id)
        
        // Load relationships
        await emergencyAlert.loadMany([
            'node', 'emergencyType'
        ])

        // Response
        return view.render('emergencyAlerts.show', { 
            emergencyAlert: emergencyAlert.toJSON() 
        });
    }

    async destroy({ params, response, session }) {
        // Find EmergencyAlert
        const emergencyAlert = await EmergencyAlert.findOrFail(params.id)
        
        // Delete EmergencyAlert
		await emergencyAlert.delete();
        
        // Response
		session.flash({ message: 'Emergency Alert has been deleted.' });
		return response.redirect('back');
    }

}

module.exports = EmergencyAlertController
