import { age, name } from "./data.js";
const Cart = () => {
  let 장바구니 = ["Tomato", "Pasta"];
  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem />
      <CartItem />
      {/* props도 실은 파라미터랑 똑같은 문법입니다. 그래서 이런 식으로 응용도 가능한데 그래서 살짝씩 다른 디자인, 다른 내용의 컴포넌트가 필요할 때는 컴포넌트 여러개 만들 필요없이 props 문법을 잘 사용하면 됩니다. */}
      <Banner content="롯데카드" />
      <Banner content="현대카드" />
      <Banner content="삼성카드" />
    </div>
  );
};

function CartItem() {
  return (
    <div className="cart-item">
      <p>장바구니</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}

function Banner(props) {
  return <div>{props.content} 결제 행사중</div>;
}
export default Cart;
