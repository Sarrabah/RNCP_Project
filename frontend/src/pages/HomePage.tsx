import React from 'react';
import { ProductProps } from '../components/Product';
import ProductList from '../components/ProductList';
import bouton from '../assets/bouton.png';
import stopporte from '../assets/stop-porte.png';
import parquet from '../assets/parquet.png';
import robinet from '../assets/robinet.png';
import pied from '../assets/pied.png';
import poignées from '../assets/poignées.png';
import rampe from '../assets/rampe.png';
import cloche from '../assets/cloche.png';
import poignéesporte from '../assets/poignéesporte.png';
import tirant from '../assets/tirant.png';
import carrelage from '../assets/carrelage.png';
import carrelagec1 from '../assets/carrelagec1.png';
import carrelagec2 from '../assets/carrelagec2.png';
import ensemblemeublevasque from '../assets/ensemblemeublevasque.png';
import miroir from '../assets/miroir.png';
import vasque from '../assets/vasque.png';
import '../styles/Homepage.css';
import { Link } from 'react-router-dom';

export const products: ProductProps[] = [
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
  {
    id: 5,
    image: pied,
    name: 'Leg',
    price: '15 Euro',
    category: 'Furniture',
  },
  {
    id: 6,
    image: poignées,
    name: 'Handles',
    price: '5 Euro',
    category: 'Furniture',
  },
  {
    id: 7,
    image: rampe,
    name: 'Rump',
    price: '46 Euro',
    category: 'Furniture',
  },
  {
    id: 8,
    image: cloche,
    name: 'Bell',
    price: '28 Euro',
    category: 'Door',
  },
  {
    id: 9,
    image: poignéesporte,
    name: 'Handles',
    price: '12 Euro',
    category: 'Door',
  },
  {
    id: 10,
    image: tirant,
    name: 'Door puller',
    price: '30 Euro',
    category: 'Door',
  },
  {
    id: 11,
    image: carrelage,
    name: 'Tiling',
    price: '50/m² Euro',
    category: 'Floor',
  },
  {
    id: 12,
    image: carrelagec1,
    name: 'Tiling',
    price: '46/m² Euro',
    category: 'Floor',
  },
  {
    id: 13,
    image: carrelagec2,
    name: 'Tiling',
    price: '27/m² Euro',
    category: 'Floor',
  },
  {
    id: 14,
    image: ensemblemeublevasque,
    name: 'vanity unit set',
    price: '248 Euro',
    category: 'Bathroom',
  },
  {
    id: 15,
    image: miroir,
    name: 'Mirror',
    price: '19 Euro',
    category: 'Bathroom',
  },
  {
    id: 16,
    image: vasque,
    name: 'Basin',
    price: '46 Euro',
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
            <h3 style={{ padding: '0.1%', fontSize: '30px' }}>{category}</h3>

            <div className="category-header">
              <Link
                style={{ fontSize: '16px', marginBottom: '15px' }}
                to={`/category/${category}`}
              >
                See More
              </Link>
            </div>

            <ProductList products={filteredProducts.slice(0, 3)} />
          </div>
        );
      })}
    </div>
  );
};
export default Homepage;
