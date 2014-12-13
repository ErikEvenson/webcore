module.exports = (grunt) ->
  grunt.registerTask 'mongodump',
    'Dumps the mongo database of an instance.',
    (instance) ->
      done = @async()
      valid = true
      message = []
      
      if not instance? or not (instance in ['staging', 'production'])
        message.push 'Instance must be "staging" or "production".'
        valid = false

      message.join '  '

      if valid
        grunt.config.requires "heroku.options.#{instance}"
        appName = grunt.config.get "heroku.options.#{instance}"
        grunt.config.requires "heroku.options.mongoUriKey"
        mongoUriKey = grunt.config.get "heroku.options.mongoUriKey"
        exec = require('child_process').exec
        cmd = "/usr/bin/heroku config --app #{appName} | grep #{mongoUriKey}"

        exec cmd, (error, stdout, stderr) ->
          grunt.log.writeln "STDOUT: #{stdout}"
          done()

      else
        grunt.fatal message
