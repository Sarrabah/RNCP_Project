import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { QuoteRecord } from "../types/types";

const QuoteTable: React.FC = () => {
  async function fetchQuoteRequests(): Promise<QuoteRecord[]> {
    const response = await fetch("/api/quoterequests");
    const data = await response
      .json()
      .then((response) => response["dataResponse"]);
    return data;
  }

  const [dataList, setDataList] = useState<QuoteRecord[]>([]);
  useEffect(() => {
    fetchQuoteRequests().then((dl) => setDataList(dl));
  }, []);

  const columns = [
    { title: "Quote Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Edit",
      key: "edit",
      render: (record: QuoteRecord) => (
        <Button type="primary" onClick={() => handleEdit(record.id)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Archive",
      key: "archive",
      render: (record: QuoteRecord) => (
        <Button danger onClick={() => handleArchive(record.id)}>
          Archive
        </Button>
      ),
    },
  ];

  const handleEdit = (key: number) => {
    console.log(`Editing quote with key: ${key}`);
  };

  const handleArchive = (key: number) => {
    console.log(`Archiving quot with key: ${key}`);
  };

  return <Table dataSource={dataList} columns={columns} />;
};

export default QuoteTable;
