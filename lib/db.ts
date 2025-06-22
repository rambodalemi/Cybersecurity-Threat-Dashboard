import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
export const db = client.db("threat_detector");
export const logs = db.collection("logs");
export const alerts = db.collection("alerts");
