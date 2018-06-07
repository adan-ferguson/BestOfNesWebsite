(function(){

  const Utils = {}

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

  BestOfNes.Utils = Utils

})()