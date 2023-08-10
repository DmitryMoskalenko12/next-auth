import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect('mongodb+srv://dmtrmsklnk:URiWUC0NOGWgoKXA@cluster0.mebjjwq.mongodb.net/auth-demo?retryWrites=true&w=majority');
  return client;
}