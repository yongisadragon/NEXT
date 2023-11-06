import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "POST") {
    //보낼때에는 stringify -> db -> 다시 읽을 때는 parse
    req.body = JSON.parse(req.body);
    const session = await getServerSession(req, res, authOptions);
    // console.log(session);

    let 저장할거 = {
      content: req.body.comment,
      parent: new ObjectId(req.body._id),
      //유저 이메일 같은 개인정보는, 쉽게 위조할수도 있기때문에 서버단에서 가져가 쓰자. getServerSession(), 추가적으로 로그아웃 상태면 session이 null 이 뜨는데, 예외처리도 해주자.
      author: session.user.email,
    };
    const db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(저장할거);
    res.status(200).json("저장완료");
  }
}
