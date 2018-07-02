(function(){

  const Admin = {}

  Admin.initRaceEditPage = function(){

    let form = document.querySelector('form#edit-race')
    new window.Pikaday({
      field: form.querySelector('.date-input')
    })

    form.addEventListener('submit', e => {
      console.log('submitting')
      e.preventDefault()
    })
  }

  BestOfNes.Admin = Admin

})()