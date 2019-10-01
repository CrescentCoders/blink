const mongoose = require('../lib/mongoose')
const cachegoose = require('cachegoose')

const schema = new mongoose.Schema({
  github: {
    type: String,
    hidden: true,
    unique: true
  },

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
})

schema.statics.cacheKey = id => `cache:user:${id}`
schema.post('save', doc => {
  cachegoose.clearCache(doc.schema.statics.cacheKey(doc.id))
})

module.exports = mongoose.model('User', schema)
