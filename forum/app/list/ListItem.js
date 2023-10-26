"use client";
import Link from "next/link";
import DetailLink from "./DetailLink";
import { useEffect } from "react";

export default function ListItem(props) {
  // useEffect를 이용해서 데이터를 로드시킨다면, 페이지 로드시 유저가 텅 빈 html을 먼저 보게 되고 조금 시간이 지나야 html 내용이 채워진다는 겁니다. (왜냐면 useEffect안의 코드는 html이 다 로드된 후에 실행되어서 그렇습니다.) 일반 유저들에게는 상관없는데 검색엔진 봇들이 페이지를 수집하려고 방문하면 텅 빈 html을 발견하고 실망하고 돌아갈 수 있기 때문에 검색엔진 노출 측면에서 단점이 있을 수 있습니다. **그래서 검색노출이 중요한 페이지를 만들 때는 client component로 만들어서 거기서 서버데이터를 가져오는 짓거리는 피하는게 좋습니다.**
  useEffect(() => {
    //   let result = (서버에 요청해서 DB데이터 가져오는 코드)
  }, []);

  //그래서 SEO가 중요하면 client component에서 DB 데이터를 가져오지말고 부모 server component에서 DB데이터를 가져온 다음 client component로 props 전송합시다.
  let result = props.result;

  return (
    <>
      {/* map 쓸떄에는 key속성 웬만하면 넣어주자. */}
      {result?.reverse().map((item, i) => {
        return (
          <div className="list-item" key={i}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            {/* Link태그에는 prefetch기능이 기본 탑재돼 있고, prefetch={false}를 통해 on/off 할 수 있다. prefetch란 '/어쩌구' 페이지를 자동으로 미리 로드해줍니다. 그럼 그 페이지 방문할 때 매우 빠르게 방문할 수 있습니다. 참고로 prefetch는 개방중일 때에는 확인 불가하며, 사이트 발행 후 확인가능 */}
            <Link prefetch={false} href={`detail/${item._id}`}>
              이동
            </Link>
            {/* edit페이지에서 url파라미터 id값을 사용하기 위한 드릴링 */}
            <Link href={`/edit/${item._id}`}>✍🏽수정</Link>
            {/* client component는 검색노출같은 것에 별 이점이 없기 대문에 page에
            js기능이 필요하다고 해서(animation) 전체를 클라이언트화 할 필요는
            없다. js기능 넣을 부분만 클라이언트 화 하고, 큰페이지는 서버 컴포넌트로 두도록하자. */}
            {/* form태그를 이용해서 서버로 요청을 할 수 있는데, fetch를 이용해서 Ajax를 이용할 수 있다. form태그로 전송을 하면 브라우저가 새로고침이 일어나는데, Ajax로 요청하면 새로고침 X. */}
            <p
              onClick={(e) => {
                // 일반적인 fetch문과 에러처리
                // fetch("/api/post/delete", {
                //   method: "DELETE",
                //   body: item._id,
                // })
                //   .then((res) => {
                //     if (res.status === 200) {
                //       return res.json();
                //     } else {
                //       //Ajax가 에러나는 경우는 크게 2가지. 서버단에서 에러, 네트워크(인터넷 에러.)
                //       //서버가 에러코드 전송시 실행할 코드 (500)는 여기 안내문 등.
                //     }
                //   })
                //   .then((result) => {
                //     //Ajax 연결시 성공시 실행할 코드
                //     //여기에선 연결성공된 시점이고, css opacity 1->0이 되는 시점으로 설정할 것이다. span의 부모요소는 div임.
                //     e.target.parentElement.style.opacity = 0;
                //     setTimeout(() => {
                //       e.target.parentElement.style.display = "none";
                //     }, 700); //opacity 안보이게하고 1초후 div박스 삭제
                //   })
                //   .catch((error) => {
                //     //네트워크 문제로 실패시 실행할 코드 (네트워크 에러)
                //     console.log(error);
                //   });

                //또다른 서버요청(API요청)방법, URL뒤에 ?데이터이름=값 입력가능 이런걸 쿼리스트링이라고함.
                //장점은 간닪며, GET요청에서도 데이터전송(body격이 되는 데이터)이 가능함. 하지만 데이터 많아지면 더러워지고, 민감한 정보는 url에 넣으면 안됨.
                // fetch("/api/test?name=yong&age=20");

                //다른방법. 다이나믹 라우터를 활용한 요청
                //url의 []자리에 아무거나 입력해도, 다이나믹으로 작성한 api의 코드를 실행해주는데, 이를이용해서 다른 문자나 데이터를 입력해도, 다이나믹 라우터로 입력한 파일안에서 req.query로 동일하게 데이터를 받을 수 있다.
                // fetch(`/api/abc/${item._id}`, { method: "DELETE" }) -> 이런경우에만 서버기능에서 req.query로 url출력될수 있다. 이건 아마 item._id 값과 동일.
                fetch(`/api/post/delete`, { method: "DELETE", body: item._id })
                  .then((res) => res.json())
                  .then(() => {
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 700);
                  });
              }}
            >
              삭제🗑️
            </p>
            <DetailLink />
          </div>
        );
      })}
    </>
  );
}
