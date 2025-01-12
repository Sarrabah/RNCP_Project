import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../types/types";
import { Button, InputNumber } from "antd";
import { useBasketContext } from "../context/BasketContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../styles/ProductDetails.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInterface>();
  const [quantity, setQuantity] = useState<number>(1);
  const { addToBasket } = useBasketContext();

  const fetchProductDetails = useCallback(async () => {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    setProduct(data);
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleAddToBasket = () => {
    if (!product) {
      return;
    }
    addToBasket(
      {
        id: product.id,
        image: product.image,
        name: product.name,
        category: product.category,
      },
      quantity,
    );
  };

  const handleQuantityChange = (value: number | null) => {
    if (value != null) {
      setQuantity(value);
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product?.image} alt={product?.name} />
      </div>
      <div className="product-detail__info">
        <h1>{product?.name}</h1>
        <p>Category: {product?.category}</p>
        <div className="product-detail__actions">
          <InputNumber
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            style={{ marginRight: "10px" }}
          />
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToBasket}
          >
            Add to Basket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
