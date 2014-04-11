# does-index-exist

Checks whether an index exists on a MongoDB collection

[![build status](https://secure.travis-ci.org/domharrington/does-index-exist.png)](http://travis-ci.org/domharrington/does-index-exist)

## Installation

```
npm install does-index-exist --save
```

## Usage

```js
var doesIndexExist = require('does-index-exist')
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

```

### `var indexExist = doesIndexExist(options)`

Options must include:

- `connection` - a database connection returned from `MongoClient.connect`
- `collection` - the collection name to check for the index

This returns a function which is called like so:

### `indexExist(cb)`

- `cb` is the callback for when the query is complete, called with `cb(err, exists)`. err is any mongo errors, exists is a boolean

## Credits
[Dom Harrington](https://github.com/domharrington/)
