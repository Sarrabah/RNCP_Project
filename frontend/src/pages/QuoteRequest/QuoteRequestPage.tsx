import { Button, Divider, notification, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { QuoteRequestInterface, Statusenum } from "../../types/types";
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
          onClick={() => handleSend(record)}
        >
          Send
        </Button>
      ),
    },
  ];

  const handleView = (id: number) => {
    navigate(`/quoterequestproducts/${id}`);
  };

  const handleSend = (qr: QuoteRequestInterface) => {
    notification.success({
      message:
        "The quote request been successfully sended to the hardware store!",
      placement: "topRight",
    });

    setTimeout(() => {
      navigate("/quoterequestlist");
    }, 1000);
    qr.status = Statusenum.Finished;
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
