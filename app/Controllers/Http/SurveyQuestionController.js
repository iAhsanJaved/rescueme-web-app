'use strict'

const Organization = use('App/Models/Organization')
const SurveyQuestion = use('App/Models/SurveyQuestion')

class SurveyQuestionController {

    async index ({ view, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        
        let survey_questions;
        if(user_role == 'super_admin') {
            // Fetch all SurveyQuestions with 'en' Language
            survey_questions = await SurveyQuestion.query()
            .with('devices.languages')
            .with('languages', (builder) => {
                builder.where('language_id', '=','en')
            }).fetch()
        } else {
            // Fetch SurveyQuestions with 'en' Language 
            // (organization_id of SurveyQuestions must be equal to Authenticated User's organization_id)
            survey_questions = await SurveyQuestion.query()
            .where('organization_id', '=', auth.user.organization_id)
            .with('devices.languages')
            .with('languages', (builder) => {
                builder.where('language_id', '=','en')
            }).fetch()
        }

        // Response
        return view.render('questions.index', { 
            survey_questions: survey_questions.toJSON() 
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
        
        
        // Response
        return view.render('questions.create', { 
            organizations: organizations.toJSON() 
        });
    }

    async store({ response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Request Data
        const data = request.only([
            'question', 'device', 'rating_type', 'status', 'expire_at', 'organization_id'
        ])

        if(user_role != 'super_admin') {
            data.organization_id = auth.user.organization_id;
        }

        // Create Survey Question
        const survey_question = await SurveyQuestion.create({
            rating_type: data.rating_type,
            status: data.status,
            expire_at: data.expire_at,
            organization_id: data.organization_id
        })

        // Fetch Organization
        const organization = await Organization.findOrFail(survey_question.organization_id)
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()

        for(var i=0; i<data.question.length; i++) {
            await survey_question.languages().attach([supportLangs[i].id], (row) => {
                row.question = data.question[i]
            })
        }

        await survey_question.devices().attach(data.device)

        // Response
		session.flash({ message: 'Survey Question has been added.' });
		return response.redirect('back');
    }

    async show({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Survey Question
        const survey_question = await SurveyQuestion.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && survey_question.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Load Languages, Devices, Organization to Survey Question 
        await survey_question.loadMany(['languages', 'devices.languages', 'organization.languages'])
        
        // Response
        return view.render('questions.show', { 
            survey_question: survey_question.toJSON() 
        });
    }

    async edit({ params, view, auth, request }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Survey Question
        const survey_question = await SurveyQuestion.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && survey_question.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Load Languages, Devices, Organization to Survey Question 
        await survey_question.loadMany([
            'languages', 'devices', 
            'organization.languages', 'organization.languagesSupport',
            'organization.devices.languages',
        ])

        // Response
        return view.render('questions.edit', { 
            survey_question: survey_question.toJSON()
        });
    }

    async update({ params, response, request, session, auth }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Survey Question
        const survey_question = await SurveyQuestion.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && survey_question.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }

        // Request Data
        const data = request.only([
            'question', 'device', 'rating_type', 'status', 'expire_at'
        ])

        
        // Fetch Organization
        const organization = await Organization.findOrFail(survey_question.organization_id)
        // Fetch Supported Languages array ['en', 'ar']
        const supportLangs = (await organization.languagesSupport().fetch()).toJSON()
        
        await survey_question.languages().detach()
        for(var i=0; i<data.question.length; i++) {
            await survey_question.languages().attach([supportLangs[i].id], (row) => {
                row.question = data.question[i]
            })
        }
        
        await survey_question.devices().sync(data.device)

        // Update Survey Question  
        survey_question.rating_type = data.rating_type
        survey_question.status = data.status
        survey_question.expire_at = data.expire_at
        await survey_question.save()
        // Response
		session.flash({ message: 'Survey Question has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session, auth, request, view }) {
        // Get Role of Authenticated User
        const user_role = ((await auth.user.role().fetch()).toJSON()).slug;
        // Find Survey Question
        const survey_question = await SurveyQuestion.findOrFail(params.id)
        
        if(user_role != 'super_admin' 
            && survey_question.organization_id != auth.user.organization_id) {
            // Exception Response
            return view.render('exceptions.unauthorization', { url: request.url() });
        }
        
        // Delete Survey Question
		await survey_question.delete();
        // Response
		session.flash({ message: 'Survey Question has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = SurveyQuestionController
