should = require 'should'
app = require '../../app'
request = require 'supertest'

describe 'GET /api/customers', ->
  it 'should respond with JSON array', (done) ->
    request(app)
      .get '/api/customers'
      .expect 200
      .expect 'Content-Type', /json/
      .end (err, res) ->
        if err
          return done(err)
          
        res.body.should.be.instanceof Array
        done()