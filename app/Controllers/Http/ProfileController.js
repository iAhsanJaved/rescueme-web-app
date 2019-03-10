'use strict'

const User = use('App/Models/User')
const Role = use('App/Models/Role')

class ProfileController {
    async index ({ view, auth }) {
        const user = await auth.user;
        user.role = await user.role().fetch();
        return view.render('profile.index', { user: user.toJSON() });
    }
}

module.exports = ProfileController
