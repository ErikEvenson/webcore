url = process.argv[2]
http = require('http')
concat = require('concat-stream')

callback = (data) ->
  string = data.toString()
  console.log string.length
  console.log string

http.get url, (response) ->
  response.pipe concat(callback)
