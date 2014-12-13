module.exports = (grunt) ->
  grunt.registerTask 'herokuMaintenance',
    'Puts a heroku instance in or our of maintenance mode.',
    (instance, toggle) ->
      done = @async()
      valid = true
      message = []
      instances = ['staging', 'production']
      
      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      if not toggle? or not (toggle in ['on', 'off'])
        message.push 'Toggle must be "on" or "off".'
        valid = false

      message = message.join '  '

      if valid
        grunt.config.requires "heroku.options.#{instance}"
        appName = grunt.config.get "heroku.options.#{instance}"
        cmd = "/usr/bin/heroku maintenance:#{toggle} --app #{appName}"
        exec = require('child_process').exec
        exec cmd, (error, stdout, stderr) -> done()
      else
        grunt.fatal message
