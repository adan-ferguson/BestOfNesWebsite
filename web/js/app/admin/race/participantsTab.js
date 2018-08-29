(function(){

  const Race = BestOfNes.Admin.Race

  const ParticipantsTab = {}
  Race.ParticipantsTab = ParticipantsTab

  let modal
  let participants = []
  let list

  ParticipantsTab.init = function(section, _participants = []){

    list = section.querySelector('.participants-list')
    modal = document.querySelector('.participant-edit-modal')

    _participants.forEach(p => addParticipant(p))

    section.querySelector('.add-participant').addEventListener('click', () => {

      let p = new Participant()

      p.edit()
    })
  }

  ParticipantsTab.getData = function(){
    let format = 'hh:mm:ss.SS'
    let data = participants.map(p => p.data)
      .sort((p1, p2) => {
        let m1 = window.moment(p1.time, format).valueOf()
        let m2 = window.moment(p2.time, format).valueOf()

        if(isNaN(m1)){
          m1 = Number.MAX_VALUE
        }else if(isNaN(m2)){
          m2 = Number.MAX_VALUE
        }

        return m1 - m2
      })

    data.forEach((p, i) => {
      if(p.time){
        p.place = BestOfNes.Utils.toOrdinal(1 + i)
      }
    })

    return data
  }

  function addParticipant(p){
    new Participant(p).add()
  }

  class Participant {

    constructor(data = {}){

      if(!data.id){
        data.id = BestOfNes.Utils.guid()
      }

      this.data = data
    }

    add(){
      participants.push(this)

      let template = document.querySelector('template')
      this.el = template.content.querySelector('.participant').cloneNode(true)

      this.update()
      this.el.querySelector('.edit').addEventListener('click', () => this.edit())
      this.el.querySelector('.confirm-delete').addEventListener('click', () => this.delete())
      new window.Dropdown(this.el.querySelector('.delete-dropdown'))

      list.appendChild(this.el)
      this.added = true
    }

    update(){
      let fields = this.el.querySelectorAll('.field')
      for(let i = 0; i < fields.length; i++){
        let f = fields[i]
        let name = f.getAttribute('data-field-name')
        let link = f.getAttribute('data-field-link')
        let nameData = this.data[name]
        let linkData = this.data[link]

        if(!nameData && !linkData){
          f.classList.add('hidden')
          continue
        }

        f.classList.remove('hidden')

        if(name){
          f.textContent = nameData
        }

        if(link){
          if(!linkData){
            f.removeAttribute('href')
          }else{
            f.href = linkData
          }
        }
      }
    }

    async edit(){
      let result = await new Race.Modal(modal).show(this.data)

      if(!result.saved) {
        return
      }

      this.data = result.data

      if(!this.added){
        this.add()
      }else{
        this.update()
      }
    }

    delete(){
      this.el.parentElement.removeChild(this.el)

    }
  }

})()