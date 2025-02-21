import { Button, Divider, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { QuoteRequestInterface } from "../../types/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./QuoteRequestFormStyle.css";
import QuoteForm from "../../components/QuoteRequestForm";

const QuotePage: React.FC = () => {
  const { Text } = Typography;
  const navigate: NavigateFunction = useNavigate();
  const [dataList, setDataList] = useState<QuoteRequestInterface[]>([]);

  async function fetchQuoteRequests(): Promise<QuoteRequestInterface[]> {
    const response: Response = await fetch("/api/quoterequests");
    const data: Promise<QuoteRequestInterface[]> = await response.json();
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
      render: (record: QuoteRequestInterface) => (
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
      render: (record: QuoteRequestInterface) => (
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
      <QuoteForm />
      <Text style={{ fontSize: "18px" }} underline>
        Quote request library:
      </Text>
      <Divider style={{ margin: "16px 0" }} />
      <Table dataSource={dataList} columns={columns} />
    </div>
  );
};

export default QuotePage;
