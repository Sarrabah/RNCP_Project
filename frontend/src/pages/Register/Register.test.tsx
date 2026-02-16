import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
//import Register from "./RegisterPage";
import SignForms from "../../components/SignForms";
import BasketProvider from "../../context/BasketContext";

const expectErrorMessage = async (message: string) => {
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The input is not a valid email address!",
    );
  });
};

const expectNoErrorMessage = async (message: string) => {
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The input is not a valid email address!",
    );
  });
};

test("Form validation: errors appear and disappear correctly", async () => {
  render(
    <MemoryRouter>
      <BasketProvider>
        <SignForms
          activeForm="signup"
          onFormChange={jest.fn()}
          onCloseForm={jest.fn()}
        />
      </BasketProvider>
    </MemoryRouter>,
  );

  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your password");
  const submitButton = screen.getByRole("button", {
    name: "Sign up",
  });

  fireEvent.click(submitButton);
  await expectErrorMessage("The input is not a valid email address!");
  await expectErrorMessage("Please input your password!");

  fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "helloSecure3#" } });
  fireEvent.click(submitButton);
  await expectNoErrorMessage("The input is not a valid email address!");
  await expectNoErrorMessage("Please input your password!");
});
