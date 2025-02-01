import { Button, Form, Input, message, notification } from "antd";
import "../styles/Formstyles.css";
import React from "react";
import FormItem from "antd/es/form/FormItem";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getCSRFToken } from "./NavBar";

const QuoteForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const addNewQuoteRequest = async (values: { name: string }) => {
    const { name } = values;
    const status = "Created";
    const archi_id = 1;

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
          archi_id: archi_id,
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
        message: "The quote been successfully created!",
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
