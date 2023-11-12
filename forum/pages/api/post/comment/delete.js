import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    console.log("로그인해주세여");
    return;
  }

  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    const cor = await db
      .collection("comment")
      .findOne({ _id: new ObjectId(req.body) });

    if (cor?.author == session?.user?.email) {
      const result = await db
        .collection("comment")
        .deleteOne({ _id: new ObjectId(req.body) });

      console.log(result, "삭제완료"); //document 삭제결과 알려줌
      return res.status(200).json("삭제완료");
    } else {
      console.log("아디불일치");
      return res.status(500).json("현재유저와 작성자 불일치");
    }
  }
}
