db를 써볼건데, 표처럼 데이터를 보관하는 관계형 db(sql계열), 비관계형 db(몽고, 클라우드 파이어스토어 등)가 있다. 몽고db는 obj처럼 데이터를 저장할 수 있다. sql문법이 필요없기 때문에 몽고db는 진입장벽이 낮다. 분산처리도 잘해준다.

관계형 데이터베이스는 데이터를 엑셀처럼 표에 저장합니다.
데이터 입출력시 SQL이라는 언어를 사용해야하고 미리 스키마 정의(표만들기)도 해야하고 데이터 중복저장을 피하기 위해 정규화해야하고 여러가지 귀찮은 점들을 신경써야합니다.
주로 안정적인 데이터저장과 운영이 필요한 곳에서 쓰면 좋습니다.

비관계형 데이터베이스는 자료를 조금 더 자유로운 형식으로 저장할 수 있고
SQL 언어, 스키마 정의(표 만들기), 정규화 이런게 대부분 필요없습니다.
분산처리를 기본적으로 잘해서 주로 SNS 서비스처럼 많은 데이터 입출력이 필요할 때도 강점을 보입니다. 데이터를 자바스크립트 object자료형과 똑같은 모양으로 저장할 수 있어서 편리합니다.

MongoDB의 데이터 저장 방식
collection을 하나 만들어서 그 안에 document 를 만들어서 데이터를 기록하는 식으로 데이터들을 저장합니다.
비유하자면 collection은 폴더, document는 파일이라고 생각합시다.
Nodejs 강의에선 collection이 폴더, document가 데이터 한 줄이라고 한거같은데 그렇게 생각해도 됩니다.

{ 데이터이름1 : 값1, 데이터이름2 : 값2 ... }
document에 데이터를 기록할 때는 자바스크립트 object 자료형과 똑같이 저장하면 됩니다.

object 자료형은 이렇게 데이터를 저장하는데 이거 그대로 사용하면 됩니다.

### 0903

database에 데이터를 add해보자. 몽고db에 들어가서 데이터를 추가하면 database name은 하나의 프로젝트(사이트 하나당 하나가 일반적이나, 때에 따라 여러개의 db를 생성하기도 함), collection name은 하나의 '폴더'라고 생각하면 된다. collection 폴더 안에 여러개의 document(메모장 파일. 여기에 객체 자료들을 저장함)를 또 하위저장하는 구조가 됨.
insert document를 누르면 키와 값을 입력하는 공간이 있고, 제일 상단에는 기본적으로 부여되는 doc \_id번호가 있다.

// DB를 불러왔으면 페이지는 이제 어떻게 꾸미는가?
모든 개발자들 다 똑같다. 먼저 구현하고 싶은 기능을 '한글'로 풀어써봐라. 그 다음엔 그것에 맞게

1. HTML페이지를 만들어 놓음(뼈대)
2. 그 페이지 방문하면 DB에서 글 꺼내옴
3. 글들을 HTML에 꽂아넣음

// 기본적으로 next에서 라우팅 하는 방법은 다들 아실걸요. 근데 1000개도 넘는 페이지 만들겁니까? 그럴때에는 dynamic route 쓰면 됩니다. 비슷한 페이지는 여러개 만들 필요가 없습니다.

1. 우선 폴더를 [작명] 작명합니다.
2. 그러면 예를들어, detail/~ 뒤에 아무거나 입력해서 접속해도 하위 page.js를 보여줄것임.
3. 근데 진짜 '아무거나'라고 해서 똑같은 내용만 보여주면 안되니까. 범위를 지정해주려면, 여타 다른 블로그의 라우팅 방식처럼, 게시글의 id값(유저가 URL에 입력할 값)을 detail/???에 들어오게 하면 되지요. 방법은 detail/??? 이하에 올 컴포넌트 안에서 props를 출력해보면 params에 대한 정보가 나온다!

### 0908

1. 상세페이지 만드는 것처럼 url과 여러페이지 만들려면 [Dynamic Route] 사용
2. 현재 URL이 뭔지 궁금하면 props/useRouter
3. 페이지 이동, prefetch 등은 useRouter

- usePathname() 쓰면 현재 URL 출력해주고
  useSearchParams() 쓰면 search parameter (query string) 출력해주고
  useParams() 쓰면 [dynamic route]에 입력한내용 (URL 파라미터) 을 출력해줍니다.

### 0910

+글 작성 기능을 넣어보자!
순서대로,

1. 글 작성 페이지 필요하겠쬬?
2. 버튼 누르면 DB에 저장하는 방식? no!! 유저가 글에 공백이나 기타 이상한 것을 담아 보낼 수 있기 때문에 db에 '바로' 저장하는건 위험한 행동이다. 중간에 서버를 하나를 둬서 글 검사하도록 합니다.(이런 방식을 무슨 3-tier architecture 모라모라 한답니다.)
3. 서버라는건 뭐 해달라고하면 요청하면 해주는 프로그램. 서버 프로그램은 어떻게 짜는데요 그럼?
   그 형식은 /URL + method(GET,POST,PUT,DELETE,PATCH 등)로 짜면 된다. method는 정확한 기능들이 나누어져 있습니다.

