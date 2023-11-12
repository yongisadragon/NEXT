import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  //comment의 댓글을 전부다 가져오는게 아니라, 그 중에서도 해당하는 게시글(detail/id)의 댓글을 가져와야 하므로 find내부에서 조건처리를 해서 가져오자.
  console.log(req.query, "쿼리출력"); //유저에게 요청했던 fetch 안에 ?id=~ 이하의 값
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    //각각의 게시물은 parent id 값을 가지고 있고, 쿼리를 통해 들어온 (각각의 디테일 게시물 id) id와 일치하는 것을 불러오도록 하기 위함.
    .find({ parent: new ObjectId(req.query.id) })
    .toArray();
  // console.log(result);
  if (req.method === "GET") {
    return res.status(200).json(result);
  }
}
