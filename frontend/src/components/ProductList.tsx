import React from "react";
import Product from "./Product";
import "../pages/Home/Homepage.css";
import { Col, Row } from "antd";
import { ProductListInterface } from "../types/types";

const ProductList: React.FC<ProductListInterface> = ({ products }) => {
  return (
    <Row className="products-list">
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <Product
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
          />
        </Col>
      ))}
    </Row>
  );
};
export default ProductList;
