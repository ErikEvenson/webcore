module.exports = (grunt) ->
  grunt.registerTask 'mongodump',
    'Dumps the mongo database of an instance to a path.',
    (instance, path) ->
      development = require '../../server/config/environment/development'
      mongodbUri  = require 'mongodb-uri'
      uuid        = require('uuid')
      utils       = require '../utils/utils.coffee'

      valid = true
      message = []
      instances = ['development', 'staging', 'production']

      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      if valid
        done = @async()
        uriObject = null

        if instance == 'development'
          uri = development.mongo.uri
          uriObject = mongodbUri.parse uri

          utils.dumpMongoDb uriObject, "temp/#{uuid.v4()}.dump", (error) ->
            grunt fatal error if error?
            done()
        else
          grunt.config.requires "heroku.options.#{instance}"
          grunt.config.requires 'heroku.options.mongoUriKey'
          appName = grunt.config.get "heroku.options.#{instance}"
          mongoUriKey = grunt.config.get 'heroku.options.mongoUriKey'

          utils.getMongoUriObject appName, mongoUriKey, (error, uriObject) ->
            if error?
              grunt.fatal error
            else
              utils.dumpMongoDb uriObject, "temp/#{uuid.v4()}.dump", (error) ->
                grunt fatal error if error?
                done()
      else
        message.join '  '
        grunt.fatal message
