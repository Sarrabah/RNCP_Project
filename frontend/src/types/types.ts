export interface ProductInterface {
  id: number;
  image: string;
  name: string;
  category: string;
}

export interface ProductListInterface {
  products: ProductInterface[];
}
export enum Statusenum {
  Created = "Created",
  Inprogress = "In progress",
  Finished = "Finished",
}
export interface QuoteRequestInterface {
  id: number;
  name: string;
  status: Statusenum;
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

export interface ProductDetails {
  product_name: string;
  product_image: string;
  quantity: number;
}