-next에서 서버 기능을 개발하는건 두가지 방식이 있음.
첫번재는 루트경로에 pages/api/..js 파일을 만드는것,
다른 하나는 app/api/..js 를 만드는건데 후자가 더 최신에 나온것이긴 하다만 강의날을 기준으로 아직 나사빠진 기능이 더 많아서 page/api/~로 진행

-next는 자동 라우팅 기능이 있기 때문에 서버기능을 위해 pages/api와 같이 파일과 폴더를 만들어 놓으면 어떤 사람이 /apit/test로 CRUD와 관련된 요청을하면 '파일안의 코드'를 실행시켜줌!

### 0919

글 수정 페이지를 만들어보자. 근데 기능 정의하는데 어려움을 겪는다구요? 그럼 네이버 블로그 같은 곳을 참고해보십시오. 수정페이지를 들어가보면 큰 특징이 있슴.

1. 글 작성페이지와 'UI'가 같다. (사실 절대 조건은 아니지만 ux를 고려할때 똑같이 설계하는게 맞다)
2. 기존에 작성했던 내용이 채워져있다(아마 DB에 있는 내용)

결론은

1. list에서 글 수정 버튼 하나씩 달아줍시다.
2. 수정페이지를 만듭시다.(글도 db에서 가져오기)
3. 수정페이지에서 글 발행 누르면 db에 있던 내용을 수정하도록 합시다.

### 0926

Nextjs 에선 server / client component 들을 보여줘야할 때 최대한 서버에서 미리 html을 만들어서 보내려고 하기 때문에 server - client로 감싸진 형태로 제작한뒤, DB에서 가져온 데이터를 server 컴포넌트에서 작성한뒤, props로 client로 전송해주는 방식으로 만들자. (seo를 고려할때에)

fetch 코드가 길고 귀찮아서 편리하게 바꿔주는 axios같은 라이브러리 설치해서 쓰는 사람들이 많습니다. 근데 Nextjs 13부터는 fetch가 특별한 기능이 추가되어있기 때문에
server component 함수 안에서 fetch() 쓸 일이 있을 경우 그거 그대로 쓰는게 좋습니다.
지금의 client component 에선 라이브러리 설치하든 뭐하든 편한거 아무거나 대충 써도 됩니다.

### 1004

애니메이션 어떻게 줌?
css에서 애니메 동작 전, 후 스타일만 생각하고 작성하면된다.

-지금까지 서버에 데이터를 보내는 방법으로,
-fetch에서 body에 담는법, -<form>태그에서 <input>에 넣어 보내는법을 알아봤다.

### 1022

**_기능구현 다 했다면 언제나 그 다음에 할 일은 성능향상입니다.2개의 rendering 방법과 캐싱기능에 대해 알아봅시다._**

우선 Next.js로 만든 서버를 어디 배포하려면 터미널 열어서 npm run build를 먼저 해야합니다.
이상한 리액트 문법으로 작성한 코드들을 브라우저 친화적인 html, js, css 파일로 바꿔주는 작업입니다.
그 다음에 npm run start 해두면 실제로 유저 요청을 처리할 수 있는 Next.js 서버가 완성됩니다.(개발 서버 아니고 실제 서버 띄워줌.)
물론 실제 운영할 사이트면 AWS같은 클라우드에 올려서 npm run start 해놓으면 되는데 그건 나중에 해봅시다.

run build를 하고나면 라우팅 된 페이지들을 보여주는데(이름과 사이즈 등을 알려줌), O는 static rendering(default) 해주겠다라는 의미이다.(npm run build 할 때 만든 html페이지 그대로 유저에게 보여줌). λ(람다)는 dynamic rendering 해주겠다는 의미이다. next에서 단순하게 page를 만들면 단순하게 static rendering 해준다.

static rendering 단순한 기능. 미리페이지 완성본 만들어놨기 때문에 전송 빠름.
dynamic rendering 유저가 페이지에 접속할떄마다 html 새로 만들어서 보내줌. npm run build 할때 만든건 버리고 새로 만들어줌.두개 방식의 구분은 자동으로 됨. fetch, useSearchParams(), cookies(), headers() [dynamic route] 페이지에서 사용시 자동으로 dynamic rendering 해줌.

근데 간혹가다가 이상하게 작업된 페이지들이 있음. (예를 들어 DB에서 게시글 가져와하는 list는 static으로 되어있음. 매번 html을 새로 해줘야하는데도..) 그렇기 때문에 npm run build 과정이 중요하다. 단적인 예로 개발 서버 말고 npm run start 한 서버에서 글을 작성해보면 static rendering이 된 html을 가지고 있기 때문에 list에 새로운 글이 반영되지 않는다. 그롷다면 list 페이지를 dynamic rendering으로 만들어보자.

list 페이지에서 export const dynamic = "force-dynamic"; 하면+

force-dynamic' 넣으면 dynamic rendering을 해주고
'force-static' 넣으면 static rendering을 해줍니다.
**_ 작성한 다음엔 꼭\* npm run build 과정을 거쳐주길 바람. _**

