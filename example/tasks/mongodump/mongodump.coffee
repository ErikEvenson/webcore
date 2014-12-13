module.exports = (grunt) ->
  grunt.registerTask 'mongodump',
    'Dumps the mongo database of an instance to a path.',
    (instance, path) ->
      exec        = require('child_process').exec
      mongodbUri  = require('mongodb-uri')
      development = require('../../server/config/environment/development')
      uuid        = require('uuid')

      valid = true
      message = []
      instances = ['development', 'staging', 'production']

      dump = (uriObject, callback) ->
        # mongodump -h hostname.mongohq.com:port_number -d database_name -u username -p password -o /path/on/my/local/computer
        # grunt.log.writeln "STDOUT: #{JSON.stringify(uriObject, null, 2)}"

        host       = uriObject.hosts[0]
        hostname   = host.host
        database   = uriObject.database
        port       = host.port
        username   = uriObject.username
        password   = uriObject.password
        path       = "temp/#{uuid.v4()}.dump" unless path?

        if not host? or not database?
          grunt.fatal "Host or database not provided."

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
          grunt.fatal error if error?
          callback() if callback?

      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      message.join '  '

      if valid
        done = @async()

        if instance == 'development'
          uri = development.mongo.uri
          uriObject = mongodbUri.parse uri
          dump uriObject, done
        else
          grunt.config.requires "heroku.options.#{instance}"
          grunt.config.requires "heroku.options.mongoUriKey"

          appName = grunt.config.get "heroku.options.#{instance}"
          mongoUriKey = grunt.config.get "heroku.options.mongoUriKey"  
          cmd = "/usr/bin/heroku config --app #{appName} | grep #{mongoUriKey}"
          
          exec cmd, (error, stdout, stderr) ->
            grunt.fatal error if error?
            uriKeyValue = stdout.split ' '
            uri = uriKeyValue[1]
            uriObject = mongodbUri.parse uri
            dump uriObject, done

      else
        grunt.fatal message
