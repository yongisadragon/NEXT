import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  //await는 promise를 뱉는 코드에만 붙이기 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  console.log(result);
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
