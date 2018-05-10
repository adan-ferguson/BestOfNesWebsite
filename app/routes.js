function apply(app){
  app.get('/', (req, res) => res.render('index', {title: 'Hey', message: 'Route message'}))
}

module.exports = {
  apply: apply
}