callback = (err, buffer) ->
  if err
    console.log err
  else
    contents = buffer.toString()
    lines = contents.split('\n')
    newlines = lines.length - 1
    console.log newlines

fs = require 'fs'
path = process.argv[2]
fs.readFile(path, callback)

