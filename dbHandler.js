const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mikhailsinyakov:" +
  process.env.ATLAS_PASSWORD +
  "@cluster0-6bako.mongodb.net/tetris";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let collection;

const connect = () => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) reject(err);
      else {
        collection = client.db("tetris").collection("records");
        resolve();
      }
    });
  });
};

const getRecords = async () => {
  return new Promise((resolve, reject) => {
    collection
      .find({})
      .project({ _id: 0 })
      .sort({ record: -1 })
      .toArray((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
  });
};

const handleNewRecord = async newRecord => {
  const records = await getRecords();

  if (records.length < 10) collection.insertOne(newRecord);
  else if (newRecord.record > records[9].record) {
    collection.replaceOne(
      { username: records[9].username, record: records[9].record },
      newRecord
    );
  }
  return true;
};

const close = async () => {
  await client.close();
  return true;
};

module.exports = {
  connect,
  getRecords,
  handleNewRecord,
  close
};
