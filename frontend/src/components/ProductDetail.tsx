import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Product Details {id} </h1>
    </div>
  );
};
export default ProductDetail;
