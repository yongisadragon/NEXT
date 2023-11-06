"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  // 서버로 댓글내용 전송하기. input값은 form을 통해서 서버에 보내면 되는데, 새로고침이 되기 때문에 리액트에서 input만 사용해서 전송하려면 state에 저장해두고 씁니다.
  // 서버api를 만들고, 그 api에서 요청을 받으면 body 값을 db에 저장하는게 순서이다.
  const [commentTxt, setCommentTxt] = useState("");
  const [commentList, setCommentList] = useState([]);
  //client component에서 서버에게 DB요청을 할때에는 일반적으로 useEffect안에 콜백으로 작성한다. 보통 여기안에 타이머, ajax등 넣음.
  useEffect(() => {
    const getCommentList = async () => {
      const res = await fetch("/api/post/comment/list", { method: "GET" });
      if (!res.ok) {
        throw new Error("연결실패!");
      }
      const data = await res.json();
      setCommentList(data);
    };
    getCommentList();
  }, []);

  // console.log(commentList);
  return (
    <div>
      {commentList &&
        commentList.map((item) => (
          <div key={item._id} style={{ backgroundColor: "pink" }}>
            <p>{item.author}</p>
            <p>{item.content}</p>
          </div>
        ))}

      <input
        type="text"
        onChange={(e) => {
          setCommentTxt(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/post/comment/new", {
            method: "POST",
            body: JSON.stringify({
              comment: commentTxt,
              _id: props._id,
            }),
          });
        }}
      >
        댓글달기
      </button>
    </div>
  );
}
