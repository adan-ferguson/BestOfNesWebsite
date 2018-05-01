const path = require('path')
const dir = process.env.INIT_CWD

module.exports = {
  ASSETS: path.join(dir, 'web'),
  VIEWS: path.join(dir, 'web/views'),
  COMPILED_ASSETS: path.join(dir, 'public/compiled'),
  COMPILED_VIEWS: path.join(dir, 'compiled/views')
}