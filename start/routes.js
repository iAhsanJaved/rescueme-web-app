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

    
    Route.resource('nodes', 'NodeController')
    .validator(new Map([
        [['nodes.store'], ['StoreNode']],
        [['nodes.update'], ['UpdateNode']]
    ]))

    

    Route.get('emergencyAlerts', 'EmergencyAlertController.index').as('emergencyAlerts.index')
    Route.get('emergencyAlerts/:id', 'EmergencyAlertController.show').as('emergencyAlerts.show')
    Route.delete('emergencyAlerts/:id', 'EmergencyAlertController.destroy').as('emergencyAlerts.destroy')


}).middleware(['admin_operator'])


Route.group(() => {
    
    Route.resource('users', 'UserController')
    .validator(new Map([
        [['users.store'], ['StoreUser']],
        [['users.update'], ['UpdateUser']]
    ]))
    Route.get('users/:id/changePassword', 'UserController.changePassword').as('users.changePassword')
    Route.put('users/:id/updatePassword', 'UserController.updatePassword').validator('UpdateUserPassword').as('users.updatePassword')

    
    
    Route.resource('emergencyTypes', 'EmergencyTypeController')
    .validator(new Map([
        [['emergencyTypes.store'], ['StoreEmergencyType']],
        [['emergencyTypes.update'], ['UpdateEmergencyType']]
    ]))

}).middleware(['admin'])

Route.group(() => {
    // http://127.0.0.1:3333/api/nodes/verify
    Route.get('nodes/verify', 'NodeController.verify')
    Route.post('emergencyAlerts/store', 'EmergencyAlertController.store')
    
}).prefix('api/v1')

