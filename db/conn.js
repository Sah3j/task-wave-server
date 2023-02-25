const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;

module.exports = {
  connectToServer: function (callback) {
      // Verify we got a good "db" object
      client.connect()
         .then(function (db) {
            _db = db.db("taskwave");
            console.log("Successfully connected to MongoDB."); 
        })
        .catch(function (err) {
             console.error(err);
        });
  },
  
 
  getDb: function () {
    return _db;
  },
};