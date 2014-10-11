fs = require 'fs'
path = require 'path'
directory = process.argv[2]
extension = process.argv[3]

fs.readdir directory, (err, files) ->
  if err
    console.log err
  else
    for file in files
      if path.extname(file) == ".#{extension}"
        console.log file