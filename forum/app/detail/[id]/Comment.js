"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Comment(props) {
  const ref = useRef();
  // 서버로 댓글내용 전송하기. input값은 form을 통해서 서버에 보내면 되는데, 새로고침이 되기 때문에 리액트에서 input만 사용해서 전송하려면 state에 저장해두고 씁니다.
  // 서버api를 만들고, 그 api에서 요청을 받으면 body 값을 db에 저장하는게 순서이다.
  const [commentTxt, setCommentTxt] = useState("");
  const [commentList, setCommentList] = useState([]);
  //client component에서 서버에게 DB요청을 할때에는 일반적으로 useEffect안에 콜백으로 작성한다. 보통 여기안에 타이머, ajax등 넣음.
  useEffect(() => {
    const getCommentList = async () => {
      //get 요청을 통해 서버에 데이터를 보낼 수 있는 방법. 1. URL 파라미터 2.간단한 querystring. ?이름=값
      await axios.get(`/api/post/comment/list?id=${props._id}`).then((r) => {
        console.log(r);
        setCommentList(r.data);
      });

      // 일반 fetch
      // await fetch(`/api/post/comment/list?id=${props._id}`)
      //   .then((r) => r.json())
      //   .then((data) => {
      //     setCommentList(data);
      //commentList 이게 바로 안나오는 이유는 비동기인 set함수보다 콘솔이 먼저 실행됨.
      //     console.log(commentList);
      //   });
      // if (!res.ok) {
      //   throw new Error("연결실패!");
      // }
      // const data = await res.json();
    };
    getCommentList();
  }, []);

  // console.log(commentList);
  return (
    <div>
      <hr />
      {commentList.length > 0
        ? commentList.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "pink",
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={() => {
                  fetch("/api/post/comment/delete", {
                    method: "DELETE",
                    body: item._id,
                  });
                }}
                style={{ alignSelf: "end" }}
              >
                X
              </button>
              <p>{item.author}</p>
              <p>{item.content}</p>
            </div>
          ))
        : "로딩중"}

      <input
        placeholder="댓글입력"
        ref={ref}
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
          })
            .then((r) => r.json())
            .then((data) => {
              console.log(data);
              setCommentList(data);
            });
          // 서버 통해서 받아온 댓글목록을 state에 저장해서 실시간 html 생성 수정 삭제 -> crs의 장점
          ref.current.value = "";
        }}
      >
        댓글달기
      </button>
    </div>
  );
}
