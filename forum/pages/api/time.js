export default function time(요청, 응답) {
  let time = new Date();
  // console.log(요청.method);
  return 응답.status(200).json(time.toLocaleString());
}
