import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import { Button, Card, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ProductInterface } from '../types/types';
import { useBasketContext } from '../context/BasketContext';

const Product: React.FC<ProductInterface> = ({ id, image, name, category }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const { addToBasket } = useBasketContext();

  const handleAddToBasket = () => {
    addToBasket({ id, image, name, category }, quantity);
    console.log(`Added ${quantity} of ${name} to the basket!`);
  };

  const goToProductDetails = () => {
    navigate(`/product/${id}`);
  };

  const handleQuantityChange = (value: number | null) => {
    if (value != null) {
      setQuantity(value);
    }
  };
  return (
    <Card
      hoverable
      cover={<img src={image} alt={name} />}
      className="product"
      onClick={goToProductDetails}
    >
      <h3> {name} </h3>
      <div onClick={(e) => e.stopPropagation()}>
        <InputNumber
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
          style={{ marginRight: '10px' }}
        />
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToBasket}
        >
          {' '}
        </Button>
      </div>
    </Card>
  );
};

export default Product;
