module.exports = (grunt) ->
  grunt.registerTask 'description', 'description', ->
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    grunt.log.writeln('An example project.')