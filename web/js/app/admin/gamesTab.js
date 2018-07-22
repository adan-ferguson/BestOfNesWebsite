(function(){

  const GamesTab = {}

  let form
  let modal
  let games
  let list

  GamesTab.init = function(_form, _games){

    form = _form
    games = _games

    list = form.querySelector('.games-list')
    modal = new Modal(document.querySelector('.game-edit-modal'))

    createGames()
    setupListeners()
  }

  function createGames(){
    games.forEach(game => {
      newGame(game)
    })
  }

  function setupListeners(){

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

    form.querySelector('button.add-game').addEventListener('click', () => {

      let game = {
        id: BestOfNes.Utils.guid(),
        isNew: true
      }

      games.push(game)
      newGame(game)
    })
  }

  function newGame(game){
    let gameTemplate = document.querySelector('template.game')
    let gameEl = gameTemplate.clone(true)
    gameEl.setAttribute('data-game-id', game.id)
    list.appendChild(gameEl)
    updateGameNumbers()
  }

  function updateGameNumbers(){


    gameEl.querySelector('.game-number').textContent = index
  }

  function move(game, amount){

  }

  function edit(game){
    modal.show(game)
  }

  function deleteGame(game){

  }

  class Modal {
    constructor(el){
      this.el = el
      this.fields = el.querySelectorAll('.form-control')

      let close = el.querySelector('button.close')
      let save = el.querySelector('button.save')

      close.addEventListener('click', () => {
        this.hide()
      })

      save.addEventListener('save', () => {
        this.save()
        this.hide()
      })
    }

    show(game){
      this.game = game

      this.fields.forEach(el => {
        el.value = game[el.getAttribute('data-prop')] || ''
      })

      this.el.style.display = 'block'
    }

    hide(){
      modal.style.display = 'hidden'
    }

    save(){

    }
  }
  BestOfNes.Admin.GamesTab = GamesTab
})()