'use strict'

const Node = use('App/Models/Node')
const User = use('App/Models/User')
const EmergencyAlert = use('App/Models/EmergencyAlert')

class DashboardController {
    async index ({ view }) {
        const statistics = {
            users: await User.getCount(),
            nodes: await Node.getCount(),
            emergencyAlerts: await EmergencyAlert.getCount(),
        }
        
        return view.render('dashboard.index',{
            statistics: statistics
        })
    }
}

module.exports = DashboardController
