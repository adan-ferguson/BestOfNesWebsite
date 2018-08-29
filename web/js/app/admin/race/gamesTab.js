(function(){

  const Race = BestOfNes.Admin.Race

  const GamesTab = {}
  BestOfNes.Admin.Race.GamesTab = GamesTab

  let modal
  let games = []
  let list

  GamesTab.init = function(section, _games = []){

    list = section.querySelector('.games-list')
    modal = document.querySelector('.game-edit-modal')

    _games.forEach(p => addGame(p))

    section.querySelector('.add-game').addEventListener('click', () => {
      let g = new Game()
      g.edit()
    })
  }

  GamesTab.getData = function(){
    let data = games.map(p => p.data)
    return data
  }

  function addGame(g){
    new Game(g).add()
  }

  class Game {

    constructor(data = {}){

      if(!data.id){
        data.id = BestOfNes.Utils.guid()
      }

      this.data = data
    }


  }


  function setupListeners(){

    list.addEventListener('click', e => {

      let target = e.target

      if(target.nodeName !== 'BUTTON'){
        return
      }

      let targetGameEl = target

      while(targetGameEl && !targetGameEl.classList.contains('game')){
        targetGameEl = targetGameEl.parentNode
      }

      if(!targetGameEl){
        return
      }

      let targetGame = getGame(targetGameEl)

      if(target.classList.contains('move-up')){
        move(targetGame, -1)
      }else if(target.classList.contains('move-down')){
        move(targetGame, 1)
      }else if(target.classList.contains('edit')){
        edit(targetGame)
      }else if(target.classList.contains('confirm-delete')){
        deleteGame(targetGame)
      }
    })

    addButton.addEventListener('click', () => {

      let game = {
        id: BestOfNes.Utils.guid()
      }

      games.push(game)
      updateGames()
    })

    modal.onSave = updateGames
  }

  function makeGameEl(game){
    let gameTemplate = document.querySelector('template')
    let gameEl = gameTemplate.content.querySelector('.game').cloneNode(true)
    gameEl.setAttribute('data-game-id', game.id)
    gameEl.querySelector('.game-number').textContent = game.index + 1
    gameEl.querySelector('.name').value = game.name || ''
    list.appendChild(gameEl)

    new window.Dropdown(gameEl.querySelector('.delete-dropdown'))
  }

  function move(game, direction){

    // Don't do anything if at end
    if(direction < 0 && game.index === 0){
      return
    }
    if(direction > 0 && game.index === games.length - 1){
      return
    }

    games.splice(game.index, 1)
    games.splice(game.index + direction, 0, game)
    updateGames()
  }

  function edit(game){
    modal.show(game)
  }

  function deleteGame(game){
    games.splice(game.index, 1)
    updateGames()
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

      save.addEventListener('click', () => {
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
      this.el.style.display = 'none'
    }

    save(){
      this.fields.forEach(el => {
        this.game[el.getAttribute('data-prop')] = el.value
      })

      if(this.onSave){
        this.onSave()
      }
    }
  }
})()