하지만 dynamic rendering도 항상 html을 다시 그려야하기 때문에 유저가 많으면 서버나 DB무리가 갈 수도 있기 때문에 그럴때에는 '캐싱' 해줄 수 있따. 데이터를(완성본) 잠깐 몰래 저장해두고, 재사용 하는 것이다. 이런식으로 캐싱하면 서버의 부담이 덜 해질 수 있다..

캐싱기능
예를 들어 GET 요청 결과 같은 것을 잠깐 저장해두고 재사용이 가능하다.

```
export default async function 페이지(){
let result = await fetch('/api/어쩌구', { cache: 'force-cache' })
}
```

fetch() 사용시 cache: 'force-cache' 설정을 넣어두면 캐싱해주고 앞으로 /URL로 요청할 때 마다 계속 캐싱된 결과를 가져와줍니다. 사이트 다시 npm run build 하기 전 까지 캐싱된걸 평생 보여줌

(참고) 실은 { cache: 'force-cache' } 이거 안적어도 디폴트값은 cache: 'force-cache' 로 설정되어있습니다.

이런식으로 저장하면 결과를 몰래 저장해두고 서버 요청이 있을 때마다 그것을 사용한다. 실시간 데이터가 중요하다면 { cache: 'no-store' }를 사용해서 늘 새로운 요청을 보낼 수 있다.

또한 1초 단위 수준으로 데이터 요청이 필요없는 페이지들은 fetch('/URL', { next: { revalidate: 60 } }) 과 같이 사용해서(초단위 기입) 지정된 시간마다 캐싱할 수 있다.

DB의 출력 결과를 캐싱 가능한가? 가능하다.

1. db에서 데이터를 가져오는 코드를 서버 API로 돌려두고 fetch에서 그 서버 API로 요청하면 된다.

2. 두번째 방법은 페이지 단위로 캐싱가능하다. export const revalidate
   = 60; 과 같이 작성하면 된다. 예전 next에서는 ISR이라고 불렸따. (list2 페이지 참고)

\*\*캐싱결과를 확인하기 위해선 반드시 개발서버(npm run dev)가 아니라 실제서버(npm run build/npm run start) 띄워야합니다!

### 1024

게시물을 '로그인 한 사람' 만 볼 수 있게? => 회원기능이 필요

1. 유저 -> id/pw -> DB 에 보내고,
2. 그 이후에 중간에 있는 서버는 DB에 있는 id/pw와 일치하는지 비교 작업을 진행하게 됨. 그리고 유저에게 입장권을 주게됨. (입장권은 유저자료가 써있는 간단한 문자자료, 누구고, 언제 로그인했고.. 등등)
3. 서버에 GET/POST 요청시, 그 입장권을 함께 보여준 뒤 이상이 없으면 게시물 데이터를 보내주는게 회원기능의 방식이다.

브라우저 쿠키저장소(Cookies)에 저장된 문자열들이 바로 입장권들을 몰래 저장시킨다.

**입장권을 만드는 방법은 여기서 택1 하십시오.**

1. session 방식: session id만 달랑 적혀있다. 유저가 로그인을 완료하면 DB에 아이디/로그인날짜/유효기간/ session id를 기록하는데, 유저한테 입장권을 발급해줄때, 세션id만 달랑보내줌. 그래서 확인할때에도 DB에서도 간단하게 session id만 대조해본다.
   장점: 유저의 get/post 요청마다 로그인상태 체크가능
   단점: DB짱이 힘들어함 -> redis같은 session 보관에 특화된 DB써도 좋습니다.

2. token 방식: 거의다 JWT이다. 일단 유저가 로그인을 성공하면 유저한테 입장권을 주는데, 입장권에 아이디,로그인날짜,유효기간 등을 '암호화'해서 보낸다. 유저가 다시 get/post등을 요청하면 입장권을 까보고 이거 보고 별 이상없으면 통과시켜줌. 간단한 토큰 방식.. 보안상 허술하거나 이상해보이겠지만, 암호화되기 때문에 짧은 문자열이 변화해도 위조가 드러나기 때문에 괜찮다.
   장점: DB조회를 안하기(엄밀히 말하면 안해도 되기) 떄문에, 유저 많거나 마이크로 서비스 운영중이면 편하다.
   단점: 나쁜놈이 훔쳐가면 그 사람이 로그인하는걸 막을 수 없다. 다른 컴퓨터 로그아웃 거의 불가능..

OAuth의 개념
:유저의 특정사이트 사용권한, 정보빌리기 / 로그인할 떄에 많이 쓰이는 개념이다. 사용권한이나 정보를 빌리는 과정에서의 규칙 같은 것인데, 입장권 개념이 아니고 유저가 A사이트에 입장하면 사용권한이 있다고 하자 , 그 사용권한을 B사이트를 운영하는 누군가가 유저대신 A사이트의 권한을 빌릴 수 있다. 동의 절차가 지나면 A사이트는 유저 정보들을 제공한다.. 이것을 잘 이용하면 A사이트의 회원정보를 B사이트에서 사용할 수 있는 것.. 회원가입시 사용하는 것 --> 우리가 잘아는 소셜로그인(네이버,카카오,구글 등)

Next.js는 NextAuth.js 와 Auth.js 가 있어서 라이브러리 설치하고 코드 복붙하면 끝임. 소셜로그인, 아이디/비번 로그인 전부 구현 가능합니다. JWT, session 방식 구현도 가능합니다. DB adapter 기능을 이용하면 DB에 session을 저장해두고 유저 관리도 가능합니다.

