import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function page(props) {
  const db = (await connectDB).db("forum");
  // findOne()은 괄호안에 해당하는 obj 내용의 자료만 불러와줌. _id로 가져오는게 좋을듯요. ObjectId()는 몽고db에서 제공하는 메서드입니다.
  // props.params.id은 내가 찾는 글의 id이므로 findOne()의 _id값으로 넣는다. 궁금하면 detail/??? 에 넣어보든가요
  // 그럼 이제 어딘가에서 Link를 누르면 해당하는 링크에 해당 id값이 들어가도록 하면 되는거 아니에요? 네 맞습니다.
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  //console.log(props.params.id); //id는 왜 id냐. dynamic router를 이용해서 detail/[id]의 [] 안에 지어준 네이밍임. props.params는 detail폴더 하위 폴더들을 obj 키값으로 가짐.

  return (
    <>
      <div className="p-20">
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <Comment _id={result._id.toString()} />
      </div>
    </>
  );
}
