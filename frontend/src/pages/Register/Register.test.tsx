import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./RegisterPage";

const expectErrorMessage = (message: string) => {
  return waitFor(() => expect(screen.getByText(message)).toBeInTheDocument());
};

const expectNoErrorMessage = (message: string) => {
  return waitFor(() =>
    expect(screen.queryByText(message)).not.toBeInTheDocument(),
  );
};

test("Form validation: errors appear and disappear correctly", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>,
  );

  const emailInput = screen.getByPlaceholderText("E-mail");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole("button", {
    name: /Create an account/i,
  });

  fireEvent.click(submitButton);
  await expectErrorMessage("Please put here your adress mail!");
  await expectErrorMessage("Please put here your password!");

  fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "helloSecure3#" } });
  fireEvent.click(submitButton);
  await expectNoErrorMessage("Please put here your adress mail!");
  await expectNoErrorMessage("Please put here your password!");
});
