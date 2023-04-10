import mongoose, { ConnectOptions } from "mongoose";

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export async function connect() {
  try {
    mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as MongooseConnectOptions
    );
  } catch (error) {
    console.error("Could not connect to db");
    process.exit(1);
  }
}

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
