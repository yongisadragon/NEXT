import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function Home() {
  //참고로 이런 민감할 수 있는 코드는 server component에서만 쓰자. client component에서 쓰면 브라우저로 다 보내주기 때문에 안에 적은 코드는 유저들도 쉽게 볼 수 있기 때문에 그렇습니다.
  // const client = await connectDB
  const db = (await connectDB).db("forum");
  // post 컬렉션에 있는 모든 데이터를 가져와서 array로 변환해주세요.
  let result = await db.collection("post").find().toArray();
  console.log(result);
  return (
    <>
      <main>{result[0].title}</main>
      <h3>{result[0].content}</h3>
      <Link href="/list">List</Link>
    </>
  );
}
