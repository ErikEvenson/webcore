directory = process.argv[2]
extension = process.argv[3]
p6Module = require './p6Module.js'

callback = (err, files) =>
  if err
    console.log err
  else
    for file in files
      console.log file

p6Module directory, extension, callback