'use strict'

const User = use('App/Models/User')

class AuthController {
    
    async index ({ view }) {
        return view.render('auth.login')
    }

    async create ({ view }) {
        return view.render('auth.register')
    }
    
    async store({ request, response, auth }) {
		const user = await User.create(request.only(['username', 'password', 'email']));
		await auth.login(user);
		return response.redirect('/');
	}

	async login({ request, response, auth, session }) {
		const { username, password } = request.all();

		try {
			await auth.attempt(username, password)
			if(auth.user.status == 1) {
				auth.user.load('role')
				console.log(auth.user.role)
				return response.redirect('/dashboard');
			} else {
				auth.logout()
				session.flash({ loginError: 'Your account is disabled.' });
				return response.redirect('back');	
			}
			
		} catch (error) {
			session.flash({ loginError: 'Your credentials are incorrect.' });
			return response.redirect('back');
		}

	}

	async logout({ response, auth }) {
		await auth.logout();
		return response.redirect('/');
	}
}

module.exports = AuthController
