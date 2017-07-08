const db = require('./secrets').db;

module.exports = {
  url: "mongodb://"+db.user+":"+db.pwd+"@localhost:27017/moodsic"
}
