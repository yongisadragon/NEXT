//몽고db에서 데이터에 접속하는 방법입니다!
// .connect를 통해 여러번 실행하면 계속 데이터를 받아와지기 때문에(자주 실행하면 좋지 않다는 뜻) next 서버 띄울 때 1번만 실행하면 됨.

//db에서 데이터 불러오는 코드(앞으로 거의 건들지 않음)
//이제 await connectDB 사용할 때 마다 그 자리에 MongoClient(url, options).connect()가 남으니까 맘대로 사용하면 됩니다.

import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://ckfflekfxms:z7951379^^@cluster0.o5re4rj.mongodb.net/?retryWrites=true&w=majority";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
