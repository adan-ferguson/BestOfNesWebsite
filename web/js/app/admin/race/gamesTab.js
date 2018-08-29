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

    section.querySelector('.add-game').addEventListener('click', async () => {
      let g = new Game()
      let result = await g.edit()
      if(result.saved){
        games.push(g)
        g.addTo(list)
      }
    })
  }

  GamesTab.getData = function(){
    let data = games.map(p => p.data)
    return data
  }

  function addGame(data){
    let g = new Game(data)
    games.push(g)
    g.addTo(list)
  }

  class Game extends Race.Row {

    constructor(data = {}){
      let template = document.querySelector('template').content.querySelector('.game')
      super(data, template)
    }

    addTo(list){
      super.addTo(list)
      this.el.querySelector('.game-number').textContent = games.length
    }

    async edit(){
      return await super.edit(new Race.Modal(modal))
    }

    delete(){
      super.delete()
      let i = games.indexOf(this)

      if(i > -1){
        games.splice(i, 1)
      }
    }

    up(){
      let index = games.indexOf(this)

      if(index === 0){
        return
      }

      let prev = this.el.previousSibling
      this.el.parentNode.insertBefore(this.el, prev)

      games.splice(index, 1)
      games.splice(index - 1, 0, this)

      prev.querySelector('.game-number').textContent = index + 1
      this.el.querySelector('.game-number').textContent = index
    }

    down(){
      let index = games.indexOf(this)

      if(index === games.length - 1) {
        return
      }

      games[index + 1].up()
    }
  }

})()