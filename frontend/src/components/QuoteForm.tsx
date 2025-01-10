import { Button, Form, Input, notification } from "antd";
import "../styles/Formstyles.css";
import React from "react";
import FormItem from "antd/es/form/FormItem";
import { NavigateFunction, useNavigate } from "react-router-dom";

const QuoteForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const getDate = () => {
    const today: Date = new Date();
    const month: number = today.getMonth();
    const year: number = today.getFullYear();
    const date: number = today.getDate();
    return `${date}/${month}/${year}`;
  };

  const addNewQuoteRequest = async (values: { name: string }) => {
    const { name } = values;
    const date = getDate();
    const status = "Created";

    try {
      const response = await fetch("/api/quoterequest", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          date,
          status,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request!");
      }

      const data = await response.json();

      notification.success({
        message: "The quote been successfully created!",
        placement: "topRight",
      });

      setTimeout(() => {
        navigate("/homepage");
      }, 2000);

      return data;
    } catch (error) {
      console.error("Error submitting quote request", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2> New Quote</h2>
        <Form name="quote-form" layout="vertical" onFinish={addNewQuoteRequest}>
          <FormItem
            label="Quote Name"
            name="name"
            rules={[
              { required: true, message: "Please input the quote name!" },
            ]}
          >
            <Input placeholder="Enter quote name " />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Create New Quote
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default QuoteForm;
