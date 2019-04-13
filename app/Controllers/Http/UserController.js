'use strict'
const uuidv4 = require('uuid/v4');

const User = use('App/Models/User')
const Role = use('App/Models/Role')

class UserController {
    
    async index ({ view }) {
        // Fetch all Users with their Role
        const users = await User.query().with('role').fetch()
        
        // Response
        return view.render('users.index', { 
            users: users.toJSON() 
        });
    }
  
    async create({ view }) {
        // Fetch all Roles
        const roles = await Role.all()
            
        // Response
        return view.render('users.create', { 
            roles: roles.toJSON(), 
        });
    }

    async store({ response, request, session }) {
        // Request Data
        const data = request.only([
            'username', 'email', 'password', 'name', 
            'gender', 'status', 'role_id'
        ])
        // Generate UUID
        data.id = uuidv4(data.username)
        
        // Create User
        await User.create(data)

        // Response
		session.flash({ message: 'User has been added.' });
		return response.redirect('back');
    }

    async show({ params, view }) {
        // Find User
        const user = await User.findOrFail(params.id)
        
        // Load Role to User 
        await user.load('role')
        
        // Response
        return view.render('users.show', { 
            user: user.toJSON() 
        });
    }

    async edit({ params, view }) {
        // Find User
        const user = await User.findOrFail(params.id)
        // Fetch all Roles
        const roles = await Role.all()
        
        // Response
        return view.render('users.edit', { 
            user: user.toJSON(),
            roles: roles.toJSON(),
        });
    }

    async update({ params, response, request, session }) {
        // Find User
        const user = await User.findOrFail(params.id)
        
        // Request Data
        const data = request.only([
            'username', 'email', 'name', 'gender', 
            'status', 'role_id'
        ])
        
        // Update User 
        user.merge(data)
        await user.save()
        
        // Response
		session.flash({ message: 'User has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session }) {
        // Find User
        const user = await User.findOrFail(params.id);
        
        // Delete User
		await user.delete();
        
        // Response
		session.flash({ message: 'User has been deleted.' });
		return response.redirect('back');
    }
    
    async changePassword({ params, view }) {
        // Find User
        const user = await User.findOrFail(params.id);

        // Response
        return view.render('users.changePassword', { 
            user: user.toJSON(),
        });
    }

    async updatePassword({ params, response, request, session, auth, view }) {
        // Find User
        const user = await User.findOrFail(params.id);
        
        // Request Data
        const data = request.only([
            'password'
        ])
        
        // Update User's password
        user.merge(data)
        await user.save()

        // Response
		session.flash({ message: 'Password has been changed successfully.' });
		return response.redirect('back');
    }
}

module.exports = UserController
