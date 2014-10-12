portNumber = process.argv[2]
path = process.argv[3]

fs = require('fs')
http = require('http')

server = http.createServer (request, response) ->
  fileStream = fs.createReadStream(path)
  fileStream.pipe(response)

server.listen(portNumber)