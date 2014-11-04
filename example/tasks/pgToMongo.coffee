# Models:  [ 'contenttypes.contenttype',
#   'sites.site',
#   'django_mailbox.mailbox',
#   'django_mailbox.messageattachment',
#   'taggit.tag',
#   'django_mailbox.message',
#   'taggit.taggeditem',
#   'eee_core.attachment',
#   'eee_core.email',
#   'eee_core.location',
#   'eee_core.phone_number',
#   'core.bid',
#   'core.contract',
#   'core.contract_meter',
#   'core.meter',
#   'core.facility',
#   'core.line_item_bid',
#   'core.line_item',
#   'core.price_request_meter',
#   'core.price_request_supplier',
#   'core.price_request',
#   'core.shelf',
#   'core.supplier_group',
#   'core.usage',
#   'core.supplier',
#   'south.migrationhistory',
#   'auth.permission',
#   'auth.user',
#   'admin.logentry',
#   'eee_core.organization',
#   'eee_core.organization_manager',
#   'core.customer',
#   'core.partner',
#   'core.user_profile',
#   'core.utility',
#   'tastypie.apikey',
#   'registration.registrationprofile' ]

module.exports = (grunt) ->
  grunt.registerTask 'pgToMongo', 'pgToMongo', ->
    done = @async()
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    mongoose = require 'mongoose'
    path = require 'path'
    rootPath = path.normalize(__dirname + '/..')
    configPath = path.join rootPath, 'server/config/environment'
    config = require configPath
    mongoose.connect config.mongo.uri, config.mongo.options
    db = mongoose.connection

    MongoClient = require('mongodb').MongoClient
    assert = require('assert')
    _ = require 'lodash'
    models = []

    MongoClient.connect 'mongodb://localhost/vbez', (err, importDb) ->
      assert.equal(null, err)
      entities = importDb.collection('entities')
      stream = entities.find().stream()

      stream.on "data", (entity) ->
        console.log "Model: ", entity.model
        models.push entity.model
        models = _.uniq models

      stream.on "end", ->
        console.log "Models: ", models
        importDb.close()
        done()

    # importDb = mongoose.createConnection('mongodb://localhost/vbez')
    # importDb.on('error', console.error.bind(console, 'connection error:'))
    
    # importDb.once "open", ->
    #   console.log "XXXX", 
    #   done()

    # db.on('error', console.error.bind(console, 'connection error:'))

    # db.once "open", ->
    #   Thing = require path.join(rootPath, '/server/api/thing/thing.model')

    #   Thing.create {'name':'test8'}, (err) ->
    #     grunt.log.ok err if err

    #     Thing.find (err, things) ->
    #       grunt.log.ok err if err
    #       grunt.log.ok "Things: ", things
    #       grunt.log.ok 'pgToMongo done.'
    #       done()