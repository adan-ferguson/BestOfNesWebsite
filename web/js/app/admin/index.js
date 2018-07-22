(function(){

  const Admin = {}

  let form

  Admin.initRaceEditPage = function(race) {

    form = document.querySelector('form#edit-race')

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
      field: form.querySelector('.date-input')
    })
  }

  function submit(){
    form.addEventListener('submit', e => {
      console.log('submitting')
      e.preventDefault()
    })
  }

  BestOfNes.Admin = Admin

})()