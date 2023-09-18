export default function Write() {
  //기본적인 GET,POST요청은 form태그를 사용한다. PUT,DELETE는 이렇게 사용 불가.
  return (
    <>
      <h4>글작성</h4>
      <div className="p-20">
        {/* 해당 경로로 post요청과 함께 input내용들을 보내라. 이렇게 되면 순서가 input value->서버기능(중간)으로 되는것이고, api/post/new에서는 요청.body로 받은 값들을 db로 보내면 되는것임. */}
        <form action="/api/post/new" method="POST">
          <button className="btn" type="submit">
            저장
          </button>
          {/* name 프로퍼티는 body안에 입력한 value값과 함께 키값으로 담김, 기존 몽고db는 _id가 있는데, 임의로 넣어주지 않아도 몽고에서 자동생성 해준다. */}
          <input name="title" placeholder="글제목" />
          <input name="content" placeholder="글내용" />
        </form>
        <form action="/api/time" method="GET">
          <button className="btn" type="submit">
            GET TIME
          </button>
        </form>
      </div>
    </>
  );
}
