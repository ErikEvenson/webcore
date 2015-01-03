module.exports = (grunt) ->
  grunt.registerTask 'herokuMaintenance',
    'Puts a heroku instance in or our of maintenance mode.',
    (instance, toggle) ->
      utils     = require '../utils/utils.coffee'
      done      = @async()
      valid     = true
      message   = []
      instances = ['staging', 'production']
      
      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      if not toggle? or not (toggle in ['on', 'off'])
        message.push 'Toggle must be "on" or "off".'
        valid = false

      if valid
        grunt.config.requires "heroku.options.#{instance}"
        appName = grunt.config.get "heroku.options.#{instance}"

        utils.setMaintenanceMode appName, toggle, (error) ->
          grunt.fatal error if error
          done()
      else
        message = message.join '  '
        grunt.fatal message
