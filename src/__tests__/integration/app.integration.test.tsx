import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import App from "../../app/stack/index";
import { getSession } from "@/src/data/helpers/storage";
import Loading from "../../components/loading";

// Mock the dependencies
jest.mock("@/src/data/helpers/storage");
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("../../components/loading", () => () => <></>);
jest.mock("../../app/stack/auth", () => () => <></>);
jest.mock("../../app/tabs", () => () => <></>);
jest.mock("../../app/stack/form-add-pets", () => () => <></>);

// Mock CSS import
jest.mock("../../../global.css", () => ({}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe.skip("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loading component while checking session", async () => {
    (getSession as jest.Mock).mockResolvedValueOnce({ token: null });

    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId("loading")).toBeTruthy();
    });
  });

  it("renders Auth screen when not authenticated", async () => {
    (getSession as jest.Mock).mockResolvedValueOnce({ token: null });

    const { getByText } = render(<App />);

    await act(async () => {
      await waitFor(() => {
        expect(getByText("Auth")).toBeTruthy();
      });
    });
  });

  it("renders Tabs screen when authenticated", async () => {
    (getSession as jest.Mock).mockResolvedValue({ token: "valid-token" });

    const { getByText } = render(<App />);

    await act(async () => {
      await waitFor(() => {
        expect(getByText("Tabs")).toBeTruthy();
      });
    });
  });
});
