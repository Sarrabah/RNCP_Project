import React, { createContext, useContext, useEffect, useState } from "react";
import { BasketContextInterface, ProductInterface } from "../types/types";

export const BasketContext = createContext<BasketContextInterface | undefined>(
  undefined,
);

const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  let basketdata = JSON.parse(localStorage.getItem("basket") || "[]");

  const [basket, setBasket] =
    useState<Array<{ product: ProductInterface; quantity: number }>>(
      basketdata,
    );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (product: ProductInterface, quantity: number) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find(
        (item) => item.product.id === product.id,
      );
      if (existingProduct !== undefined) {
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
  // console.log("context", context);
  if (context === undefined) {
    throw new Error("useBasketContext must be used within a BasketProvider");
  }
  return context;
};

export default BasketProvider;
