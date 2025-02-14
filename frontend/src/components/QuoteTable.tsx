import {
  Button,
  Divider,
  Form,
  Input,
  message,
  notification,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { QuoteRequest } from "../types/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getCSRFToken } from "./NavBar";
import FormItem from "antd/es/form/FormItem";
import "../styles/Formstyles.css";

const QuoteTable: React.FC = () => {
  const { Text } = Typography;
  const navigate: NavigateFunction = useNavigate();
  const [dataList, setDataList] = useState<QuoteRequest[]>([]);

  const addNewQuoteRequest = async (values: { name: string }) => {
    const { name } = values;
    const status = "Created";

    try {
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        throw new Error("CSRF token not found. Please refresh the page.");
      }
      const response = await fetch("/api/quoterequest", {
        method: "POST",
        credentials: "include", // Include session cookies
        body: JSON.stringify({
          name: name,
          status,
        }),
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });

      if (!response.ok) {
        message.error("Failed to submit your quote request!");
        throw new Error("Failed to submit quote request!");
      }

      const data = await response.json();

      notification.success({
        message:
          "The quote request been successfully created! Now it's time to add products !",
        placement: "topRight",
      });

      setTimeout(() => {
        navigate("/homepage");
      }, 2000);

      return data;
    } catch (error) {
      message.error("An error is occured while submitting your quote request!");
      console.error("Error submitting quote request", error);
    }
  };

  async function fetchQuoteRequests(): Promise<QuoteRequest[]> {
    const response: Response = await fetch("/api/quoterequests");
    const data: Promise<QuoteRequest[]> = await response.json();
    return data;
  }

  useEffect(() => {
    fetchQuoteRequests().then((dl) => setDataList(dl));
  }, []);

  const columns = [
    { title: "Quote request name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "View",
      key: "view",
      render: (record: QuoteRequest) => (
        <Button
          type="primary"
          style={{ backgroundColor: "#002766" }}
          onClick={() => handleView(record.id)}
        >
          View
        </Button>
      ),
    },
    {
      title: "Send",
      key: "send",
      render: (record: QuoteRequest) => (
        <Button
          style={{ backgroundColor: "#002766" }}
          type="primary"
          onClick={() => handleSend(record.id)}
        >
          Send
        </Button>
      ),
    },
  ];

  const handleView = (key: number) => {
    console.log(`Viewing quote request with key: ${key}`);
    navigate("/quoterequestproducts");
  };

  const handleSend = (key: number) => {
    console.log(`Sending quote request with key: ${key}`);
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-box">
          <h2> Add a new quote request here!</h2>
          <Form
            name="quote-request-form"
            layout="vertical"
            onFinish={addNewQuoteRequest}
          >
            <FormItem
              label="Quote request name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the quote request name!",
                },
              ]}
            >
              <Input placeholder="Enter quote request name " />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", backgroundColor: "#002766" }}
              >
                Create
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Text style={{ fontSize: "18px" }} underline>
        Quote request library:
      </Text>
      <Divider style={{ margin: "16px 0" }} />
      <Table dataSource={dataList} columns={columns} />
    </div>
  );
};

export default QuoteTable;
