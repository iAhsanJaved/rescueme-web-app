const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(( ) => {
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

  View.global('convertToDateTime', function (datetime) {
    return new Date(datetime).toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  })

  View.global('convertToTimeStamp', function (datetime) {
    return (new Date(new Date(datetime).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0])
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

  View.global('printObjectID', function (arrObject) {
    let temp = '';
    arrObject.map(e => {
      temp += e.id + ' '
    })
    return temp;
  })

  View.global('printObjectName', function (arrObject, separator) {
    console.log(arrObject)
    let temp = '';
    arrObject.map(e => {
      e.languages.map(j => {
        if(j.id == 'en'){
          temp += j.pivot.name + separator
        }
      })
    })
    return temp;
  })

  
  View.global('activeRoute', function(url, routeName) {
    var arr = url.split('/')
    return arr[1] == routeName ? 'active' : ''
  })
  
  View.global('count', function (array) {
    return array instanceof Array ? array.length : 0
  })

})