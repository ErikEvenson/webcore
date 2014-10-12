moment = require('moment')
net = require('net')
portNumber = process.argv[2]

server = net.createServer (socket) ->
  now = moment().format('YYYY-MM-DD hh:mm')
  socket.write("#{now}\n")
  socket.end()

server.listen(portNumber)