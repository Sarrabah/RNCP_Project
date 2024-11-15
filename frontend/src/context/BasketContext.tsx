import React, { createContext, useContext, useState } from 'react';
import { ProductInterface } from '../types/types';

export interface BasketContextInterface {
  basket: Array<{ product: ProductInterface; quantity: number }>;
  addToBasket: (product: ProductInterface, quantity: number) => void;
}

export const BasketContext = createContext<BasketContextInterface | undefined>(
  undefined,
);

const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<
    Array<{ product: ProductInterface; quantity: number }>
  >([]);

  const addToBasket = (product: ProductInterface, quantity: number) => {
    setBasket((prevBasket) => [...prevBasket, { product, quantity }]);
    console.log(basket);
  };
  return (
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
export const useBasketContext = () => {
  const context = useContext(BasketContext);
  console.log('context', context);
  if (context === undefined) {
    throw new Error('useBasketContext must be used within a BasketProvider');
  }
  return context;
};

export default BasketProvider;
