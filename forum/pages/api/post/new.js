//유저가 /api/post/new로 요청시 이안에 코드가 실행\
//여기에 작성되어야할 코드는 '유저가 보낸 글을 DB에 저장해주세요.'가 돼야함.

import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  console.log(요청.body);
  if (요청.method === "POST") {
    //좀더 엄격하게 method를 분기처리
    //여기안에는 서버에 저장된 데이터를 db에 저장을 보내는 코드를 짜야됨.
    const db = (await connectDB).db("forum");
    //db에 document를 발행,삽입
    let result = await db.collection("post").insertOne(요청.body);
    //무한대기 방지위해 응답코드
    return 응답.status(200).json("DB 저장 완료");
  }
}
