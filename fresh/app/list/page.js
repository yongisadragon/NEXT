"use client";

import { useState } from "react";

const List = () => {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  let [수량, 수량변경] = useState([10, 20, 30]);
  console.log(상품);

  const increaseQuantity = (i) => {
    수량변경((prev) => {
      const copy2 = [...prev];
      copy2[i]++;
      return copy2;
    });
  };

  return (
    <div>
      <h4 className="title">상품목록</h4>

      <span>{수량[0]}</span>
      <button
        onClick={() => {
          // 어레이나 오브젝트 스테이트를 다룰때에는(불변 자료형은 괜찮음.), let copy = 수량 <= 이딴식으로하면 연산해보면 같다고 나옴.(화살표가 같기 때문) 그러므로 아예 독립적인 어레이 사본을 복사(깊은 복사, 다른 화살표 생성)해줘야함. 그때서야 리액트는 원본과 다른 값이 나타났으므로 렌더링을 도와줄 것이야.
          let copy = [...수량];
          copy[0]++;
          수량변경(copy);
        }}
      >
        +
      </button>

      {상품.map((item, i) => {
        return (
          <div className="food" key={i}>
            <img src={`food${i}.png`} alt="토마토" className="food-img" />
            <h4>{상품[i]} $40</h4>
            <span>{수량[i]}</span>
            {/* next에선 아래와 같이 사용하면 에러남? WHT? client component 선언을 안해주면 js기능을 쓸 수 없음. */}
            <button onClick={() => increaseQuantity(i)}>+</button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
