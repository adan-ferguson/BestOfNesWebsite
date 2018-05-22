const path = require('path')
const dir = process.env.INIT_CWD || process.cwd()

module.exports = {
  STATIC: path.join(dir, 'static'),
  SOURCES: {
    JS: path.join(dir, 'web/js'),
    STYLES: path.join(dir, 'web/styles'),
    VIEWS: path.join(dir, 'web/views')
  },
  COMPILED: {
    JS: path.join(dir, 'static/compiled/js'),
    STYLES: path.join(dir, 'static/compiled/css'),
    VIEWS: path.join(dir, 'compiled/views'),
  }
}