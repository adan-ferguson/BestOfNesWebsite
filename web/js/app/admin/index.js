(function(){

  const Admin = {}

  let form
  let race

  Admin.initRaceEditPage = function(_race) {

    race = _race
    form = document.querySelector('form#edit-race')

    let info = form.querySelector('.info')
    info.querySelectorAll('input[type="text"]').forEach(el => {
      el.value = race[el.getAttribute('data-prop-name')] || ''
    })
    info.querySelectorAll('input[type="checkbox"]').forEach(el => {
      el.checked = race[el.getAttribute('data-prop-name')] || false
    })

    pikaday()
    submit()
    tabs()

    Admin.GamesTab.init(form, race.games)
  }

  function tabs(){

    let tabButtons = form.querySelectorAll('.nav-link')
    let sections = form.querySelectorAll('section')
    let currentIndex = 0

    tabButtons.forEach(btn => {
      btn.addEventListener('click', e => {

        let newIndex = getElementIndex(e.target.parentElement)

        if(newIndex === currentIndex){
          return
        }

        tabButtons[currentIndex].classList.remove('active')
        sections[currentIndex].classList.remove('active')
        tabButtons[newIndex].classList.add('active')
        sections[newIndex].classList.add('active')

        currentIndex = newIndex
      })
    })
  }

  function getElementIndex(element){

    let i = -1
    while(element){
      i++
      element = element.previousElementSibling
    }
    return i
  }


  function pikaday(){
    new window.Pikaday({
      field: form.querySelector('.date-input'),
      showTime: true
    })
  }

  function submit(){
    form.addEventListener('submit', async e => {
      e.preventDefault()

      let info = form.querySelector('.info')
      info.querySelectorAll('input[type="text"]').forEach(el => {
        race[el.getAttribute('data-prop-name')] = el.value
      })
      info.querySelectorAll('input[type="checkbox"]').forEach(el => {
        race[el.getAttribute('data-prop-name')] = el.checked
      })

      let response = await fetch('', {
        headers: {
          race: JSON.stringify(race)
        },
        method: 'put',
        credentials: 'include'
      })

      let result = await response.json()

      if(result.redirectTo){
        window.location = result.redirectTo
      }

    })
  }

  BestOfNes.Admin = Admin

})()