단점은 id/pw 방식 사용시 tokken 방식(JWT)만 써야됨. 이는 개발자가 직접 id/pw 취급하면 보안이슈가 있어서 ... 어쩌고 session 금지당했음.

### 1024

OAuth로 소셜로그인 만들기! : 아이디/비번관리 필요없음. 그럼 단순하게 생각해보자.. 깃헙한테 로그인해서 허락을 받아야하겠지요? 깃헙 setting - OAuth 들어가서 app하나 만들어보자.. (URL만 안겹치게 다른 app하고..)

1. 깃헙에서 비밀번호까지 세팅하고, npm i next-auth를 해준다.
2. pages/api/auth 폴더생성. [...nextauth].js 파일생성

로그인 버튼은 useclient로 따로 작성해주고, signIn() 함수를 끌어다 쓰면 기능 끝이다.
로그인하고나면, 로그인 유저정보 출력을 위해선 서버컴포넌트, 서버기능 안에서 getServerSession()을 통해 볼 수 있다. 대충 변수에 담아서 찎어보면 name,email,image등이 나오네요. 알아서 활용하면 됩니다.

### 1026

기본적으로 next-auth는 JWT 방식으로 동작을함.(토근) 로그인하면 JWT입장권을 만들어서 유저한테 보내주고, JWT까보고 별이상 없으면 입장시켜줌. 로그인 구현은 쉽지만, 이 방식이 싫다면,
DB adapter을 켜놓으면 session을 사용해서 유저를 관리하는데, 첫로그인시 자동회원가입. DB에 보관한다. 그래서 로그인된 유저정보가 필요하면 DB에서 조회해본다.. `npm install @next-auth/mongodb-adapter` 안되면 npm unistall mongodb -> npm i mongodb@4 하고 다시 설치.
다됐으면 [...nextauth].js 의 providers에 adpter: MongoDBAdapter(connectDB), 항복을 import하고 추가해준다.

다른 DB쓰려면 다른 db adapter 세팅해주면됨. 예를들어 redis는 데이터 저장을 하드가 아니라 램에 저장해주기 때문에 session 방식을 구현할때 즐겨쓴다고 한다.

아무튼 어댑터 설정하고 로그인을 하면, db를 확인해보자. accounts, sessiopns, users등.. 첨보는 컬렉션이 추가되어있을것이다.(아마도 test라는 곳에 생김)

1. sessions: 현재 로그인된 유저 세션정보 저장용. 유저 한명이 로그인 할때마다 해당 컬렉션에 도큐먼트가 하나씩 발행된다. 세션토큰, 아이디, expires도 있다 임의로 수정 삭제도 가능하다.
2. users: 가입된 유저들 정보.
3. accounts: 유저의 계정정보가 들어가있음. 2번과 3번은 하나의 유저가 여러가지 계정을 가지고 있을 수 있기 때문.. github+google 등.. users도큐먼트에는 한사람의 정보만 있고, accounts는 다수의 계정을 가지고 있을 경우 여러개가 생긴다. email이 같으면 같은 유저로 간주함..

다른 database에 유저정보 저장하려면. database.js 안의 url. ...mongodb.net/?...을 ...mongodb.net/forum?... 처럼 지정해주면 된다.

그렇다면 본인이 쓴 글만 수정/삭제하려면? 삭제기능을 업그레이드하면됨.
기존: 누가 삭제 api 요청하면 '그냥' 삭제새버림 => 업그레이드: 요청자 == 글쓴이 일치하면 삭제해주는 식으로 수정.. 그러기 위해선 **글을 작성할때마다 어떤유저가 작성하는지.. 이메일이나 id등을 함께 글작성 기능에 넣어주자.**

이런식이면 될거같은데요?
post/new.js

```let session = await getServerSession(요청, 응답, authOptions);
  if (session) {
    요청.body.author = session.user.email;
  }
```

### 1029

소셜로그인말고 (OAuth) 전통적 방식의 id/pw를 사용하고 싶으신가요?
-> CredentialsProvier() 을 추가해보십시오.

그전에, 회원가입 기능을 상상해보자.

1. 회원가입 페이지 생성 (form관련 ui등)
2. 서버는 가입요청을 받고 DB에 저장하도록 기능만들면 될듯요

애당 서버기능으로 DB에 저장을 완료했다면(이메일 중복검사, 비번 유효성 검사등도 필요), next-auth 에서 인식가능하도록 credentials provier를 설정하면 됩니다.

### 1104

JWT(토큰) 방식을 사용할시 하나의 입정권을 주고 그걸 계속 사용하게 하는데, 고객정보, 유효기간 등이 들어 있기 때문에 그것을 통해 누구인지 , 이메일이 무엇인지 쉽게 알 수 있음.
근데 유효기간을 이를테면 1년.. 길게 설정하면 탈취 당했을때 해당 기간동안 대응을 할 수가 없음.
그래서 보통 입장권 expires는 30분등 짧게 유지하는 경우가 많음. 그럴 경우 유저에게 유효기간이 지날때마다 재로그인을 요구하기는 번거로우니 유효시간이 지나면 새로운 입장권을 자동으로 발급해주는 식으로 코드를 짬. (refresh token)

