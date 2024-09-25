const { MongoClient, ServerApiVersion } = require("mongodb");

let db;
const connectDB = async () => {
  if (db) return db;
  try {
    // const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const uri =
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j8y0i.mongodb.net/`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("grow-together");
    return db;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;