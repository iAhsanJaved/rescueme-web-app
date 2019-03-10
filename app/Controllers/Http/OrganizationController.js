'use strict'
const uuidv4 = require('uuid/v4');

const Organization = use('App/Models/Organization')
const Language = use('App/Models/Language')

class OrganizationController {
    async index ({ view }) {
        const organizations = await Organization.query()
        .with('languages', (builder) => {
            builder.where('language_id', '=', 'en')
        }).fetch()
        
        return view.render('organizations.index', { organizations: organizations.toJSON() });
    }
      
    async create({ view }) {
        const languages = await Language.all();
        
        return view.render('organizations.create', { languages: languages.toJSON() });
    }
    
    async store({ response, request, session }) {
        const data = request.only([
            'name', 'languages_support'
        ])

        const organization = new Organization()
        organization.primaryKeyValue = uuidv4()
        await organization.save()
        
        organization.languagesSupport().attach(['en'])
        if (data.languages_support !== undefined 
            && data.languages_support.length != 0) {        
            organization.languagesSupport()
            .attach(data.languages_support)
        }

        await organization.languages().attach(['en'], (row) => {
            row.name = data.name
        })
        
        session.flash({ message: 'Organization has been added.' });
		return response.redirect('back');
    }

    async show({ params, view }) {
        const organization = await Organization.findOrFail(params.id)
        await organization.loadMany(['languages', 'languagesSupport'])
        
        return view.render('organizations.show', { organization: organization.toJSON() });
    }

    async edit({ params, view }) {
        const organization = await Organization.findOrFail(params.id)
        await organization.loadMany(['languages', 'languagesSupport'])
        
        const languages = await Language.all();

        return view.render('organizations.edit', { 
            organization: organization.toJSON(),
            languages: languages.toJSON()
        });
    }

    async update({ params, response, request, session }) {
        const organization = await Organization.findOrFail(params.id)
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()
        const data = request.only([
            'name'
        ])

        await organization.languages().detach()
        for(var i=0; i<data.name.length; i++) {
            await organization.languages().attach([supportLangs[i].id], (row) => {
                row.name = data.name[i]
            })
        }
		session.flash({ message: 'Organization has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session }) {
		const organization = await Organization.findOrFail(params.id)
		await organization.delete();

		session.flash({ message: 'Organization has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = OrganizationController