(case 1)
유저 : "서버야 내 입장권 유효기간 지났어 새로 하나 줘"
서버 : "그래 입장권 보낸다"
이래도 될 거 같은데 그럼 입장권이 도난당할시 그 유저는 계속 사이트 이용권한을 가지게 되어 위험할 수 있습니다.

(case 2)
유저 : "서버야 내 입장권 유효기간 지났어 재발급용 token 보낼테니 입장권 새로 하나 줘"
서버 : "그래 재발급용 token 니꺼맞나 DB에서 확인해보고 입장권 보낸다"

이게 더 안전합니다.

입장권용 token을 멋진 말로 access token
재발급용 token을 멋진 말로 refresh token

Q. refresh token도 도둑맞으면 똑같은거 아녀요?
실은 rftk도 쿠기 같은 곳에 유저에게 보관하도록 하기 때문에 도난이 쉬움. 근데 rftk 을 DB에도 저장해 놓기 때문에 서버측에서 비교대조해서 도난 당했는지 대응할 수 있음. (IP감지하거나, 이미 사용한 rftk인지 확인해서)

Q. DB를 조회하는 일이 생기면, 그건 session방식이랑 똑같아지는게 아녀요?
실은 맞습니다만, 세션보다 조희를 덜 하게됩니다. refresh token 사용할 때만 DB 조회해보면 되니까요.

github oauth 에서 제공하는 refresh token 사용법

(/pages/api/auth/[...nextauth].js)

(import 어쩌구 생략)

export const authOptions = {
providers: [
GithubProvider({
clientId: 'Github에서 발급받은ID',
clientSecret: 'Github에서 발급받은Secret',
}),
],

//기간설정은 무시됨, github은 access token 유효기간 8시간, refresh token 유효기간 6개월
jwt : {
maxAge: 60,
},
callbacks: {
// JWT 사용할 때마다 실행됨, return 오른쪽에 뭐 적으면 그걸 JWT로 만들어서 유저에게 보내줌
async jwt({ token, account, user }) {
console.log('account', account);
console.log('user', user);
console.log('token', token);

      // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          user,
        }
      }

      // 2. 남은 시간이 임박한 경우 access token 재발급하기
      // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
      let 남은시간 = token.accessTokenExpires - Math.round(Date.now() / 1000)
      if (남은시간 < (60 * 60 * 8 - 10) ) {
        console.log('유효기간 얼마안남음')
        let 새로운JWT = await refreshAccessToken(token) // 3. 깃헙에게 재발급해달라고 조르기
        console.log('새로운 JWT : ', 새로운JWT)
        return 새로운JWT
      } else {
        return token
      }
    },

    //getServerSession 실행시 토큰에 있던 어떤 정보 뽑아서 컴포넌트로 보내줄지 결정가능
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.accessTokenExpires = token.accessTokenExpires
      session.error = token.error
      return session
    },

},
secret : 'password1234',
}
export default NextAuth(authOptions)

### 1106

Client-side rendering 을 이용해서 db에 자료를 저장해보자.
input에서 전송을하고, 새로고침 없이 html을 유저브라우저에서 실시간으로 생성하는걸, csr(Client-side rendering)이라고한다.

새로고침 없이? -> client component로 ajax(fetch)사용해보자.

input에 있는 데이터를 다루려면, form을 통해서 보내면 되는데, 새로고침이 되기 때문에 리액트에서 input만 사용해서 전송하려면 state에 저장해두고 씁니다.

직접 db에 넣는 방식: 댓글이 많아지면?
db도 속성안에 많은 값이 있으면 수정삭제 힘듬. 또한
document 하나는 약 8mb의 데이터까지 저장가능하다.
그럼 댓글 하나하나를 개별 collection을 생성해서 저장하면? -> 문제없습니다. -> 하지만 부모글의 id를 포함시켜서(종속관계는 필수) 어떤 글에 달린 댓글인지 파악을 할 수 있또록 합시다.
결론은 DB에 저장하는 방식이 맞는지 의문이 든다면, 나중에 수정,삭제,출력이 쉬우면 잘 한것입니다.

\*\* 보통 db에서 게시물을 가져와서 '상위 서버컴포넌트'에서 '하위 클라이언트 컴포넌트'에 렌터링하는 방식이있다. 두번째는 client component에서 직접 db에서 직접 데이터를 가져오는 방법이 있다.

하지만 client component에서는 DB출력문법 작성은 불가하며, 서버에게 DB출력결과 달라고 부탁(get)은 가능하다. 이런경우(csr), 검색노출은 어렵지만, 클라이언트의 장점인 댓글 html부분을 새로고침없이(ajax) 부드럽고 예쁘게 생성, 수정, 삭제 가능
/client component에서 서버에게 DB요청을 할때에는 일반적으로 useEffect안에 콜백으로 작성한다. 보통 여기안에 타이머, ajax등 넣음. useEffect 특징 2개는

