fs = require 'fs'
path = process.argv[2]
buffer = fs.readFileSync(path)
contents = buffer.toString()
lines = contents.split('\n')
newlines = lines.length - 1
console.log newlines