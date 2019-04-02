'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
  
Route.on('/').render('welcome').as('welcome')

Route.group(() => {

    Route.get('/login', 'AuthController.index').as('login.index')
    Route.post('/login', 'AuthController.login').validator('LoginUser').as('login');
   
}).middleware(['guest'])


Route.group(() => {

    Route.get('logout', 'AuthController.logout').as('logout')
    Route.get('dashboard', 'DashboardController.index').as('dashboard.index')
    Route.get('profile', 'ProfileController.index').as('profile.index')

}).middleware(['auth'])


Route.group(() => {

    Route.get('users', 'UserController.index').as('users.index')
    Route.get('users/create', 'UserController.create').as('users.create')
    Route.post('users', 'UserController.store').validator('StoreUser').as('users.store')
    Route.get('users/:id', 'UserController.show').as('users.show')
    Route.delete('users/:id', 'UserController.destroy').as('users.destroy')
    Route.put('users/:id', 'UserController.update').validator('UpdateUser').as('users.update')
    Route.patch('users/:id', 'UserController.update')
    Route.get('users/:id/edit', 'UserController.edit').as('users.edit')
    Route.get('users/:id/changePassword', 'UserController.changePassword').as('users.changePassword')
    Route.put('users/:id/updatePassword', 'UserController.updatePassword').validator('UpdateUserPassword').as('users.updatePassword')

    Route.resource('locations', 'LocationController')
    .validator(new Map([
        [['locations.store'], ['StoreLocation']],
        [['locations.update'], ['UpdateLocation']]
    ]))

    Route.resource('devices', 'DeviceController')
    .validator(new Map([
        [['devices.store'], ['StoreDevice']],
        [['devices.update'], ['UpdateDevice']]
    ]))

    Route.resource('questions', 'SurveyQuestionController')
    .validator(new Map([
        [['questions.store'], ['StoreSurveyQuestion']],
        [['questions.update'], ['UpdateSurveyQuestion']]
    ]))

    Route.resource('advertisements', 'AdvertisementController')
    .validator(new Map([
        [['advertisements.store'], ['StoreAdvertisement']],
        [['advertisements.update'], ['UpdateAdvertisement']]
    ]))

}).middleware(['super_tenant'])


Route.group(() => {
    
    Route.resource('languages', 'LanguageController')
    .validator(new Map([
        [['languages.store'], ['StoreLanguage']],
        [['languages.update'], ['UpdateLanguage']]
    ]))

    Route.resource('organizations', 'OrganizationController')
    .validator(new Map([
        [['organizations.store'], ['StoreOrganization']],
        [['organizations.update'], ['UpdateOrganization']]
    ]))

}).middleware(['superadmin'])

