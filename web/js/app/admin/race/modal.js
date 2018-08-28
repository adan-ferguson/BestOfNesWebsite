(function(){

  const Modal = class {
    constructor(el){
      this.el = el
      this.fields = el.querySelectorAll('.form-control')

      let close = el.querySelector('button.close')
      let save = el.querySelector('button.save')

      close.addEventListener('click', () => {
        this.close({
          saved: false
        })
      })

      save.addEventListener('click', () => {

        let newData = {}

        this.fields.forEach(el => {

          let v = el.value
          if(el.getAttribute('data-format') === 'time'){
            if(isNaN(window.moment(v, 'hh:mm:ss.SS').valueOf())){
              v = ''
            }
          }

          newData[el.getAttribute('data-prop')] = v
        })

        this.close({
          saved: true,
          data: Object.assign({}, this.data, newData)
        })
      })
    }

    close(result){
      this.el.style.display = 'none'

      if(this.promiseResolution){
        this.promiseResolution(result)
        this.promiseResolution = null
      }
    }

    show(data){
      return new Promise(yay => {
        this.promiseResolution = yay

        this.data = data

        this.fields.forEach(el => {
          el.value = data[el.getAttribute('data-prop')] || ''
        })

        this.el.style.display = 'block'
      })
    }
  }

  BestOfNes.Admin.Race.Modal = Modal
})()