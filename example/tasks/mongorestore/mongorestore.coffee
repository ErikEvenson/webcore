module.exports = (grunt) ->
  grunt.registerTask 'mongorestore',
    'Restores the mongo database of an instance from a path.',
    (instance, path) ->
      development = require '../../server/config/environment/development'
      fs          = require 'fs'
      mongodbUri  = require 'mongodb-uri'
      utils       = require '../utils/utils.coffee'

      valid = true
      message = []
      instances = ['development', 'staging', 'production']
      
      if not path?
        message.push 'No path provided.'
        valid = false

      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      if valid
        done = @async()
        uriObject = null

        fs.readdir path, (error, files) ->
          dumpPath = "#{path}/#{files[0]}"

          if instance == 'development'
            uri = development.mongo.uri
            uriObject = mongodbUri.parse uri
            
            utils.restoreMongoDb uriObject, dumpPath, (error) ->
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
                utils.restoreMongoDb uriObject, dumpPath, (error) ->
                  grunt fatal error if error?
                  done()
      else
        message.join '  '
        grunt.fatal message