1. html로드/리렌더링시마다 실행됨. 의존성 배열로 해결.
2. html이 전부 렌더링 된다음 늦게 실행됨. -> 아니 근데 fetch요청을 그안에 넣으면 fetch로 서버데이터 받아오는 동안 보여줘야할 html이 비어버리는게 아니에요? (상식적으로) -> 그럼 뭔가 보여준다음 (눈속임 로딩) -> 다 받고나서 보여주면 됨.

Q. ajax 요청결과를 바로 html에 꽂아넣을 순 없나요?

- 그런문법 없습니다. 근데 변수에 있던건 html에 꽂아넣을 수 있음

### 1113

-ssr의 단점은 페이지 이동시 새로고침이 됨.
Next.js에선 페이지 이동해도 새로고침이 잘 안됩니다.

<Link> 등으로 페이지 이동시 새로고침이 아니라 꼭 필요한 부분만 바뀌도록 셋팅되어있어서 앱처럼 부드럽고 이쁜 느낌을 줄 수 있습니다.
근데 뭘 어떻게 쓰든 페이지가 크거나 인터넷이 느리면 페이지 이동시 1~2초의 딜레이가 생기기 마련인데 대기시간 동안은 아무반응없는 느낌을 주면 유저들이 싫어할 수 있습니다. 원래 클릭 후 0.x초 내에 아무반응이 없으면 유저들은 불쾌함을 느낌 그게 싫으면 ***로딩중 UI*** 를 만들어두면 됩니다.

유틸성 페이지 3개

<!-- ?loading.js -->

loading.js를 만들어두면 'page.js'가 로딩중일때, loading.js를 보여줌.
로딩중 UI는 -모든 page.js 옆에 loading.js 생성가능 (Suspense fallback={UI} 과 같은 역할)
-client component 가능

<!-- ?error.js -->

error.js를 만들어두면 'page.js'가 로딩중일때, error .js를 보여줌.
서버가 죽거나, DB에서 이상한 이유로 데이터를 못가져오거나 그런 경우에 에러가 발생할텐데 그 경우 여러분이 직접 if문으로, try catch 문법으로 처리해도 되겠지만 그게 귀찮으면 error.js 파일 만들어둬도 됩니다. (이 친구는 무조건 use client선언 필요)

그럼 page.js에서 에러날 경우 error.js 내용을 옆의 page.js 대신 보여줍니다.

<!-- ?not-found.js -->

이 세가지 파일의 특징은 같은 폴더안에 없으면 끝까지 상위추적하니 최상위 폴더에도 app폴더에 놓아도 됨. 최상위 layout.js의 로딩,에러,notfound는 추가하고 싶으면 더 상위에 추가해야됨.

### 1120

최종 작업을 끝내면
`npm run build` 및 `npm run start`로 서버를 띄울 수 있는데, 이러면 단순히 우리 컴퓨터에서 서버를 운영하는 것이다. 컴퓨터를 틀어놓을 순 없으니, 안전한 클라우드 서비스로 컴퓨터를 빌려 AWS를 알아보자.

실은 AWS에는 EC2 상품이 가장 유명한데 그냥 컴퓨터 한대를 빌리는 상품입니다. 하지만 숙련자가 아니면 거기에 서버 띄우고 그런 짓거리하는게 매우 오래걸리고
나중에 일생겼을 때에도 해결이 어렵습니다.

그래서 보통 편하게 하려면 `AWS Elastic Beanstalk` 상품 사용하면 됩니다.

얘는 코드만 올리면 지가 알아서 자동으로 EC2 인스턴스 빌려서 npm install 눌러주고 npm run start 눌러주고 무료 도메인도 하나 연결해주고 유저 많아지면 확장도 쉽게 가능하고 아마 버전관리도 해줍니다. 여러분은 그냥 코드 업로드밖에 신경쓸게 없습니다. 가격도 거의 차이없음

**_아니면 Vercel_**

실은 Next.js는 Vercel 이런거 이용해도 배포가 매우 쉽습니다. 왜냐면 Next.js를 Vercel이 만들고 관리해서 그렇습니다. Github repo에 코드 올릴 때 마다 그걸 자동으로 Elastic Beanstalk 스럽게 배포해주는 식으로 동작합니다.

- 그래서 포트폴리오 용으로는 가장 편리하고 괜찮습니다. vercel.com 들어가서 그대로 따라하면 되는거라 튜토리얼 그딴거 필요없음

**_배포전 체크사항_**
AWS 컴퓨터도 MongoDB에 접속을 해야 데이터를 꺼내든말든 할 것 아닙니까
mongodb.com 들어가서 좌측 Network access 메뉴에서 접속가능 IP를 0.0.0.0 으로 (모두접속가능하게) 바꿔줍시다. 더 안전하게 하고 싶으면 나중에 AWS VPC로 mongodb atlas 연결하는 법 같은걸 찾아서 적용해줍시다.

1. 터미널 열어 `npm run build`

2. 배포하려면zip 파일로 압축합니다
   프로젝트 폴더안에 있는 모든 내용을 .zip 파일로 압축합니다.

- node_modules 폴더는 넣지마쇼
- .next 폴더는 꼭 넣으쇼

3. AWS 로그인하고 카드등록하고

- 카드등록까지 해야 1년 AWS 똥컴 무료이용권을 주기 때문에 카드등록 하면 되고
- 로그인하면 우측 상단에 지역선택을 할 수 있는데 사이트를 서울에서 운영할거면 '서울'로 들어옵시다.

