import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

// 페이지 단위를 20초 캐싱. 방문마다 새로 그려주는게 아니고 20초 동안은 캐싱된 데이터만 보여주기 때문에 실제로 글 발행해보면 list2 페이지에서는 조금의 간격을 두고 업데이트 될것이다.
export const revalidate = 20;

export default async function List() {
  //await는 promise를 뱉는 코드에만 붙이기 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  // console.log(result);
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
