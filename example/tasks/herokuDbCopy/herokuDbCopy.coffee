module.exports = (grunt) ->
  grunt.registerTask 'herokuDbCopy',
    'Copies a heroku database from one instance to another.',
    (fromInstance, toInstance) ->
      # done = @async()
      valid = true
      message = []
      
      if not fromInstance? or not (fromInstance in ['staging', 'production'])
        message.push 'From instance must be "staging" or "production".'
        valid = false

      if not toInstance? or not (toInstance in ['staging', 'production'])
        message.push 'To instance must be "staging" or "production".'
        valid = false

      if fromInstance? and toInstance and fromInstance == toInstance
        message.push 'From instance must be different from to instance.'
        valid = false

      message = message.join '  '

      if valid
        grunt.task.run "herokuMaintenance:#{fromInstance}:on"
        grunt.task.run "mongodump:#{fromInstance}"
        grunt.task.run "herokuMaintenance:#{fromInstance}:off"

        grunt.task.run "herokuMaintenance:#{toInstance}:on"
        # grunt.task.run "mongoimport:#{toInstance}"
        grunt.task.run "herokuMaintenance:#{toInstance}:off"

        # grunt.config.requires "heroku.options.#{instance}"
        # appName = grunt.config.get "heroku.options.#{instance}"
        # exec = require('child_process').exec
        # cmd = "/usr/bin/heroku config --app #{appName}"

        # exec cmd, (error, stdout, stderr) ->
        #   grunt.log.writeln "STDOUT: #{stdout}"
        #   done()

      else
        grunt.fatal message

