(function(){
  const Dashboard = {}
  BestOfNes.Admin.Dashboard = Dashboard

  Dashboard.convertDates = function(){
    document.querySelectorAll('.race .date').forEach(el => {
      let m = window.moment(el.textContent)
      el.textContent = m.format('MMMM Do YYYY, hh:mma Z')
    })
  }

})()