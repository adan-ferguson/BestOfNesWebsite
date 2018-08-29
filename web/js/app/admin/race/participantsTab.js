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

    section.querySelector('.add-participant').addEventListener('click', async () => {
      let p = new Participant()
      let result = await p.edit()
      if(result.saved){
        participants.push(p)
        p.addTo(list)
      }
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

  function addParticipant(data){
    let p = new Participant(data)
    participants.push(p)
    p.addTo(list)
  }

  class Participant extends BestOfNes.Admin.Race.Row {

    constructor(data = {}){
      let template = document.querySelector('template').content.querySelector('.participant')
      super(data, template)
    }

    async edit(){
      return await super.edit(new Race.Modal(modal))
    }

    delete(){
      super.delete()
      let i = participants.indexOf(this)

      if(i > -1){
        participants.splice(i, 1)
      }
    }
  }

})()