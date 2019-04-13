'use strict'
const uuidv4 = require('uuid/v4');

const User = use('App/Models/User')
const Role = use('App/Models/Role')

class UserController {
    
    async index ({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        
        let users;
        if(user_role == 'super_admin') {
            // Fetch all Users with their Role
            users = await User.query().with('role').fetch()
        } else {
            // Fetch Users with their Role 
            // (organization_id of users must be equal to Authenticated User's organization_id)
            users = await User.query()
            .where('organization_id', '=', auth.user.organization_id)
            .with('role').fetch()
        }

        // Response
        return view.render('users.index', { 
            users: users.toJSON() 
        });
    }
  
    async create({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        
        let roles;
        let organizations;
        if(user_role == 'super_admin') {
            // Fetch all Roles
            roles = await Role.all()
            // Fetch all Organizations with 'en' Language(translation)
            organizations = await Organization.query()
            .with('languages', (builder) => {
                builder.where('language_id', '=', 'en')
            }).fetch()
        } else {
            // Fetch Roles (except 'super_admin' role)
            roles = await Role.query()
            .where('slug', '!=', 'super_admin')
            .fetch()
            
            // Fetch Organization with 'en' Language(translation)
            // (organization_id of users must be equal to Authenticated User's organization_id) 
            organizations = await Organization.query()
            .where('id', '=', auth.user.organization_id)
            .with('languages', (builder) => {
                builder.where('language_id', '=', 'en')
            }).fetch()
        }
        
        // Response
        return view.render('users.create', { 
            roles: roles.toJSON(),
            organizations: organizations.toJSON() 
        });
    }

    async store({ response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Request Data
        const data = request.only([
            'username', 'email', 'password', 'name', 
            'gender', 'status', 'role_id', 'organization_id'
        ])

        if(user_role != 'super_admin') {
            data.organization_id = auth.user.organization_id;
            // If a tenant_admin selected super_admin role, 
            // role_id become 2 (tenant_admin)   
            if(data.role_id == 1){
                data.role_id = 2;
            }
        }

        // Generate UUID
        data.id = uuidv4(data.username)
        // Create User
        await User.create(data)
        // Response
		session.flash({ message: 'User has been added.' });
		return response.redirect('back');
    }

    async show({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find User
        const user = await User.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && user.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        // Load Role to User 
        await user.load('role')
        
        // Fetch Organization
        const organization = await user.organization().fetch()
        await organization.load('languages')
        
        // Attach Organization to User 
        user.organization = organization.toJSON()
        // Response
        return view.render('users.show', { 
            user: user.toJSON() 
        });
    }

    async edit({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find User
        const user = await User.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && user.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        let roles;
        let organizations;
        if(user_role == 'super_admin') {
            // Fetch all Roles
            roles = await Role.all()
            // Fetch all Organizations with 'en' Language(translation)
            organizations = await Organization.query()
            .with('languages', (builder) => {
                builder.where('language_id', '=', 'en')
            }).fetch()
        
        } else {
            // Fetch Roles (except 'super_admin' role)
            roles = await Role.query()
            .where('slug', '!=', 'super_admin')
            .fetch()
            
            // Fetch Organization with 'en' Language(translation)
            // (organization_id of users must be equal to Authenticated User's organization_id) 
            organizations = await Organization.query()
            .where('id', '=', auth.user.organization_id)
            .with('languages', (builder) => {
                builder.where('language_id', '=', 'en')
            }).fetch()
        }

        // Response
        return view.render('users.edit', { 
            user: user.toJSON(),
            roles: roles.toJSON(),
            organizations: organizations.toJSON()
        });
    }

    async update({ params, response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find User
        const user = await User.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && user.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }

        // Request Data
        const data = request.only([
            'username', 'email', 'name', 'gender', 
            'status', 'role_id', 'organization_id'
        ])
        
        if(user_role != 'super_admin') {
            data.organization_id = auth.user.organization_id;
            // If a tenant_admin selected super_admin role, 
            // role_id become 2 (tenant_admin)   
            if(data.role_id == 1){
                data.role_id = 2;
            }
        }
        
        // Update User 
        user.merge(data)
        await user.save()
        // Response
		session.flash({ message: 'User has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session, auth, request, view }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find User
        const user = await User.findOrFail(params.id);
        
        if(user_role != 'super_admin' 
            && user.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Delete User
		await user.delete();
        // Response
		session.flash({ message: 'User has been deleted.' });
		return response.redirect('back');
    }
    
    async changePassword({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find User
        const user = await User.findOrFail(params.id);
        
        if(user_role != 'super_admin' 
            && user.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }

        // Response
        return view.render('users.changePassword', { 
            user: user.toJSON(),
        });
    }

    async updatePassword({ params, response, request, session, auth, view }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find User
        const user = await User.findOrFail(params.id);
        
        if(user_role != 'super_admin' 
            && user.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
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
