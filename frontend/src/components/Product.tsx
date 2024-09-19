import React from 'react';
import '../styles/Homepage.css';

export interface ProductProps {
  id: number;
  image: string;
  name: string;
  price: string;
  category: string;
}

const Product: React.FC<ProductProps> = ({ image, name, price }) => {
  return (
    <div className="product">
      <img src={image} alt={name} className="Product-img" />
      <h3> {name} </h3>
      <p> {price} </p>
    </div>
  );
};
export default Product;
