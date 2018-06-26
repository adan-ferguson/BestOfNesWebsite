(function(){

  const Admin = {}

  Admin.handleSaveRace = function(){

    let form = document.querySelector('form#edit-race')

    form.addEventListener('submit', e => {

      e.preventDefault()

    })

  }

  BestOfNes.Admin = Admin

})()