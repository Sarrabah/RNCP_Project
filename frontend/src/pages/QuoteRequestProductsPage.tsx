import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetails } from "../types/types";
import { Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";

const QuoteRequestProductsPage = () => {
  const { Text } = Typography;
  const [productsDetails, setProductsDetails] = useState<ProductDetails[]>([]);
  const { id } = useParams<{ id: string }>();

  const getAllProductsDetails = useCallback(async () => {
    const reponse = await fetch(`/api/quoterequestproducts/${id}`);
    const data = await reponse.json();
    setProductsDetails(data.product_id_quantity);
  }, [id]);

  useEffect(() => {
    getAllProductsDetails();
  }, [getAllProductsDetails]);
  console.log(productsDetails);
  return (
    <div>
      {productsDetails.length > 0 && (
        <div>
          <h2> All selected products for this quote request !</h2>
          {productsDetails.map((p) => (
            <Row
              key={p.product_name}
              gutter={[16, 16]}
              align="middle"
              style={{ padding: "10px", borderBottom: "1px solid #f0f0f0" }}
            >
              <Col xs={24} sm={6} md={4}>
                <img
                  src={p.product_image}
                  alt={p.product_name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Col>
              <Col xs={24} sm={12} md={10}>
                <Text strong>{p.product_name}</Text>
              </Col>
              <Col xs={24} sm={6} md={6}>
                <Text>{p.quantity}</Text>
              </Col>
            </Row>
          ))}
        </div>
      )}
      {productsDetails.length === 0 && (
        <Title level={3} style={{ textAlign: "center" }}>
          Your quote request is empty!
        </Title>
      )}
    </div>
  );
};
export default QuoteRequestProductsPage;
