module.exports = (grunt) ->
  grunt.registerTask 'herokuDbCopy',
    'Copies a heroku database from one instance to another.',
    ['herokuMaintenance:production:on', 'herokuMaintenance:production:off']