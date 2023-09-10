export default function Write() {
  //기본적인 GET,POST요청은 form태그를 사용한다.
  return (
    <>
      <h4>글작성</h4>
      <form action="/api/test" method="POST">
        <button type="submit">보튼</button>
      </form>
    </>
  );
}
