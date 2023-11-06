import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
//이 서버기능은 가입요청을 받으면 DB에 저장해줍니다. 암호를 받는 서버기능인만큼 req.body로 들어오는 정보를 암호화할 필요가있죠오. 비번은 DB에 암호화해서 저장하는게 좋기 때문에 bcrypt 라는 암호화를 쉽게해주는 라이브러리가 있습니다.
export default async function handler(req, res) {
  if (req.method == "POST") {
    //여기적힌 password는 input의 name
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    console.log(req.body);
    //들어온 비번은 hash화 해서 재할당
    req.body.password = hash;

    //user_cred 경로로 저장
    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(req.body);
    res.status(200).json("가입완료");
  }
}
