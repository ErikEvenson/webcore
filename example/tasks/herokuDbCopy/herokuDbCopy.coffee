module.exports = (grunt) ->
  grunt.registerTask 'herokuDbCopy',
    'Copies a heroku database from one instance to another.',
    (fromInstance, toInstance) ->
      # done = @async()
      valid = true
      message = []
      instances = ['development', 'staging', 'production']
      
      if not fromInstance? or not (fromInstance in instances)
        message.push 'Invalid "from" instance.'
        valid = false

      if not toInstance? or not (toInstance in instances)
        message.push 'Invalid "to" instance.'
        valid = false

      if fromInstance? and toInstance and fromInstance == toInstance
        message.push '"From" instance must be different from "to" instance.'
        valid = false

      message = message.join '  '

      if valid
        path = "temp/#{Date.now()}-#{fromInstance}.dump"
        grunt.task.run "herokuMaintenance:#{fromInstance}:on" unless fromInstance == 'development'
        grunt.task.run "mongodump:#{fromInstance}:#{path}"
        grunt.task.run "herokuMaintenance:#{fromInstance}:off" unless fromInstance == 'development'

        grunt.task.run "herokuMaintenance:#{toInstance}:on" unless toInstance == 'development'
        # Need to drop existing db and postfix appcode
        grunt.task.run "mongorestore:#{toInstance}:#{path}"
        grunt.task.run "herokuMaintenance:#{toInstance}:off" unless toInstance == 'development'
      else
        grunt.fatal message
