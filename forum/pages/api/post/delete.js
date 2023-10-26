import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // fetch에서 stringify 했으므로 req.body는 문자열화 돼있다. 그러므로 parse를 해야 따옴표를 벗겨내고, 여기서 활용가능한 객체 형태가 된다.
  //console.log(req.body); // stringify로 id를 보낸다면 {"_id":"??","title":"??","content":"??"} 이런식으로 돼있음.
  // console.log(req.body);
  if (req.method === "DELETE") {
    //session에는 추가되는 author이 없음. 서버에서 제공하는 유저정보임.
    let session = await getServerSession(req, res, authOptions);
    const db = (await connectDB).db("forum");
    const cor = await db
      .collection("post")
      //일치하는 객체 찾음
      .findOne({ _id: new ObjectId(req.body) });
    console.log(cor);
    if (!session) {
      console.log("로그인해주세여");
      return;
    }
    //삭제는 여기 이하 코드
    if (cor?.author == session.user.email) {
      let result = await db
        .collection("post")
        // ???: 서버는 id값 모릅니다. 유저한테 보내라고 하든지, DB뒤져보든지 해야합니다.
        .deleteOne({ _id: new ObjectId(req.body) });
      console.log(result, "삭제완료"); //document 삭제결과 알려줌
      return res.status(200).json("삭제완료");
    } else {
      console.log("아디불일치");
      return res.status(500).json("현재유저와 작성자 불일치");
    }
  }
}
