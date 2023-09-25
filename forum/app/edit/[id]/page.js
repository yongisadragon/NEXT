import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { useParams } from "next/navigation";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  // 글수정 페이지에서는 기존에 해당 url의 id를 사용하고 싶은데, props를 사용하면 다이나믹 라우트를 통해 들어온 페이지이기 때문에 url정보가 들어있따(서버컴포넌트 기준). 궁금하면 props 콘솔해보세요. 이런식으로 result를 콘솔해보면 해당 id에 해당하는 db에 저장된 게시물 정보 오브젝트가 나올것이다.
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  // _id는 DB에는 ObjectId ~ 어쩌고로 돼있어서 일반문자로 바꿔야한다.
  console.log(result._id.toString());
  return (
    <>
      <h4>글수정</h4>
      <div className="p-20">
        {/* 해당 경로로 post요청과 함께 input내용들을 보내라. 이렇게 되면 순서가 input value->서버기능(중간)으로 되는것이고, api/post/new에서는 요청.body로 받은 값들을 db로 보내면 되는것임. */}
        <form action="/api/post/edit" method="POST">
          <button className="btn" type="submit">
            수정
          </button>
          {/* name 프로퍼티는 body안에 입력한 value값과 함께 키값으로 담김, 기존 몽고db는 _id가 있는데, 임의로 넣어주지 않아도 몽고에서 자동생성 해준다. */}
          <input
            defaultValue={result.title}
            name="title"
            placeholder="글제목"
          />
          <input
            defaultValue={result.content}
            name="content"
            placeholder="글내용"
          />
          {/* 중간 서버기능에서 id값을 필요로 하기 때문에, form안에 담아 req.body로 보내준다. */}
          <input
            style={{ display: "none" }}
            defaultValue={result._id.toString()}
            name="_id"
          />
        </form>
      </div>
    </>
  );
}
