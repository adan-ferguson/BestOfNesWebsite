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
    info.querySelectorAll('input[type="checkbox"]').forEach(el => {
      el.checked = race[el.getAttribute('data-prop-name')] || false
    })

    pikaday()
    submit()
    tabs()

    Race.GamesTab.init(form, race.games)
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

      info.querySelectorAll('input[type="checkbox"]').forEach(el => {
        race[el.getAttribute('data-prop-name')] = el.checked
      })

      troubleshoot(race)

      await fetch('', {
        headers: {
          race: JSON.stringify(race)
        },
        method: 'put',
        credentials: 'include'
      })

      window.location = '/admin'
    })
  }

  function troubleshoot(race){
    // ISO format date, use a placeholder date if none provided
    race.date = new Date(race.date ? race.date : '2020-01-01').toUTCString()

    // Remove whitespace from slug
    race.slug = race.slug.replace(/ /g,'-')
  }

})()