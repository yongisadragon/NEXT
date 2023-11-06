import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("comment").find().toArray();
  // console.log(result);
  if (req.method === "GET") {
    return res.status(200).json(result);
  }
}
