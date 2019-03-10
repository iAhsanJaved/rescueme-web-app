'use strict'

const Language = use('App/Models/Language')

class LanguageController {
    async index ({ view }) {
        const languages = await Language.all()
        return view.render('languages.index', { languages: languages.toJSON() });
    }
      
    async create({ view }) {
        return view.render('languages.create');
    }
    
    async store({ response, request, session }) {
        const data = request.only([
            'id', 'name'
        ])
        await Language.create(data)

		session.flash({ message: 'Language has been added.' });
		return response.redirect('back');
    }

    async show({ params, view }) {
        const language = await Language.findOrFail(params.id)
        return view.render('languages.show', { language: language.toJSON() });
    }

    async edit({ params, view }) {
        const language = await Language.findOrFail(params.id)
        return view.render('languages.edit', { language: language.toJSON() });
    }

    async update({ params, response, request, session }) {
        const data = request.only([
            'id', 'name'
        ])
        const language = await Language.findOrFail(params.id)
        language.merge(data)
        await language.save()

		session.flash({ message: 'Language has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session }) {
		const language = await Language.findOrFail(params.id)
		await language.delete();

		session.flash({ message: 'Language has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = LanguageController
