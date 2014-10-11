module.exports = (directory, extension, callback) ->
  fs = require 'fs'
  path = require 'path'

  fs.readdir directory, (err, files) ->
    if err
      callback err
    else
      retval = []

      for file in files
        if path.extname(file) == ".#{extension}"
          retval.push file

      callback null, retval