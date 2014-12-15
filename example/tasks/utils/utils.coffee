development = require '../../server/config/environment/development'
exec        = require('child_process').exec
mongodbUri  = require 'mongodb-uri'

module.exports =
  getMongoUriObject: (grunt, instance, callback) ->
    error = null
    uriObject = {}

    if instance == 'development'
      uri = development.mongo.uri
      uriObject = mongodbUri.parse uri
      callback(error, uriObject)
    else
      grunt.config.requires "heroku.options.#{instance}"
      grunt.config.requires 'heroku.options.mongoUriKey'
      appName = grunt.config.get "heroku.options.#{instance}"
      mongoUriKey = grunt.config.get 'heroku.options.mongoUriKey'
      cmd = "/usr/bin/heroku config --app #{appName} | grep #{mongoUriKey}"

      exec cmd, (error, stdout, stderr) ->
        callback error, uriObject if error?
        uriKeyValue = stdout.split ' '
        uri = uriKeyValue[1]
        uriObject = mongodbUri.parse uri
        callback(error, uriObject)
