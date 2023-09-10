// 자주 쓰는 페이지 이동을 위해 로직을 짜야하는데(onClick 등), 클라이언트 컴포넌트를 만들어보자. 이틀테면 /list에 있는 page.js에 db데이터를 받아오는 코드를 ssr으로 남겨두고 싶을때. csr은 이와같이 따로 빼놓는다. 여기서 csr 코드 짜고, ssr에 넣어서 사용하면 된다.
"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"; //이거 임의로 navigation라고 변경해줘야한다.

export default function DetailLink() {
  let router = useRouter(); //client component에서만 사용가능한 페이지 이동 위한 훅
  //근데 Link말고 이딴거(useRouter) 왜쓰는데요?!라고 한다면요.. router.??? 에는 여러가지 기능 들이 있음. back, forward, refresh(변동있는 html만), prefetch(라우터 입력해 놓으면 페이지 로드에 필요한 모든 파일 데이터 미리 로드되는 기능.. 근데 Link태그도 이 기능이 자동 탑재 돼있음) 등
  let a = usePathname(); // 현재 URL 출력
  let b = useSearchParams(); // 쿼리스트링 등 출력
  let c = useParams(); // [dynamic route]에 입력한거 출력
  //   console.log(c);
  return (
    <button
      onClick={() => {
        router.push("/"); //push는 페이지 이동을 시켜줌
      }}
    >
      홈페이지
    </button>
  );
}
