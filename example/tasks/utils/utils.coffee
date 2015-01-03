development = require '../../server/config/environment/development'
exec        = require('child_process').exec
mongodbUri  = require 'mongodb-uri'

module.exports =
  dumpMongoDb: (uriObject, path, callback) ->
    host       = uriObject.hosts[0]
    hostname   = host.host
    database   = uriObject.database.trim()
    port       = host.port
    username   = uriObject.username
    password   = uriObject.password
    path       = "temp/#{uuid.v4()}.dump" unless path?

    if not host? or not database?
      error = new Error 'Host or database not provided.'
      callback(error) if error?
    else
      cmd = []

      if port?
        cmd.push "mongodump -h #{hostname}:#{port}"
      else
        cmd.push "mongodump -h #{hostname}"

      cmd.push "-d #{database}"
      cmd.push "-u #{username}" unless not username?
      cmd.push "-p #{password}" unless not username?
      cmd.push "-o #{path}"
      cmd = cmd.join ' '

      exec cmd, (error, stdout, stderr) ->
        callback(error) if callback?

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

  setMaintenanceMode: (appName, toggle, callback) ->
    if not appName?
      error = new Error("No appName provided.")
      callback(error) if callback?
    else
      toggle = 'on' if not toggle?
      cmd = "/usr/bin/heroku maintenance:#{toggle} --app #{appName}"
      exec cmd, (error, stdout, stderr) ->
        callback(error) if callback?
