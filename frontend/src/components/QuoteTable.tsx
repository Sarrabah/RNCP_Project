import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { QuoteRecord } from "../types/types";

const QuoteTable: React.FC = () => {
  async function fetchQuoteRequests(): Promise<QuoteRecord[]> {
    const response = await fetch("/api/quoterequests");
    const data = await response.json();
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
      title: "Save",
      key: "save",
      render: (record: QuoteRecord) => (
        <Button danger onClick={() => handleSave(record.id)}>
          Save
        </Button>
      ),
    },
  ];

  const handleEdit = (key: number) => {
    console.log(`Editing quote with key: ${key}`);
  };

  const handleSave = (key: number) => {
    console.log(`Saving quot with key: ${key}`);
  };

  return <Table dataSource={dataList} columns={columns} />;
};

export default QuoteTable;
