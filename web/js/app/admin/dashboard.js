(function(){
  const Dashboard = {}
  BestOfNes.Admin.Dashboard = Dashboard

  Dashboard.init = function(races){

    let template = document.querySelector('template')
    let raceSample = template.content.querySelector('.race')

    makeRaceRows(document.querySelector('.races .upcoming'), races.upcoming)
    makeRaceRows(document.querySelector('.races .running'), races.running)
    makeRaceRows(document.querySelector('.races .finished'), races.finished)

    Dashboard.convertDates()

    function makeRaceRows(targetEl, races){

      if(!races || !races.length){
        targetEl.remove()
        return
      }

      races.forEach(race => {
        let el = raceSample.cloneNode(true)
        el.setAttribute('data-slug', race.slug || race._id)
        el.querySelector('.date').text = race.date
        el.querySelector('.name').value = race.name
        targetEl.append(el)
      })
    }
  }

  Dashboard.convertDates = function(){
    document.querySelectorAll('.race .date').forEach(el => {
      let m = window.moment(el.textContent)
      el.textContent = m.format('MMMM Do YYYY, hh:mma Z')
    })
  }

})()