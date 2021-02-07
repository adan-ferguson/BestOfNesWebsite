(function(){

  const Race = {}
  BestOfNes.Admin.Race = Race

  let form
  let race

  Race.init = function(_race) {

    race = _race
    form = document.querySelector('form#edit-race')

    let info = form.querySelector('.info')

    info.querySelectorAll('input[type="text"]').forEach(el => {
      el.value = race[el.getAttribute('data-prop-name')] || ''
    })

    info.querySelectorAll('textarea').forEach(el => {
      el.value = race[el.getAttribute('data-prop-name')] || ''
    })

    info.querySelectorAll('input[type="checkbox"]').forEach(el => {
      el.checked = race[el.getAttribute('data-prop-name')] || false
    })

    pikaday()
    submit()
    tabs()

    Race.GamesTab.init(form.querySelector('section.games'), race.games)
    Race.ParticipantsTab.init(form.querySelector('section.participants'), race.participants)
  }

  function tabs(){
    let tabButtons = form.querySelectorAll('.nav-link')
    let sections = form.querySelectorAll('section')
    BestOfNes.Utils.tabize(tabButtons, sections)
  }

  function pikaday(){
    let el = form.querySelector('.date-input')
    new window.Pikaday({
      field: el,
      showTime: true,
      format: 'YYYY-MM-DDTHH:mm:ss.sssZ',
      toString: date => {
        el.setAttribute('true-value', date)
        return window.moment(date).format('MMMM Do, YYYY h:mma [GMT]Z')
      }
    })
  }

  function submit(){
    form.addEventListener('submit', async e => {
      e.preventDefault()

      let info = form.querySelector('.info')

      info.querySelectorAll('input[type="text"]').forEach(el => {
        race[el.getAttribute('data-prop-name')] = el.getAttribute('true-value') || el.value
      })

      info.querySelectorAll('textarea').forEach(el => {
        race[el.getAttribute('data-prop-name')] = el.getAttribute('true-value') || el.value
      })

      info.querySelectorAll('input[type="checkbox"]').forEach(el => {
        race[el.getAttribute('data-prop-name')] = el.checked
      })

      race.games = Race.GamesTab.getData()
      race.participants = Race.ParticipantsTab.getData()

      troubleshoot(race)

      let result = await fetch('', {
        body: JSON.stringify(race),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'put',
        credentials: 'include'
      })

      let json = await result.json()

      window.location = '/admin/races/' + json.id

    })
  }

  function troubleshoot(race){
    // ISO format date, use a placeholder date if none provided
    race.date = new Date(race.date ? race.date : '2030-01-01').toUTCString()

    // Remove whitespace from slug
    race.slug = race.slug.replace(/ /g,'-')
  }
})()