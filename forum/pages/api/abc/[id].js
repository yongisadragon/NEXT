//누군가 /api/abc/아무문자로 요청하며 이 파일을 실행해줌.

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  //쿼리스트링을 통해 id값을 받아왔고, req.query안에 obj형식으로 {any: 'id값'} 확인할 수 있음. any는 다이나믹에 설정한 이름이 키값으로 들어감.
  console.log(req.query);
  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(req.query.id) });
    console.log(result);
    res.status(200).json("삭제완료");
  }
}
