"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Darkmode({ mode }) {
  let [isDark, setIsDark] = useState(false);
  let router = useRouter();
  // console.log(router);
  useEffect(() => {
    //이외에도 쿠키생성은 서버 API코드, Middleware등의 방법이 있음.

    if (mode == "") {
      //디폴트는 light모드로 설정
      document.cookie = `mode=light; max-age=${3600 * 24 * 400}`;
    }
  }, []);
  // console.log(mode);
  return (
    <span
      onClick={() => {
        setIsDark(!isDark);
        if (mode == "dark") {
          document.cookie = `mode=light; max-age=${3600 * 24 * 400}`;
          router.refresh();
        } else {
          document.cookie = `mode=dark; max-age=${3600 * 24 * 400}`;
          router.refresh();
        }
      }}>
      {isDark ? "☀️" : "🌙"}
    </span>
  );
}
