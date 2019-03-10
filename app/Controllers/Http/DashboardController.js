'use strict'

class DashboardController {
    async index ({ view }) {
        return view.render('dashboard.index')
    }
}

module.exports = DashboardController
