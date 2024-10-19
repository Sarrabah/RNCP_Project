import { Button, Table } from 'antd';
import React from 'react';

const QuoteTable: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      quoteName: 'Quote 1',
      status: 'Pending',
    },
    {
      key: '2',
      quoteName: 'Quote 2',
      status: 'Completed',
    },
  ];
  interface QuoteRecord {
    key: string;
    quoteName: string;
    status: string;
  }
  const columns = [
    { title: 'Quote Name', dataIndex: 'quoteName', key: 'quotename' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Edit',
      key: 'edit',
      render: (record: QuoteRecord) => (
        <Button type="primary" onClick={() => handleEdit(record.key)}>
          Edit
        </Button>
      ),
    },
    {
      title: 'Archive',
      key: 'archive',
      render: (record: QuoteRecord) => (
        <Button danger onClick={() => handleArchive(record.key)}>
          Archive
        </Button>
      ),
    },
  ];

  const handleEdit = (key: string) => {
    console.log(`Editing quote with key: ${key}`);
  };

  const handleArchive = (key: string) => {
    console.log(`Archiving quot with key: ${key}`);
  };

  return <Table dataSource={dataSource} columns={columns} />;
};

export default QuoteTable;
