const List = () => {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  console.log(상품);
  return (
    <div>
      <h4 className="title">상품목록</h4>

      {상품.map((item, i) => {
        return (
          <div className="food">
            <h4>{상품[i]} $40</h4>
          </div>
        );
      })}
    </div>
  );
};

export default List;
