(function(){

  const Utils = {}

  const DATE_FORMATS = {
    default: 'MMMM Do, YYYY - hh:mma Z',
    short: 'MMMM Do, YYYY'
  }

  // Parse query string's hash parameters.
  // https://bestofnes.com/blahblah#a=1&b=2&c=3 becomes {a: 1, b: 2, c: 3}
  Utils.parseHash = function(){

    let obj = {}

    try{
      document.location.hash.slice(1).split('&').forEach(param => {
        let [key, val] = param.split('=')
        if(key && val){
          obj[key] = val
        }
      })
    }catch(e){
      window.console.error('Error parsing hash. (LOL)')
      return {}
    }

    return obj
  }

  Utils.guid = function(){

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  Utils.convertDates = function(){
    document.querySelectorAll('.date-to-convert').forEach(el => {
      let m = window.moment(el.textContent)
      let format = el.getAttribute('date-format') || 'default'
      el.textContent = m.format(DATE_FORMATS[format])

      //clean date-format content
      el.classList.remove('date-to-convert')
      el.removeAttribute('date-format')
    })
  }

  BestOfNes.Utils = Utils

})()