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

  getMongoUriObject: (appName, mongoUriKey, callback) ->
    uriObject = {}

    if not appName? or not mongoUriKey?
      error = new Error('No appName or mongoUriKey provided.')
      callback(error, uriObject) if callback?
    else
      cmd = "/usr/bin/heroku config --app #{appName} | grep #{mongoUriKey}"

      exec cmd, (error, stdout, stderr) ->
        if error?
          callback error, uriObject if error?
        else
          uriKeyValue = stdout.split ' '
          uri = uriKeyValue[1]
          uriObject = mongodbUri.parse uri
          callback(error, uriObject)

  restoreMongoDb: (uriObject, path, callback) ->
    # mongorestore --host walt.compose.io:<portnumber> --db <database_name> 
    # -u <username> -p<password> dump/<database_name>
    host       = uriObject.hosts[0]
    hostname   = host.host
    database   = uriObject.database.trim()
    port       = host.port
    username   = uriObject.username
    password   = uriObject.password
    # path       = "temp/#{uuid.v4()}.dump" unless path?

    if not path?
      error = new Error 'No path provided.'
      callback(error) if callback?
    else if not host? or not database?
      error = new Error 'Host or database not provided.'
      callback(error) if callback?
    else
      cmd = []
      # cmd.push "mongo --host #{hostname}"

      # if port?
      #   cmd.push "--port #{port}"

      # # cmd.push "-d #{database}"
      # cmd.push "-u #{username}" unless not username?
      # cmd.push "-p #{password}" unless not username?
      # cmd.push '--eval "db.dropDatabase();" &&'

      if port?
        cmd.push "mongorestore -h #{hostname}:#{port}"
      else
        cmd.push "mongorestore -h #{hostname}"

      cmd.push "-d #{database}"
      cmd.push "-u #{username}" unless not username?
      cmd.push "-p #{password}" unless not username?
      cmd.push "#{path}"
      cmd = cmd.join ' '
      # console.log "xxxx", cmd
      exec cmd, (error, stdout, stderr) ->
        callback(error) if callback?

  setMaintenanceMode: (appName, toggle, callback) ->
    if not appName?
      error = new Error("No appName provided.")
      callback(error) if callback?
    else
      toggle = 'on' if not toggle?
      cmd = "/usr/bin/heroku maintenance:#{toggle} --app #{appName}"
      exec cmd, (error, stdout, stderr) ->
        callback(error) if callback?
