const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err);
  } finally {
    await client.close();
  }
}

connect();
