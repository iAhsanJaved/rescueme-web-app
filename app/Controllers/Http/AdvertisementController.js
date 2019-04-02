'use strict'

const Organization = use('App/Models/Organization')
const SurveyQuestion = use('App/Models/SurveyQuestion')
const Advertisement = use('App/Models/Advertisement')
const Reaction = use('App/Models/Reaction')

class AdvertisementController {
    async index ({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        
        let advertisements;
        if(user_role == 'super_admin') {
            // Fetch all Advertisement with 'en' Language
            advertisements = await Advertisement.query()
            .with('devices.languages')
            .with('reactions')
            .with('languages', (builder) => {
                builder.where('language_id', '=','en')
            }).fetch()
        } else {
            // Fetch Advertisement with 'en' Language 
            // (organization_id of Advertisement must be equal to Authenticated User's organization_id)
            advertisements = await Advertisement.query()
            .where('organization_id', '=', auth.user.organization_id)
            .with('devices.languages')
            .with('reactions')
            .with('languages', (builder) => {
                builder.where('language_id', '=','en')
            }).fetch()
        }

        // Response
        return view.render('advertisements.index', { 
            advertisements: advertisements.toJSON() 
        });
    }
  
    async create({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;

        let organizations;
        if(user_role == 'super_admin') {
            // Fetch all Organizations with Languages they support(translation)
            organizations = await Organization.query()
            .with('devices.languages')
            .with('languages').with('languagesSupport').fetch()

        } else {
            // Fetch Organization with Languages they support(translation)
            // (organization_id of organization must be equal to Authenticated User's organization_id) 
            organizations = await Organization.query()
            .where('id', '=', auth.user.organization_id)
            .with('devices.languages')
            .with('languages').with('languagesSupport').fetch()
        }
        
        // Fetch all Reactions
        const reactions = await Reaction.all()
        
        // Response
        return view.render('advertisements.create', { 
            organizations: organizations.toJSON(),
            reactions: reactions.toJSON()
        });
    }

    async store({ response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Request Data
        const data = request.only([
            'name', 'content', 'device', 'reaction', 
            'client_min_age', 'client_max_age', 'client_gender', 
            'expire_at', 'organization_id'
        ])

        if(user_role != 'super_admin') {
            data.organization_id = auth.user.organization_id;
        }

        // Create Advertisement
        const advertisement = await Advertisement.create({
            client_min_age: data.client_min_age,
            client_max_age: data.client_max_age,
            client_gender: data.client_gender,
            expire_at: (new Date(new Date(data.expire_at).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]),
            organization_id: data.organization_id
        })

        // Fetch Organization
        const organization = await Organization.findOrFail(advertisement.organization_id)
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()

        for(var i=0; i<data.name.length; i++) {
            await advertisement.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i],
                row.content = data.content[i]
            })
        }

        await advertisement.devices().attach(data.device)
        
        if(data.reaction[0] != 'all') {
            await advertisement.reactions().attach(data.reaction)
        }
        
        // Response
		session.flash({ message: 'Advertisement has been added.' });
		return response.redirect('back');
    }

    async show({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Advertisement
        const advertisement = await Advertisement.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && advertisement.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Load Languages, Devices, Organization to Advertisement
        await advertisement.loadMany([
            'languages', 'devices.languages', 'organization.languages',
            'reactions'
        ])
        
        // Response
        return view.render('advertisements.show', { 
            advertisement: advertisement.toJSON() 
        });
    }

    async edit({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Advertisement
        const advertisement = await Advertisement.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && advertisement.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Load Languages, Devices, Organization to Advertisement 
        await advertisement.loadMany([
            'languages', 'devices', 
            'organization.languages', 'organization.languagesSupport',
            'organization.devices.languages', 'reactions'
        ])

        // Fetch all Reactions
        const reactions = await Reaction.all()

        // Response
        return view.render('advertisements.edit', { 
            advertisement: advertisement.toJSON(),
            reactions: reactions.toJSON()
        });
    }

    async update({ params, response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Advertisement
        const advertisement = await Advertisement.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && advertisement.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }

        // Request Data
        const data = request.only([
            'name', 'content', 'device', 'reaction', 
            'client_min_age', 'client_max_age', 'client_gender', 'expire_at'
        ])

        
        // Fetch Organization
        const organization = await Organization.findOrFail(advertisement.organization_id)
        // Fetch Supported Languages array ['en', 'ar']
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()
        
        await advertisement.languages().detach()
        for(var i=0; i<data.name.length; i++) {
            await advertisement.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i],
                row.content = data.content[i]
            })
        }
        
        await advertisement.devices().sync(data.device)

        if(data.reaction[0] != 'all') {
            await advertisement.reactions().attach(data.reaction)
        }

        // Update Advertisement  
        advertisement.client_min_age = data.client_min_age
        advertisement.client_max_age = data.client_max_age
        advertisement.client_gender = data.client_gender
        advertisement.expire_at = (new Date(new Date(data.expire_at).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]),
        await advertisement.save()
        // Response
		session.flash({ message: 'Advertisement has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session, auth, request, view }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Advertisement
        const advertisement = await Advertisement.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && advertisement.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Delete Advertisement
		await advertisement.delete();
        // Response
		session.flash({ message: 'Advertisement has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = AdvertisementController
