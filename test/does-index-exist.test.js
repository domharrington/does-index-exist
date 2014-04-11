var doesIndexExist = require('../')
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , connection

describe('does index exist', function () {

  beforeEach(function (done) {
    MongoClient.connect('mongodb://localhost:27017/does-index-exist', function (err, db) {
      connection = db
      done()
    })
  })

  afterEach(function (done) {
    connection.dropDatabase(done)
  })

  it('should throw if no connection provided', function () {
    assert.throws(function () {
      var indexExist = doesIndexExist()
      indexExist()
    }, /`options.connection` is required/)
  })

  it('should throw if no collection provided', function () {
    assert.throws(function () {
      var indexExist = doesIndexExist({ connection: {} })
      indexExist()
    }, /`options.collection` is required/)
  })

  it('should callback with false if index is not set', function (done) {
    var indexExist = doesIndexExist({ connection: connection, collection: 'indexCollection' })
    indexExist({ key: { field: 1 } }, function (err, exists) {
      assert.equal(exists, false)
      done()
    })
  })

  describe('index exists', function () {
    var collectionName = 'indexExistsCollection'

    before(function (done) {
      connection.ensureIndex(collectionName, { field: 1 }, done)
    })

    it('should callback with true if index exists', function (done) {
      var indexExist = doesIndexExist({ connection: connection, collection: 'indexCollection' })
      indexExist({ key: { field: 1 } }, function (err, exists) {
        assert.equal(exists, true)
        done()
      })
    })
  })

})
