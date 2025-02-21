export interface ProductInterface {
  id: number;
  image: string;
  name: string;
  category: string;
}

export interface ProductListInterface {
  products: ProductInterface[];
}
export interface QuoteRequestInterface {
  id: number;
  name: string;
  status: string;
  archi_id: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface BasketContextInterface {
  basket: Array<{ product: ProductInterface; quantity: number }>;
  setBasket: React.Dispatch<
    React.SetStateAction<Array<{ product: ProductInterface; quantity: number }>>
  >;
  addToBasket: (product: ProductInterface, quantity: number) => void;
}
