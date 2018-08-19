(function(){

  const GamesTab = {}
  BestOfNes.Admin.Race.GamesTab = GamesTab

  let form
  let modal
  let games
  let list

  GamesTab.init = function(_form, _games){

    form = _form
    games = _games

    list = form.querySelector('.games-list')
    modal = new Modal(document.querySelector('.game-edit-modal'))

    updateGames()
    setupListeners()
  }

  function getGame(gameEl){
    return games.find(g => {
      return g.id === gameEl.getAttribute('data-game-id')
    })
  }

  function updateGames(){
    list.innerHTML = ''
    games.forEach((game, i) => {
      game.index = i
      makeGameEl(game)
    })
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

    form.querySelector('button.add-game').addEventListener('click', () => {

      let game = {
        id: BestOfNes.Utils.guid(),
        isNew: true
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