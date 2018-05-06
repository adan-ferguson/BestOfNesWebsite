const path = require('path')
const dir = process.env.INIT_CWD

module.exports = {
  SOURCES: {
    JS: path.join(dir, 'web/js'),
    STYLES: path.join(dir, 'web/styles'),
    VIEWS: path.join(dir, 'web/views')
  },
  COMPILED: {
    JS: path.join(dir, 'public/compiled/js'),
    STYLES: path.join(dir, 'public/compiled/css'),
    VIEWS: path.join(dir, 'compiled/views'),
  }
}