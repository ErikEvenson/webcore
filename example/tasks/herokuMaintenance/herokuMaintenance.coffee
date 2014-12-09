module.exports = (grunt) ->
  grunt.registerTask 'herokuMaintenance',
    'Puts a heroku instance in or our of maintenance mode.',
    (instance, toggle) ->
      valid = true
      message = ''
      
      if not instance? or not (instance in ['staging', 'production'])
        message = 'Instance must be "staging" or "production".'
        valid = false

      if not toggle? or not (toggle in ['on', 'off'])
        message = message + '  Toggle must be "on" or "off".'
        valid = false

      if valid
        grunt.config.requires "heroku.options.#{instance}"
        appName = grunt.config.get "heroku.options.#{instance}"
        grunt.log.writeln "heroku maintenance:#{toggle} --app #{appName}"
      else
        grunt.fatal message
