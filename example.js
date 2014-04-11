var doesIndexExist = require('./')
  , MongoClient = require('mongodb').MongoClient
  , collection = 'collection'

MongoClient.connect('mongodb://localhost:27017/does-index-exist', function (err, db) {
  var indexExist = doesIndexExist({ connection: db, collection: collection })

  indexExist({ key: { field: 1 } }, function (err, exists) {
    console.log('Index does not exist:', exists)

    // Create index
    db.ensureIndex(collection, { field: 1 }, function () {

      indexExist({ key: { field: 1 } }, function (err, exists) {
        console.log('Index does exist:', exists)

        // Drop index
        db.dropIndex(collection, 'field_1', process.exit)
      })

    })

  })
})
