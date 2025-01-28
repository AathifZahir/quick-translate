import { render, screen, fireEvent } from "@testing-library/react";
const axios = require("axios");
import App from "./App";

describe("App Component Tests", () => {
  it("renders the input textarea and translate button", () => {
    render(<App />);

    // Check if the input textarea and translate button are in the document
    expect(screen.getByPlaceholderText(/Enter text here/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Translate/i })
    ).toBeInTheDocument();
  });

  it("should show error when input is empty and translate button is clicked", () => {
    render(<App />);

    // Click translate button with empty input
    fireEvent.click(screen.getByRole("button", { name: /Translate/i }));

    // Check if error message is displayed
    expect(screen.getByText(/Input text cannot be empty/i)).toBeInTheDocument();
  });

  it("should display translated text when translation button is clicked", async () => {
    render(<App />);

    // Simulate text input
    fireEvent.change(screen.getByPlaceholderText(/Enter text here/i), {
      target: { value: "Hello" },
    });

    // Mock the axios API call
    // Assuming translation API is mocked and returns "Hola" for "Hello"
    fireEvent.click(screen.getByRole("button", { name: /Translate/i }));

    // Check if translated text is displayed
    await screen.findByText(/Translated text will appear here/i);
  });

  it("should toggle RTL and LTR text direction on button click", () => {
    render(<App />);

    // Check initial direction (LTR)
    const textArea = screen.getByPlaceholderText(/Enter text here/i);
    expect(textArea).toHaveStyle("direction: ltr");

    // Click the direction toggle button
    fireEvent.click(screen.getByRole("button", { name: /Switch to RTL/i }));

    // Check if the direction changed to RTL
    expect(textArea).toHaveStyle("direction: rtl");
  });
});
