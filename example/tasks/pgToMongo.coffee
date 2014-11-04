module.exports = (grunt) ->
  grunt.registerTask 'pgToMongo', 'pgToMongo', ->
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    mongoose = require 'mongoose'
    path = require 'path'
    rootPath = path.normalize(__dirname + '/..')
    configPath = path.join rootPath, 'server/config/environment'
    config = require configPath
    mongoose.connect config.mongo.uri, config.mongo.options
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    done = @async()

    db.once "open", ->
      Thing = require path.join(rootPath, '/server/api/thing/thing.model')

      Thing.create {'name':'test8'}, (err) ->
        grunt.log.ok err if err

        Thing.find (err, things) ->
          grunt.log.ok err if err
          grunt.log.ok "Things: ", things
          grunt.log.ok 'pgToMongo done.'
          done()