4. AWS 사이트 상단 검색창에 IAM 검색해서 들어갑시다
   좌측 메뉴의 역할 눌렀을 때
   aws-elasticbeanstalk-ec2-role 역할 이름이 없으면 역할 만들기 누릅니다.
   elastic beanstalk이 ec2 맘대로 사용할 수 있게 만드는 부분임

(1단계) 신뢰할 수 있는 엔터티는 AWS 서비스, 사용사례는 EC2 선택
(2단계) 권한추가메뉴에선

AWSElasticBeanstalkWebTier
AWSElasticBeanstalkWorkerTier
AWSElasticBeanstalkMulticontainerDocker

3개 찾아서 체크마크

(3단계) 이름 지정부분은 aws-elasticbeanstalk-ec2-role 기입하고 끝냅시다.
실은 Elastic beanstalk 처음 만들 때 IAM 설정은 알아서 해주는데
지금은 버그때문에 쓸데없이 직접 해줘야함

5. Elastic beanstalk

- 상단 검색창에 Elastic beanstalk 검색해서 들어갑시다.
  그럼 앱생성이나 환경생성 버튼 어딘가에 있을텐데 그거 눌러서 진행합시다.

...

-이미지는 DB에 저장? 해도 되지만 하드 디스크에 저장하는 편이 나음.

Vercel 호스팅 중이거나 AWS에서 인스턴스 여러개 사용중이라면 하드빌려주는 클라우드 서비스 AWS S3 라는게 대표적. (5GB까지 무료)

요즘은 Presigned URL 으로 서버를 거치지 않고 S3로 바로 업로드하기도 함니다. (대충 서버에게 이미지 업로드 하겠다고 요청하면 한정된 시간동안만 유효하는 Presigned URL을 주고, 그것을 이용해서 S3에 바로 업로드.)

유저가 업로드할 이미지를 하나 고르면 그걸 유저에게 미리 보여줘야하지 않겠습니까

createObjectURL 같은걸 써도 보여줄 수 있는데

근데 보통은 편하게하려면 유저가 이미지를 <input type="file">에서 고르는 순간 그냥 S3에 집어넣으면 됩니다.

그리고 집어넣은 후에 이미지 URL을 <img src=" "> 안에 넣으면 이미지를 보여줄 수 있습니다.

예전엔 직접 서버에서 이미지를 업로드하는 식으로 코드를 짰다면 요새 S3에서는 Presigned URL 이라는 방식으로 이미지를 업로드합니다. Presigned URL을 가진 모든 유저는 브라우저에서 서버안거치고 직접 S3에 업로드가 가능한데 그러면 서버부담이 덜해져서 좋으니 그렇게 쓰는 것이고 어떤 식인지 구체적으로 설명해보면

1. 글작성 페이지의 <input>에서 유저가 이미지 고르는 순간 서버에게 GET요청을 합니다. 심심하니까 이미지 이름도 같이 보내줌

2. 그럼 서버는 괜찮은 유저인지 이거저거 검사해보고 Presigned URL을 만들어서 유저 브라우저로 보내줌

3. 유저는 브라우저에서 Presigned URL을 이용해서 S3로 POST요청해서 바로 이미지를 보냅니다.

4. 업로드 성공시 업로드된 이미지의 URL을 <img src=" ">에 박아서 이미지 업로드된걸 보여줌

이런 식으로 개발합니다.

`npm install aws-sdk ` 설치해서 AWS 다룰수 있는 라이브러리 설치하고 사용.
키와 관련된건 .env 파일로 분리해서 사용. (변수담는 파일)

```
(/write/page.js)

'use client'
export default function Write(){
  return (
    <div className="p-20">
      <h4>글작성</h4>
        <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목"/>
        <input name="content" placeholder="글내용"/>
        <button type="submit">전송</button>
      </form>

      <input type="file" accept="image/*" onChange={
        async (e)=>{
//api/post/image로 쿼리와 함께 자료전송
          let file = e.target.files[0]
          let filename = encodeURIComponent(file.name)
          let res = await fetch('/api/post/image?file=' + filename)
          res = await res.json()

//S3로 formData 업로드
          const formData = new FormData()
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value)
          })
          let 업로드결과 = await fetch(res.url, {
            method: 'POST',
            body: formData,
          })
          console.log(업로드결과)

          if (업로드결과.ok) {
            setSrc(업로드결과.url + '/' + filename)
          } else {
            console.log('실패')
          }
        }
      } />
      <img />

    </div>
  )
}
```

```
.env(루트경로)
ACCESS_KEY=액세스키어쩌구
SECRET_KEY=액세스키시크릿
BUCKET_NAME=님들버킷명
```

```

//서버에게 Presinged URL요청
(/api/post/image.js)

import aws from 'aws-sdk'
export default async function handler(요청, 응답){
    aws.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: 'ap-northeast-2',
      signatureVersion: 'v4',
    })

    const s3 = new aws.S3();
    const url = await s3.createPresignedPost({
      Bucket: process.env.BUCKET_NAME,
      Fields: { key : 요청.query.file },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 1048576], //파일용량 1MB 까지 제한
      ],
    })

    응답.status(200).json(url)
}
```

