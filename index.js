module.exports = doesIndexExist

function doesIndexExist(options) {
  options = options || {}
  if (!options.connection) throw new Error('`options.connection` is required')
  if (!options.collection) throw new Error('`options.collection` is required')

  var indexCollection = options.connection.collection('system.indexes')

  return indexExist

  function indexExist(index, cb) {
    indexCollection.find(index).toArray(function (err, indexes) {
      return cb(err, indexes.length > 0 ? true : false)
    })
  }
}
