import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../types/types";
import { Button, InputNumber } from "antd";
import { useBasketContext } from "../context/BasketContext";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  async function fetchProductDetails(): Promise<ProductInterface> {
    const response = await fetch(`/api/product/${id}`);
    const data = await response
      .json()
      .then((response) => response["dataResponse"]);
    return data;
  }

  const [product, setProduct] = useState<ProductInterface>();

  useEffect(() => {
    fetchProductDetails().then((p) => setProduct(p));
  },[id]);

  console.log(product);

  const [quantity, setQuantity] = useState<number>(1);
  const { addToBasket } = useBasketContext();

  const handleAddToBasket = () => {
    if (!product) {
      return <p>Loading product details...</p>;
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
    <div>
      <img
        src={product?.image}
        alt={product?.name}
        style={{ width: "300px" }}
      />
      <h1>{product?.name}</h1>
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
        {" "}
      </Button>
    </div>
  );
};
export default ProductDetail;
