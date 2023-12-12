import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  //console.log(request.cookies); //유저의 cookie
  //console.log(request.hearders); //유저의 headers정보(이전방문페이지, 사용중인os,브라우저, 선호언어, IP, 쿠키 등)
  //console.log(request.nextUrl); //유저가 요청중인 url
  //쿠키나 헤더는 map형 자료이기 때문에 마지막에 get('자료이름')으로 가져와야한다.

  //NextResponse.next() //통과시켜주세요.
  //NextResponse.redirect() //다른페이지로 강제이동(주소창도 변경)
  //NextResponse.rewrite() //다른페이지로 강제이동(url은 유지)
  const session = await getToken({ req: request }); //현재 '로그인된'유저의 정보들이 담겨있음..env파일에 NEXTAUTH_SECRET =??? 있다는 조건하에
  // console.log("유저세션정보:", session);

  //1./list페이지 접속기록 몰래 저장하기
  if (request.nextUrl.pathname.startsWith("/list")) {
    // '/list'로 시작하는 모든경로
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform")); //사용하고 있는 브라우저
    return NextResponse.next();
  }

  //2.이런식으로 특정 페이지에 접속시, 세션을 확인하고 없으면 다른경로로 이동시켜주는 기능은 해당 /write페이지 에서 직접짜면 되지 않나.?라고 하면 가능하겠지만, 여러페이지를 관리하고 싶다하면 이 js파일에서 한번에 관리한다.
  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      //로그아웃일 경우 null. 1039
      return NextResponse.redirect("http://localhost:3000/api/auth/signin");
    }
  }

  //3.쿠키생성해서 보내주려면 이렇게합니다.
  request.cookies.get("쿠키이름"); //출력
  request.cookies.has("쿠키이름"); //존재확인
  request.cookies.delete("쿠키이름"); //삭제

  // const response = NextResponse.next();
  // response.cookies.set({
  //   name: "mode2",
  //   value: "dark",
  //   maxAge: 3600,
  //   httpOnly: true, //브라우저에서 쿠키조작 불가
  // });
  // return response;

  //연습. 유저가 /register 페이지 방문시 visited=true 라는 쿠키를 생성해주려면 코드를 어떻게 짜야할까요?
  if (request.nextUrl.pathname.startsWith("/register")) {
    const hasCookie = request.cookies.has("visited");
    if (!hasCookie) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 3600,
        httpOnly: true, //브라우저에서 쿠키조작 불가
      });
      return response;
    } else {
      return NextResponse.next();
    }
  }
}
