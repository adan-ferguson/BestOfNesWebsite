(function(){

  const Utils = {}

  const DATE_FORMATS = {
    default: 'MMMM Do, YYYY h:mma [GMT]Z',
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

  Utils.tabize = function(links, sections, initial = ''){

    let currentIndex = -1
    let initialIndex = 0
    if(initial){
      links.forEach((link, i) => {
        if(link.id === initial){
          initialIndex = i
          return false
        }
      })
    }
    set(initialIndex)

    links.forEach(link => {
      link.addEventListener('click', e => {

        let newIndex = getElementIndex(e.target.parentElement)

        if(newIndex === currentIndex){
          return
        }

        set(newIndex)
      })
    })


    function set(i){

      if(currentIndex === -1){
        links.forEach(l => l.classList.remove('active'))
        sections.forEach(s => s.classList.add('hidden'))
      }else{
        links[currentIndex].classList.remove('active')
        sections[currentIndex].classList.add('hidden')
      }

      links[i].classList.add('active')
      sections[i].classList.remove('hidden')

      currentIndex = i
    }

    function getElementIndex(element){

      let i = -1
      while(element){
        i++
        element = element.previousElementSibling
      }
      return i
    }
  }

  // https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
  Utils.toOrdinal = function(i){
    var j = i % 10,
      k = i % 100
    if (j == 1 && k != 11) {
      return i + 'st'
    }
    if (j == 2 && k != 12) {
      return i + 'nd'
    }
    if (j == 3 && k != 13) {
      return i + 'rd'
    }
    return i + 'th'
  }

  BestOfNes.Utils = Utils

})()