결과적으로 input 태그에서 onChange 안에서 fetch통해 서버로 Presinged URL요청. 요청 을 보내면 result로 반환되는 값이 이미지가 포함된 '링크'를 보내줌.(s3가 보내주는 자료임) 그 이미지 링크 자료를 formdata에 담아 post요청하면 끝. formDta는 가상의 form임. form태그랑 같은 기능을함. append에 여러가지 데이터를 담아서 http요청.
이 url자료를 html태그에서 보여줄거면 직접 넣을 순 없고, state에 담아서 쓰든지 하십소. 풀 url은 filename까지 더해주면 완전하게 완성될 것임. 엄격하게 할거면 result 업로드결과.ok 체크하고 넘어가면 좋겠죠.

상세페이지에서도 글과 함께 이미지를 db로 보내면 될것같습니다.

Q. 유저가 글발행 안하고 뒤로가기 누르면 S3 저장용량 낭비아님?

- 지금은 선택과 동시에 이미지를 업로드하고 있는데 글발행 누르면 이미지 업로드시키면 되겠군요.
  업로드 전에 유저가 선택한 이미지 보여주려면 createObjectURL을 씁시다.

###1204
리액트에서 다크모드를 고려할때에는, state값으로 다크모드를 조절해야할텐데, state는 새로고침하면 값을 잃어버리기 때문에, state보단 다크모드 여부를 DB 혹은 브라우저(localstorage/cookie등) 저장하면 될듯? => 페이지 접속시 브라우저에서 '다크모드 여부'를 꺼냄 => '다크'인 경우 스타일 값이 변화하도록 class를 추가하면 되겠죠.

방법1. 로컬스토리지
그중 로컬스토리지는 반영구적으로 사용할 수 있고, json형태 사용가능, db대용으로 쓸 수 있다. 세션스토리지는 브라우저 끄면 '날라감'. 두개 문법은 이름만 바꾸면 동일하게 사용가능. 저장, 가져오기, 제거 등..

```
localStorage.setItem('자료이름', '값')
localStorage.getItem('자료이름')
localStorage.removeItem('자료이름')
```

얘도 자바스크립트 코드이기 때문에 client component에서만 사용가능함. 다만 사용시 if (typeof window != 'undefined') 으로 체크한 다음 사용해줘야합니다. client component도 최대한 서버에서 미리 실행할거 실행하고 html도 렌더링해서 보내주려고 하는데 서버측에서 localStorage 문법을 발견하면 실행이 안되니 에러가 나서 그렇습니다.
_브라우저 공간에서는 window 라는 놈이 있기 때문._

```
'use client'

function 컴포넌트(){

  useEffect(()=>{ //브라우저인지 서버인지 판단하는 조건문
      if (typeof window != 'undefined') {
        let res = localStorage.setItem('이름', 'kim')
      }
  },[])

  return (생략)
}
```

그래서

1. 현재 다크모드인지 라이트모드인지 상태를 localStorage에 저장해두고
2. localStorage 안에 있던 내용이 다크면 까매지는 class 부착하라고 코드짜놓기
   하면 되는데 심각한 단점이 하나 있습니다.

useEffect에 넣어서 사용해야하는데 _useEffect는 html 보여준 다음에 실행되는게 문제입니다._ 아마 그래서 위처럼 코드짜면 localStorage에 '다크' 를 저장해놨다고 해도 라이트모드부터 보여주고 1초 후에 다크모드가 될듯요.

방법2.
Cookie는 브라우저에 저장해둘 수 있는 짧은 문자열이고

- 사이트 하나 당 최대 50개, 총합 4kb까지의 문자데이터를 저장할 수 있습니다.
  (요즘 브라우저들은 이걸 초과해서 저장해도 봐줌)
- 특이하게 유효기간을 설정해줄 수 있습니다. 유효기간 지나면 자동으로 삭제됨.
- 서버로 GET, POST 등 요청시 자동으로 서버로 전달됩니다.

다루는 방법은.. 쿠키 발행은 이렇게 합니다.
documnet.cookie = '쿠키이름=값'

유효기간 설정..
documnet.cookie = '쿠키이름=값; max-age=3600;' (초단위)
참고로 쿠키도 브라우저를 끄면 자동으로 사라짐.
근데 진짜 중요한 점은... (중요) _쿠피는 서버컴포넌트에서 출력이 가능하다._ 그러므로 로컬스토리지의 문제를 피해서 다크모드를 쿠키에서 쓰면 좋을듯하다.

Cookie의 단점은

단순 문자열만 저장할 수 있다보니까 너무 길고 복잡한 데이터는 보관하기 불편할 수 있고 항상 GET, POST 요청마다 전달되니 쓸데없는 네트워크 호스팅 비용도 늘어나는게 단점입니다. 하지만 지금은 문자 몇개 전달하는 수준이라 그런건 딱히 부담없습니다.

오늘의 결론:
-js잘해야 next도 잘함.
-state나 변수를 영구보관하고 싶으면 db에 넣어두는데 사소하고 귀찮은 것들은 localStorage 또는 cookies 저장공간을 사용해도 반영구로 저장가능
