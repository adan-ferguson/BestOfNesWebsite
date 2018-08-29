(function(){
  BestOfNes.Admin.Race.Row = class {
    constructor(data, template){

      if(!data.id){
        data.id = BestOfNes.Utils.guid()
      }

      this.data = data
      this.template = template
    }

    addTo(list){
      this.el = this.template.cloneNode(true)

      this.el.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', e => {
          let onclick = e.target.getAttribute('data-onclick')
          if(onclick && this[onclick]){
            this[onclick]()
          }
        })
      })

      let dd = this.el.querySelector('.delete-dropdown')

      if(dd){
        new window.Dropdown(dd)
      }

      this.added = true
      this.update()
      list.appendChild(this.el)
    }

    update(){
      if(!this.el){
        return
      }

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

    async edit(modal){

      let result = await modal.show(this.data)

      if(!result.saved) {
        return
      }

      this.data = result.data
      this.update()
      return result
    }

    delete(){
      this.el.parentElement.removeChild(this.el)
    }
  }
})()