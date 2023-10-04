import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // fetch에서 stringify 했으므로 req.body는 문자열화 돼있다. 그러므로 parse를 해야 따옴표를 벗겨내고, 여기서 활용가능한 객체 형태가 된다.
  console.log(req.body); // stringify로 id를 보낸다면 {"_id":"??","title":"??","content":"??"} 이런식으로 돼있음.
  // let body = JSON.parse(req.body);
  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      // ???: 서버는 id값 모릅니다. 유저한테 보내라고 하든지, DB뒤져보든지 해야합니다.
      .deleteOne({ _id: new ObjectId(req.body) });
    console.log(result); //document 삭제결과 알려줌
    res.status(200).json("삭제완료");
  }
}
