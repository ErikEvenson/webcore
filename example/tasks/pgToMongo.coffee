module.exports = (grunt) ->
  grunt.registerTask 'pgToMongo', 'pgToMongo', ->
    mongoose = require 'mongoose'
    path = require 'path'
    rootPath = path.normalize(__dirname + '/..')

    mongo = {
      options: {
        db: {
          safe: true
        }
      },

      uri: 'mongodb://localhost/example-dev'
    }

    mongoose.connect mongo.uri, mongo.options
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    done = @async()

    db.once "open", ->
      console.log "xxx"
      Thing = require('../server/api/thing/thing.model')

      Thing.create {'name':'test2'}, (err) ->
        if err
          grunt.log.ok err

      Thing.find (err, things) ->
        if err
          grunt.log.ok err

        grunt.log.ok "Things: ", things
        done()

      grunt.log.ok 'pgToMongo done.'

    grunt.log.ok 'ZZZ'