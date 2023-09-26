import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

// edit 폼 작성하면 db에 있는 데이터를 수정해주세요!
export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.title == "") {
      return res.status(500).json("제목작성부탁");
    }
    try {
      const db = (await connectDB).db("forum");
      // 서버에 없느 정보(id같은)는 유저에게 보내라고 하거나, DB에서 조희하거나..둘중 하나다. form을 통해 input값을 받을 수 있으니 이 경우에는 유저한테 보내라고 해주자. (수정할 때 글 id 함께 보내도록 해볼까?)
      // updateOne({},{}) 형식으로 들어가는데, 순서대로 업데이트할 게시글의 정보(id), 두번째는 업데이트할 내용. 둘다 req.body에 들어있음. 하지만 body에 _id 까지 넣으면 순수한 title,content는 따로 빼서 넣어주자.
      let onlyBody = { title: req.body.title, content: req.body.content };
      let result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: onlyBody });
      // + &set 이외에 $inc 라는 기존 값에 증감한 해주는 방법임.
      res.redirect(302, "/list");
    } catch (error) {}
  }
}
