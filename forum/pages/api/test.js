export default function handler(요청, 응답) {
  //아무것도 입력하지 않으면 GET요청, 서버는 기능실행 후에 유저에게 응답을 해줘야 브라우저가 무한 대기하지 않음.
  //첫번째 파라미터는 요청,응답과 관련된 것, 두번째 파라미터는 응답을 도와줌.
  if (요청.method === "POST") {
    return 응답.status(200).json("처리완료"); // 응답해주고 싶으면 씁시다. 기능 처리성공시엔 ststus(200), 처리 실패시(유저잘못)엔 status(400)
  }
}
