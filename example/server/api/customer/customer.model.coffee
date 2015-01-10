mongoose = require 'mongoose'
Schema = mongoose.Schema

CustomerSchema = new Schema
  name: String

module.exports = mongoose.model 'Customer', CustomerSchema