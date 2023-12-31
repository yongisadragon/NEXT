//유저가 /api/post/new로 요청시 이안에 코드가 실행\
//여기에 작성되어야할 코드는 '유저가 보낸 글을 DB에 저장해주세요.'가 돼야함.

import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  //서버에서 현재 로그인한 유저 정보 출력방법, name, email, image 등.. 근데 로그인이 안된상태라면 session이 null이기때문에 ?.접근연산자로 접근하는것이 안전할걸요.
  let session = await getServerSession(요청, 응답, authOptions);
  // console.log(session?.user?.email);
  if (session) {
    //글쓴이만 삭제할 수 있도록 post 식별할 수 있는 author를 추가해주자.
    요청.body.author = session.user.email;
  }
  console.log(요청.body.author);
  if (요청.method === "POST") {
    //좀더 엄격하게 method를 분기처리하고, 제목이나 내용 안쓰면 제목쓰라고 말도해줌.
    // 이거 말고도 내용을 안써놨거나 여러가지 악성유저들의 활동상황을 가정해보고 전부 막아놓으면 훌륭한 서버기능이 완성됩니다.
    if (요청.body.title == "") {
      return 응답.status(500).json("제목써라");
    }
    try {
      //여기안에는 서버에 저장된 데이터를 db에 저장을 보내는 코드를 짜야됨.
      const db = (await connectDB).db("forum");
      //db에 document를 발행,삽입
      let result = await db.collection("post").insertOne(요청.body);
      //무한대기 방지위해 응답코드 혹은. redirect
      // return 응답.status(200).json("DB 저장 완료");
      응답.redirect(302, "/list");
    } catch (error) {
      // DB가 다운되거나 인터넷 어쩌고가 끊겼을때에는? try-catch로 에러 발생시 실행할 코드를 쓰면됩니다.
    }
  }
}
