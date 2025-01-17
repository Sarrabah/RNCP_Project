export interface ProductInterface {
  id: number;
  image: string;
  name: string;
  category: string;
}

export interface QuoteRecord {
  id: number;
  name: string;
  status: string;
  archi_id: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}
