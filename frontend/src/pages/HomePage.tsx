import React from 'react';
import { ProductProps } from '../components/Product';
import ProductList from '../components/ProductList';
import bouton from '../assets/bouton.png';
import stopporte from '../assets/stop-porte.png';
import parquet from '../assets/parquet.png';
import robinet from '../assets/robinet.png';

import '../styles/Homepage.css';
const products: ProductProps[] = [
  {
    id: 1,
    image: bouton,
    name: 'Button',
    price: '1.5 Euro',
    category: 'Furniture',
  },
  {
    id: 2,
    image: stopporte,
    name: 'Door stop',
    price: '3 Euro',
    category: 'Door',
  },
  {
    id: 3,
    image: parquet,
    name: 'Parquet',
    price: '100/m² Euro',
    category: 'Floor',
  },
  {
    id: 4,
    image: robinet,
    name: 'Faucet',
    price: '129 Euro',
    category: 'Bathroom',
  },
];
const categories: string[] = ['Furniture', 'Door', 'Floor', 'Bathroom'];
const Homepage: React.FC = () => {
  return (
    <div>
      <h2 className="title"> All our available products! </h2>
      {categories.map((category) => {
        const filteredProducts = products.filter(
          (product) => product.category === category,
        );
        return (
          <div key={category}>
            <h3>{category}</h3>
            <ProductList products={filteredProducts} />
          </div>
        );
      })}
    </div>
  );
};
export default Homepage;
