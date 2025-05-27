// src/config/database.ts
import { MongoClient, Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined")
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db(process.env.DB_NAME || "cybersecurity-dashboard")
}

export default clientPromise