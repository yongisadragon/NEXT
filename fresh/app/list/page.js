"use client";

import { useState } from "react";

const List = () => {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  let [수량, 수량변경] = useState(0);
  console.log(상품);
  return (
    <div>
      <h4 className="title">상품목록</h4>

      {상품.map((item, i) => {
        return (
          <div className="food" key={i}>
            <img src={`food${i}.png`} alt="토마토" className="food-img" />
            <h4>{상품[i]} $40</h4>
            <span>{수량}</span>
            {/* next에선 아래와 같이 사용하면 에러남? WHT? client component 선언을 안해주면 js기능을 쓸 수 없음. */}
            <button
              onClick={() => {
                수량변경((prev) => prev + 1);
              }}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
