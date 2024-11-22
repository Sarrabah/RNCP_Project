import React, { createContext, useContext, useState } from 'react';
import { ProductInterface } from '../types/types';

export interface BasketContextInterface {
  basket: Array<{ product: ProductInterface; quantity: number }>;
  setBasket: React.Dispatch<
    React.SetStateAction<Array<{ product: ProductInterface; quantity: number }>>
  >;
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
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find(
        (item) => item.product.id === product.id,
      );
      if (existingProduct != undefined) {
        return prevBasket.map((item) => {
          return item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      } else {
        return [...prevBasket, { product, quantity }];
      }
    });
  };
  return (
    <BasketContext.Provider value={{ basket, setBasket, addToBasket }}>
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
