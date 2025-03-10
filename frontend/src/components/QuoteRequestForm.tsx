import { Button, Form, Input, message, notification } from "antd";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getCSRFToken } from "./NavBar";
import FormItem from "antd/es/form/FormItem";
import "../pages/QuoteRequest/QuoteRequestFormStyle.css";

const QuoteForm: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

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
    </div>
  );
};

export default QuoteForm;
