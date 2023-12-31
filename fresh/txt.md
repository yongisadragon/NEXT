### 0723

next.js를 쓰는 이유를 알아보자.
넥스트는 풀스텍 프레임 워크임. 프런트 백엔드 전부 개발 가능함. 리액트 문법과 신기술을 도입해서 리액트 친화적임.
무엇보다 CSR->SSR 이 대세가 되어가면서

최근 몇년간 유행했던 Client-Side Rendering은 리액트 뷰같은 라이브러리를 써서 '유저 브라우저'에서 실시간으로 만들어줌. 페이지 전환이 앱같이 이쁘고 부드럽다. 하지만 구글 검색노출이 오래걸리고, 페이지 로딩속도가 떨어져 사이트 수익성에 매우 악영향임. 리액트 뷰를 쓰면 돈이 줄줄 세어나간다고.?
그래서 나온게 html을 서버에서 만드는걸 Server-Side Rendering(SSR)이라고함. 유저한테 js코드를 보낼 필요가 적고, html웹페이지를 서버에서 다 만들어서 보내주는 개념이기 때문에, 가볍고 검색 노출도 괜찮다. next.js에서는 원하는 페이지에서 선택적으로 CRS도 가능하기 때문에 안 쓸 이유가 없음.

물론 단점도 있는데

- 리액트 라이브러리의 신문법인 client component, server component를 도입해서 코드를 짜는데

그거 구분해서 코드짜는게 매우 귀찮고

- 많이 쓰진 않지만 WebSocket, WebRTC같은 기능을 이용해야한다면 직접 Nodejs + express 서버를 하나 더 만드는게 낫습니다.

프로젝트 파일 설명

- app 폴더 : 님들이 코드짤 폴더

- page.js : 메인페이지

- layout.js : 메인페이지 감싸는 용도의 페이지

- public 폴더 : 이미지나 static 파일 보관용

- api 폴더 : 서버기능 만드는 곳

- next.config.js : nextjs 설정 파일

- node_modules 폴더 : 설치한 라이브러리 보관용 폴더

- package.json : 설치한 라이브러리 버전 기록용 파일

- url로 페이지를 나누는 행위를 Routing이라고함.
- 참고로 REST API 원칙에 따르면 라우터 주소를 이쁘게 작성할 수 있다.
- next는 자동 라우팅 기능이 있다. next는 app하위에 폴더를 만들면 그게 곧 라우터 주소가 되며, 그 안의 page.js는 html가 된다.

- layout.js가 옆에 있는 경우, page.js는 layout.js에 담겨서 보여진다. 즉, layout.js에서 html태그안에 {children}이 page.js가 들어가는 부분이다.

- 세부적인 동작원리는

1. 옆에 layout.js가 있으면 그걸로 page.js를 싸맨다.
2. 상위폴더에 layout.js가 또 있다면 그걸로 1번 더 싸맨다.

즉 초기 세팅에 layout.js가 제일 최상단에 있기 때문에 폴더로 라우팅을 짜도, 저절로 layout.js에 있는 html구조로 감싸진다. ex)navbar. 결론은 page.js 보여줄 때는 옆에있는 것 우선, 그 다음은 상위로 추척하면서 모든 layout.js를 중첩해서 보여준다.

- 아무튼 결론: 페이지 변경과 상관없이 계속 보여줄 공통 UI는 layout.js 쓰면 편하겠죠.

* jsx에선 for문을 직접 못쓰므로, html반복하기 위핸 map()함수를 쓰자. Array.map((v,i)=>{ ~~~ }) 형식으로 쓰면 Array안에 있는 자료갯수만큼 똑같은 작용을 해준다.

* map(p1,p2) 안에 2개의 파라미터는 각각의 기능이 있다. 첫번째는 순서에 해당하는 값이, 두번째 파라미터는 index순서(0부터 1씩 증가)이다. 그리고 콜백 자리에 return을 담아 새로운 배열을 반환해줌.

* 이미지 최적화 방법은

1. lazy loading
2. 사이즈 최적화
3. layout shift방지(로딩이 늦게 돼서 레이아웃이 밀리는 현상)
   등이 있음.

