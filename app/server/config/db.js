const secrets = require('./secrets');

module.exports = {
  url: 'mongodb://'+secrets.db.user+':'+secrets.db.pwd+'@localhost:27017/moodsic'
}
