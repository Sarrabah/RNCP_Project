import React from 'react';
import { products } from './HomePage';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  return (
    <div>
      <h2> {category} Products </h2>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;
