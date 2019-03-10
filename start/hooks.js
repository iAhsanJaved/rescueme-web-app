const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('View')

  View.global('currentYear', function () {
    return new Date().getFullYear();
  })

  View.global('isArrayObjectContains', function (arrObject, id) {
    return arrObject.some(e => e.id == id)
  })

  View.global('getMatchedTranslation', function (arrObject, id) {
    return arrObject.filter(e => {
      return e.id == id
   })[0]
  })

  View.global('convertToDate', function (datetime) {
    return datetime.split(' ')[0];
  })

  View.global('printSupportedLanguagesID', function (arrObject) {
    let temp = '';
    arrObject.map(e => {
      temp += e.id + ' '
    })
    return temp;
  })

  View.global('printSupportedLanguages', function (arrObject) {
    let temp = '';
    arrObject.map(e => {
      temp += e.name + '|'
    })
    return temp;
  })

})