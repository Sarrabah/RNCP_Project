import React, { useEffect, useState } from "react";
import { useBasketContext } from "../context/BasketContext";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  message,
  notification,
  Row,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getCSRFToken } from "../components/NavBar";
import { QuoteRequestInterface } from "../types/types";

const Basket: React.FC = () => {
  const { basket, setBasket } = useBasketContext();
  const { Text, Title } = Typography;
  const navigate: NavigateFunction = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const [quoteRequestsList, setQuoteRequestsList] = useState<
    QuoteRequestInterface[]
  >([]);
  async function getAllQuoteRequests(): Promise<QuoteRequestInterface[]> {
    const response: Response = await fetch("/api/quoterequests");
    const data: Promise<QuoteRequestInterface[]> = response.json();
    return data;
  }
  useEffect(() => {
    getAllQuoteRequests().then((qr) => setQuoteRequestsList(qr));
  }, []);

  const handleQuoteSelection = (quoteRIds: Array<number>) => {
    setSelectedIds(quoteRIds);
  };

  const handleSaveBasket = async () => {
    if (selectedIds.length > 0) {
      try {
        const csrfToken = getCSRFToken();
        if (!csrfToken) {
          throw new Error("CSRF token not found");
        }
        const response = await fetch("/api/basketelements", {
          method: "POST",
          credentials: "include", // Include session cookies
          body: JSON.stringify({
            quoteRequestIdList: selectedIds,
            productInformations: basket.map((p) => ({
              id: p.product.id,
              quantity: p.quantity,
            })),
          }),
          headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to save the list of choices!");
        }

        const data = await response.json();

        notification.success({
          message: "Your choises has been successfully saved!",
          placement: "topRight",
        });

        setTimeout(() => {
          navigate("/homepage");
        }, 1000);
        setBasket([]);
        return data;
      } catch (error) {
        message.error("An error is occured while saving the list of choices!");
        console.error("Error saving the list of choices", error);
      }
    } else {
      notification.warning({
        message: "Please select at least one quote request!",
        placement: "topRight",
      });
    }
  };

  const handleDeleteProduct = (ProductId: number) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.product.id !== ProductId),
    );
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: "center" }}>
        The list of choices
      </Title>
      <div>
        {basket.map((item) => (
          <Row
            key={item.product.id}
            gutter={[16, 16]}
            align="middle"
            style={{ padding: "10px", borderBottom: "1px solid #f0f0f0" }}
          >
            <Col xs={24} sm={6} md={4}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Col>
            <Col xs={24} sm={12} md={10}>
              <Text strong>{item.product.name}</Text>
            </Col>
            <Col xs={24} sm={6} md={6}>
              <Text>{item.quantity}</Text>
            </Col>
            <Col xs={24} sm={2} md={4}>
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteProduct(item.product.id)}
              />
            </Col>
          </Row>
        ))}
        {basket.length > 0 && (
          <div>
            <Title level={3}>Select the desired quote(s) request(s)</Title>
            <Checkbox.Group
              options={quoteRequestsList.map((qr) => ({
                label: qr.name,
                value: qr.id,
              }))}
              value={selectedIds}
              onChange={handleQuoteSelection}
            />
            <Button
              type="primary"
              style={{
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#002766",
              }}
              onClick={handleSaveBasket}
            >
              Save the list of choices
            </Button>
          </div>
        )}
      </div>
      <Divider />
      {basket.length === 0 && (
        <Title level={3} style={{ textAlign: "center" }}>
          Your list of choices is empty!
        </Title>
      )}
    </div>
  );
};

export default Basket;
