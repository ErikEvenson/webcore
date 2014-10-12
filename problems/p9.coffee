urls = process.argv
http = require('http')
concat = require('concat-stream')

urls = urls[2..]

http.get urls[0], (response) ->
  response.pipe concat (data) ->
    string = data.toString()
    console.log string

    http.get urls[1], (response) ->
      response.pipe concat (data) ->
        string = data.toString()
        console.log string

        http.get urls[2], (response) ->
          response.pipe concat (data) ->
            string = data.toString()
            console.log string
