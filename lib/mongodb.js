import mongoose from "mongoose";

const MONGODB_URI = process.env.SECRET_KEY_MONGO;
if (!MONGODB_URI) throw new Error("Please define SECRET_KEY_MONGO in .env.local");

// Ensure globalThis has a cached property
let cached = globalThis.mongoose;
if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
