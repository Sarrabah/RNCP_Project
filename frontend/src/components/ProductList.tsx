import React from 'react';
import Product from './Product';
import '../styles/Homepage.css';
import { Col, Row } from 'antd';
import { ProductInterface } from '../types/types';

interface ProductListPropos {
  products: Array<ProductInterface>;
}

const ProductList: React.FC<ProductListPropos> = ({ products }) => {
  return (
    <Row className="products-list">
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <Product
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        </Col>
      ))}
    </Row>
  );
};
export default ProductList;
