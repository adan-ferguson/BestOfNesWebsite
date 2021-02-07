(function(){

  BestOfNes.Admin.Race.Modal = class {

    constructor(el){
      this.el = el
      this.initialHTML=  this.el.innerHTML

      let close = el.querySelector('button.close')
      let save = el.querySelector('button.save')

      close.addEventListener('click', () => {
        this.close({
          saved: false
        })
      })

      save.addEventListener('click', () => {

        let newData = {}

        this.el.querySelector('.modal-body').childNodes.forEach(el => {
          el.classList.contains('multi-row') ? multiRow() : formGroup()

          function multiRow(){
            let dataArray = []
            newData[el.getAttribute('data-group')] = dataArray
            el.querySelectorAll('.form-row').forEach(rowEl => {
              let obj = {}
              let valid = true
              rowEl.querySelectorAll('.form-control').forEach(el => {
                let key = el.getAttribute('data-prop')
                if(!el.value){
                  valid = false
                }
                obj[key] = el.value
              })
              if(valid){
                dataArray.push(obj)
              }
            })
          }

          function formGroup(){
            el = el.querySelector('.form-control')
            let v = el.value
            if(el.getAttribute('data-format') === 'time'){
              if(isNaN(window.moment(v, 'hh:mm:ss.SS').valueOf())){
                v = ''
              }
            }
            if(!v){
              return
            }
            newData[el.getAttribute('data-prop')] = v
          }
        })

        this.close({
          saved: true,
          data: Object.assign({}, this.data, newData)
        })
      })
    }

    close(result){
      this.el.style.display = 'none'
      this.el.innerHTML = this.initialHTML

      if(this.promiseResolution){
        this.promiseResolution(result)
        this.promiseResolution = null
      }
    }

    show(data){
      return new Promise(yay => {
        this.promiseResolution = yay

        this.data = data

        this.el.querySelector('.modal-body').childNodes.forEach(el => {
          el.classList.contains('multi-row') ? multiRow() : formGroup()

          function multiRow(){

            let rows = el.querySelector('.rows')
            let groupName = el.getAttribute('data-group')
            let rowData = data[groupName]
            let sampleRowHTML = rows.innerHTML
            rows.innerHTML = ''

            el.querySelector('.add-row').addEventListener('click', () => {
              let newRow = document.createElement('div')
              newRow.innerHTML = sampleRowHTML
              rows.appendChild(newRow.children[0])
            })

            if(!Array.isArray(rowData)){
              return
            }

            rowData.forEach(row => {
              let newRow = document.createElement('div')
              newRow.innerHTML = sampleRowHTML
              for(let key in row){
                newRow.querySelector(`.form-control[data-prop="${key}"]`).value = row[key]
              }
              rows.appendChild(newRow.children[0])
            })
          }

          function formGroup(){
            el = el.querySelector('.form-control')
            el.value = data[el.getAttribute('data-prop')] || ''
          }
        })

        this.el.style.display = 'block'
      })
    }
  }

})()