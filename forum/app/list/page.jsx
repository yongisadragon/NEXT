import { connectDB } from "@/util/database";

export default async function List() {
  //await는 promise를 뱉는 코드에만 붙이기 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result);
  return (
    <div className="list-bg">
      {result?.map((item) => {
        return (
          <div className="list-item">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
