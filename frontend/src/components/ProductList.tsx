import React from 'react';
import Product, { ProductProps } from './Product';

interface ProductListPropos {
  products: ProductProps[];
}

const ProductList: React.FC<ProductListPropos> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          category={product.category}
        />
      ))}
      ;
    </div>
  );
};
export default ProductList;
