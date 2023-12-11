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

  const session = await getToken({ req: request }); //.env파일에 NEXTAUTH_SECRET =??? 있다는 조건하에

  if (request.nextUrl.pathname.startsWith("/list")) {
    if (session == null) {
      return NextResponse.redirect("http://localhost:3000/api/auth/sighin");
    }
  }

  console.log(session);
  //1./list페이지 접속기록 몰래 저장하기
  if (request.nextUrl.pathname.startsWith("/list")) {
    // '/list'로 시작하는 모든경로
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }
}
