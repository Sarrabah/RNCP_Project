import React, { useEffect } from 'react';
import { useBasketContext } from '../context/BasketContext';

const Basket: React.FC = () => {
  const { basket } = useBasketContext();

  useEffect(() => {
    console.log(basket), [];
  });
  return (
    <div>
      <h1> Basket </h1>
      <div>
        {basket.map((item) => (
          <div key={item.product.id}>
            <div>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <h1> {item.product.name} </h1>
                <p> {item.product.price} </p>
              </div>
            </div>
            <div>
              <p> {item.quantity} </p>
            </div>
          </div>
        ))}
      </div>
      {basket.length > 0 ? (
        <div>
          <h1> Total </h1>
        </div>
      ) : (
        <h1> Your basket is empty!</h1>
      )}
    </div>
  );
};

export default Basket;
