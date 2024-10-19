import { Button, DatePicker, Form, Input, notification } from 'antd';
import '../styles/Formstyles.css';
import React from 'react';
import FormItem from 'antd/es/form/FormItem';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const QuoteForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const onFinish = () => {
    notification.success({
      message: 'The quote been successfully created!',
      placement: 'topRight',
    });
    setTimeout(() => {
      navigate('/homepage');
    }, 2000);
  };
  return (
    <div className="form-container">
      <div className="form-box">
        <h2> New Quote</h2>
        <Form name="quote-form" layout="vertical" onFinish={onFinish}>
          <FormItem
            label="Quote Name"
            name="quotename"
            rules={[
              { required: true, message: 'Please input the quote name!' },
            ]}
          >
            <Input placeholder="Enter quote name " />
          </FormItem>

          <FormItem
            label="Client Name"
            name="clientname"
            rules={[
              { required: true, message: 'Please input the client name!' },
            ]}
          >
            <Input placeholder="Enter client name " />
          </FormItem>

          <FormItem
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </FormItem>

          <FormItem
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address' }]}
          >
            <TextArea rows={2} placeholder="Enter address !" />
          </FormItem>

          <FormItem
            label="Phone Number"
            name="phonenumber"
            rules={[
              { required: true, message: 'Please input the phone number' },
              {
                pattern: /^\d+$/,
                message: 'Phone Number must be digits only!',
              },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Create New Quote
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default QuoteForm;
