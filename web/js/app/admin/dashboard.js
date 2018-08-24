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
        let slug = race.slug || race._id

        el.querySelector('.date').textContent = race.date
        el.querySelector('.name').textContent = race.name
        el.querySelector('.edit').href = '/admin/races/' + slug
        el.querySelector('.view').href = '/races/' + slug
        el.querySelector('.confirm-delete').addEventListener('click', async () => {
          targetEl.removeChild(el)
          await fetch('/admin/races/' + slug, {
            method: 'delete',
            credentials: 'include'
          })
        })

        new window.Dropdown(el.querySelector('.delete-dropdown'))

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