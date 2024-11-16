import React from 'react';
import { ProductInterface } from '../types/types';
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

export const products: Array<ProductInterface> = [
  {
    id: 1,
    image: bouton,
    name: 'Button',
    category: 'furniture',
  },
  {
    id: 2,
    image: stopporte,
    name: 'Door stop',
    category: 'door',
  },
  {
    id: 3,
    image: parquet,
    name: 'Parquet',
    category: 'floor',
  },
  {
    id: 4,
    image: robinet,
    name: 'Faucet',
    category: 'bathroom',
  },
  {
    id: 5,
    image: pied,
    name: 'Leg',
    category: 'furniture',
  },
  {
    id: 6,
    image: poignées,
    name: 'Handles',
    category: 'furniture',
  },
  {
    id: 7,
    image: rampe,
    name: 'Rump',
    category: 'furniture',
  },
  {
    id: 8,
    image: cloche,
    name: 'Bell',
    category: 'door',
  },
  {
    id: 9,
    image: poignéesporte,
    name: 'Handles',
    category: 'door',
  },
  {
    id: 10,
    image: tirant,
    name: 'Door puller',
    category: 'door',
  },
  {
    id: 11,
    image: carrelage,
    name: 'Tiling',
    category: 'floor',
  },
  {
    id: 12,
    image: carrelagec1,
    name: 'Tiling',
    category: 'floor',
  },
  {
    id: 13,
    image: carrelagec2,
    name: 'Tiling',
    category: 'floor',
  },
  {
    id: 14,
    image: ensemblemeublevasque,
    name: 'vanity unit set',
    category: 'bathroom',
  },
  {
    id: 15,
    image: miroir,
    name: 'Mirror',
    category: 'bathroom',
  },
  {
    id: 16,
    image: vasque,
    name: 'Basin',
    category: 'bathroom',
  },
];
const categories: string[] = ['furniture', 'door', 'floor', 'bathroom'];
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
            <ProductList products={filteredProducts.slice(0, 3)} />
            <div className="category-header">
              <Link
                style={{
                  fontSize: '16px',
                  marginBottom: '15px',
                  marginTop: '20px',
                }}
                to={`/category/${category}`}
              >
                See More
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Homepage;
