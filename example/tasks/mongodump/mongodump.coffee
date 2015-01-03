module.exports = (grunt) ->
  grunt.registerTask 'mongodump',
    'Dumps the mongo database of an instance to a path.',
    (instance, path) ->
      uuid        = require('uuid')
      utils       = require '../utils/utils.coffee'

      valid = true
      message = []
      instances = ['development', 'staging', 'production']

      if not instance? or not (instance in instances)
        message.push 'Invalid instance.'
        valid = false

      if valid
        done = @async()

        utils.getMongoUriObject grunt, instance, (error, uriObject) ->
          if error?
            grunt.fatal error
          else
            utils.dumpMongoDb uriObject, "temp/#{uuid.v4()}.dump", (error) ->
              grunt fatal error if error?
              done()
      else
        message.join '  '
        grunt.fatal message
