import React, { useState } from 'react';
import { useBasketContext } from '../context/BasketContext';
import { Button, Checkbox, Col, Divider, Row, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Basket: React.FC = () => {
  const { basket } = useBasketContext();
  const { Text, Title } = Typography;
  const quoteRequestsList: Array<string> = [
    'Quote Request 1',
    'Quote Request 2',
    'Quote Request 3',
  ];
  const [selectedQuotes, setSelectedQuotes] = useState<Array<string>>([]);

  const handleQuoteSelection = (quoteRArray: Array<string>) => {
    setSelectedQuotes(quoteRArray);
  };
  return (
    <div>
      <Title level={2} style={{ textAlign: 'center' }}>
        Basket
      </Title>
      <div>
        {basket.map((item) => (
          <Row
            key={item.product.id}
            gutter={[16, 16]}
            align="middle"
            style={{ padding: '10px', borderBottom: '1px solid #f0f0f0' }}
          >
            <Col xs={24} sm={6} md={4}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Col>
            <Col xs={24} sm={12} md={10}>
              <Text strong>{item.product.name}</Text>
            </Col>
            <Col xs={24} sm={6} md={6}>
              <Text>{item.quantity}</Text>
            </Col>
            <Col xs={24} sm={2} md={4}>
              <Button icon={<DeleteOutlined />} danger disabled={true} />
            </Col>
          </Row>
        ))}
        {basket.length > 0 && (
          <div>
            <Title level={3}>Select the desired quotes requests</Title>
            <Checkbox.Group
              options={quoteRequestsList}
              value={selectedQuotes}
              onChange={handleQuoteSelection}
            />
          </div>
        )}
      </div>
      <Divider />
      {basket.length == 0 && (
        <Title level={3} style={{ textAlign: 'center' }}>
          Your basket is empty!
        </Title>
      )}
    </div>
  );
};

export default Basket;
