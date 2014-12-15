module.exports = (grunt) ->
  grunt.registerTask 'mongodump',
    'Dumps the mongo database of an instance to a path.',
    (instance, path) ->
      exec        = require('child_process').exec
      uuid        = require('uuid')
      utils       = require '../utils/utils.coffee'

      dump = (uriObject, callback) ->
        host       = uriObject.hosts[0]
        hostname   = host.host
        database   = uriObject.database.trim()
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

      valid = true
      message = []
      instances = ['development', 'staging', 'production']

      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      message.join '  '

      if valid
        done = @async()

        utils.getMongoUriObject grunt, instance, (error, uriObject) ->
          grunt.fatal error if error?
          dump uriObject, done

      else
        grunt.fatal message
