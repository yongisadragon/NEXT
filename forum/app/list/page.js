import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  //await는 promise를 뱉는 코드에만 붙이기 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result[0]);
  return (
    <div className="list-bg">
      {/* map 쓸떄에는 key속성 웬만하면 넣어주자. */}
      {result?.map((item, i) => {
        return (
          <div className="list-item" key={i}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            {/* Link태그에는 prefetch기능이 기본 탑재돼 있고, prefetch={false}를 통해 on/off 할 수 있다. prefetch란 '/어쩌구' 페이지를 자동으로 미리 로드해줍니다. 그럼 그 페이지 방문할 때 매우 빠르게 방문할 수 있습니다. 참고로 prefetch는 개방중일 때에는 확인 불가하며, 사이트 발행 후 확인가능 */}
            <Link prefetch={false} href={`detail/${item._id}`}>
              이동
            </Link>
            <DetailLink />
          </div>
        );
      })}
    </div>
  );
}
