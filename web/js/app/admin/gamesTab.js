(function(){

  const GamesTab = {}

  let form
  let modal

  GamesTab.init = function(_form){

    form = _form

    let list = form.querySelector('.games-list')
    let sample = form.querySelector('.input-group.game') // first one is the sample
    let gameCount = form.querySelectorAll('.input-group.game').length
    sample.remove()

    setupModal()

    form.querySelector('button.add-game').addEventListener('click', () => {
      let newGame = sample.cloneNode(true)
      newGame.querySelector('.game-number').textContent = gameCount++
      list.appendChild(newGame)
    })

    list.addEventListener('click', e => {

      let target = e.target

      if(target.nodeName !== 'BUTTON'){
        return
      }

      let targetGame = target.parentElement.parentElement

      if(target.classList.contains('move-up')){
        move(targetGame, -1)
      }else if(target.classList.contains('move-down')){
        move(targetGame, 1)
      }else if(target.classList.contains('edit')){
        edit(targetGame)
      }else if(target.classList.contains('delete')){
        deleteGame(targetGame)
      }
    })
  }

  function setupModal(){
    modal = document.querySelector('.game-edit-modal')

    // close button
    // other button
    // ????
  }

  function move(game, amount){

  }

  function edit(game){
    modal.style.display = 'block'
  }

  function deleteGame(game){

  }

  BestOfNes.Admin.GamesTab = GamesTab
})()