- 하지만 next에서는 Image 라는 태그를 import해서 사용하면 자동으로 최적화를 해준다네! 단점이 있는데, src에 들어가는 이미지를 따로 import해서 네이밍한뒤 사용해야한다.
- 외부이미지 링크를 넣을때에도, width, height를 중괄호로 기입해서 넣어야한다. 뿐만 아니라, 사이트에 있는 이미지를 쓸때, config에 도메인, 경로 등록도 해야함. 대충 검색해서 알아보셈 이건. 최적화는 보통 다 만든 후에 하기 때문에 참고로 알아두자.

Lazy loading 기능만 원하면 다른 라이브러리 찾아봐도 된다.

실은 원래 최적화는 사이트 다 만들고나서 하는게 좋은 관습이기 때문에 지금은 참고로만 알아둬도 됩니다.

### 0801

길고 복잡한 html을 축약해서 -> component

컴포넌트끼리 데이터 공유가 귀찮기 때문에 지나치게 많이 만들면 안됨. 재사용이 잦은 html덩어리를 주로 컴포넌트화 함.

컴포넌트는 function으로 만들어 사용한다. function의 역할을 생각해보면 알 수 있는데, 더러운 코드 한 단어로 축약하거나 같은 코드 재사용하잖아요?

1. 더러운 코드 한 단어로 축약
2. 같은 코드 재사용
3. page.js 만들 때 (큰 페이지 만들때)

여기까진 react와 별반 다를게 없어 보인다.

### Next.js의 컴포넌트는 종류가 2개다!

1. server component
2. client component

일단 아무대서나 대충만드는 컴포넌트는 서버 컴포넌트이다. 하지만 'use client' 아래에 있는 것은 클라이언트 컴포넌트가된다.
server component의 특징으로 말하자면.. html부분(return이하) 동적으로 바꾸는 자바스크립트 코드들을 못넣음. 태그안에 onClick, useEffect, useState도 마찬가지. client component를 선언해줘야 일반적으로 리액트에서 쓰는 동적인 기능들을 쓸수가 있단다.

그럼 client가 일반적으로 개발하는데 더 편한거 아녀?!라고하면 맞는말이다. 하지만 server component의 장점을 살펴보자면..

- 로딩속도 빠름 (페이지로드에 필요한 js코드가 적기 때문)
- 검색엔진 노출 이점

반면 client component는

- 로딩속도 느림1 (자바스크립트 많이 필요)
- 로딩속도 느림2 (hydration 필요: html을 유저에게 보낸 후에 js로 html를 다시 읽고 분석하는 일)

결론: 큰 페이지에는 server component / JS기능 필요한 곳만 client component

분리된 파일에서 export/import 하는법
export default는 한개의 변수 혹은 함수만 내보낼 수 있음.
export {name, age} 등과 같이 중괄호로 묶어서 쓰면 여러개를 내보낼 수 있고, import 할때에도 import {name, age} 와 같이 중괄호로 묶어서 써야함.

### 0807

- state를 쓰면 장점이 뭘까?
  state는 보통 '자주 바뀌는 값'에 쓴다. state가 변경되면 state를 쓰는 html부분도 자동으로 리렌더링이 되는 것이다 (state장점). state가 아닌 일반 변수를 사용한다고 하면 리액트는 아무런 변화를 감지하지 못해서 리렌더링을 하지 않겠죠?

- set 함수는 괄호안에 넣는 것을 기존 state로 갈아치워준다. 그래서 +1 버튼을 만든다고 가정하면, setState(1)가 아니라, setState(state+1)로 만들어줘야함.

### 0811

state변경 함수를 변경할때에는 새state == 기존state 일 경우 변경 x 이므로 객체나 배열은 복사를 해서 사용해야한다. 배열이나 객체를 변수에 저장할때, 해당값을 가르키는 '화살표'만 저장되기 때문에, '일반적인' 할당이나 복사를 하면, 화살표만 복사가된다. 그러므로 완전 분리된 개별적인 복사를 하려면 스프레드 문법으로 복사를하자.

- 진짜 빡대가리식 설명

리액트에서 array/object로 되어있는 state를 수정하고 싶으면
독립적인 카피본을 만들어서 수정해야합니다.

[...기존state]

{...기존state}

이렇게 하면 독립적인 카피가 하나 생성됩니다.
문자나 숫자로 되어있는 state는(불변값) 굳이 그럴 필요 없습니다.
