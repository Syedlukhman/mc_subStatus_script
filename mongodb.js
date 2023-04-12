const { MongoClient } = require('mongodb');

// config

let dbInstance = null;
const url = `mongodb+srv://huemn-analytics:UznP17UzVcs0YGcj@cluster0.ofeps.mongodb.net/production/?readPreference=secondary`;

async function createDbInstance() {
  if (dbInstance !== null) {
    logger.info('Using cached DB instance');
    return dbInstance;
  }

  console.log('Connecting to DB ...');
  const db = await MongoClient.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true 
    } );
  console.info('Connected to DB');

  dbInstance = db.db('production');

  return dbInstance;
}

async function createCollectionInstance(collection) {
  dbInstance = dbInstance || (await createDbInstance());

  return dbInstance.collection(collection);
}

module.exports = {
  createDbInstance,
  createCollectionInstance,
};
