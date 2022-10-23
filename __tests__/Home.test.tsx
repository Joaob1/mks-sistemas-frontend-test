import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  waitFor,
  getAllByTestId,
} from "@testing-library/react";
import Home from "pages";
import { Provider } from "react-redux";
import { store } from "redux/store";
import getValueFromItem from "utils/getValuesFromItem";
describe("Homepage", () => {
  let app: RenderResult;

  beforeEach(() => {
    app = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
  it("Should increase items amount when fire the buy button", async () => {
    const countItems = await app.findByTestId("countItems");
    const buyButton = await waitFor(() => app.getAllByTestId("buyButton")[0]);
    expect(countItems).toBeInTheDocument();

    expect(Number(countItems.textContent)).toBe(0);

    expect(buyButton).toBeInTheDocument();

    fireEvent.click(buyButton);

    expect(Number(countItems.textContent)).toBe(1);
  });

  it("Should render a sidebar when click on the cart div", async () => {
    const cartDiv = await app.findByTestId("cartDiv");

    fireEvent.click(cartDiv);

    const sidebar = await app.findByTestId("sidebar");

    expect(sidebar).toBeInTheDocument();
  });

  it("Should unmount the sidebar when click the close button", async () => {
    const cartDiv = await app.findByTestId("cartDiv");

    fireEvent.click(cartDiv);
    const sidebar = app.getByTestId("sidebar");
    const closeButton = app.getByTestId("closeSidebar");
    fireEvent.click(closeButton);
    expect(sidebar).not.toBeInTheDocument();
  });

  it("Should render a sidebar Item when fire the buy button", async () => {
    const cartDiv = await app.findByTestId("cartDiv");
    fireEvent.click(cartDiv);
    const buyButton = await waitFor(() => app.getAllByTestId("buyButton")[1]);
    fireEvent.click(buyButton);
    const sidebarItem = await waitFor(
      () => app.getAllByTestId("sidebarItem")[1]
    );
    expect(sidebarItem).toBeInTheDocument();
  });

  it("Should increase the amount of itens when fire the increase button", async () => {
    const amount = await waitFor(() => app.getAllByTestId("amount")[1]);
    expect(amount).toBeInTheDocument();
    expect(amount.textContent).toBe("1");
    const increaseButton = await waitFor(
      () => app.getAllByTestId("Increase Button")[1]
    );
    expect(increaseButton).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(amount.textContent).toBe("2");
  });

  it("Should decrease the amount of itens when fire the decrease button", async () => {
    const amount = await waitFor(() => app.getAllByTestId("amount")[1]);
    expect(amount.textContent).toBe("2");
    const decreaseButton = await waitFor(
      () => app.getAllByTestId("Decrease Button")[1]
    );
    expect(decreaseButton).toBeInTheDocument();
    fireEvent.click(decreaseButton);
    expect(amount.textContent).toBe("1");
  });

  it("Should unmount the SidebarItem component when the amount value decrease to 0", async () => {
    const sidebarItem = await waitFor(
      () => app.getAllByTestId("sidebarItem")[1]
    );
    expect(sidebarItem).toBeInTheDocument();
    const amount = await waitFor(() => app.getAllByTestId("amount")[1]);
    expect(amount.textContent).toBe("1");
    const decreaseButton = await waitFor(
      () => app.getAllByTestId("Decrease Button")[1]
    );
    fireEvent.click(decreaseButton);
    expect(sidebarItem).not.toBeInTheDocument();
    expect(amount).not.toBeInTheDocument();
    expect(decreaseButton).not.toBeInTheDocument();
  });

  it("Should unmount the SidebarItem component when the fire the clear button", async () => {
    const sidebarItem = await waitFor(
      () => app.getAllByTestId("sidebarItem")[0]
    );
    expect(sidebarItem).toBeInTheDocument();
    const clearButton = await waitFor(
      () => app.getAllByTestId("Clear Product")[0]
    );
    fireEvent.click(clearButton);
    expect(sidebarItem).not.toBeInTheDocument();
    expect(clearButton).not.toBeInTheDocument();
  });

  it("Should sum the value of product to final value when click on the buy button, and sum again when click the increase button", async () => {
    const buyButton = await waitFor(() => app.getAllByTestId("buyButton")[0]);
    const totalPrice = app.getByTestId("totalPrice");
    expect(totalPrice.textContent).toBe(`R$${Number(0)}`);
    const cardItemPrice: HTMLElement = await waitFor(
      () => app.getAllByTestId("cardItemPrice")[0]
    );
    fireEvent.click(buyButton);
    const amount = await waitFor(() => app.getAllByTestId("amount")[0]);
    const itemValue = getValueFromItem(
      cardItemPrice.textContent ? cardItemPrice.textContent : undefined
    );
    expect(totalPrice.textContent).toBe(
      `R$${itemValue * Number(amount.textContent)}`
    );
    const increaseButton = await waitFor(
      () => app.getAllByTestId("Increase Button")[0]
    );
    expect(increaseButton).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(totalPrice.textContent).toBe(
      `R$${itemValue * Number(amount.textContent)}`
    );
  });

  it("Should subtract the value of product to final value when click the decrease button", async () => {
    const totalPrice = app.getByTestId("totalPrice");
    const cardItemPrice = await waitFor(
      () => app.getAllByTestId("cardItemPrice")[0]
    );
    let itemValue = getValueFromItem(
      cardItemPrice.textContent ? cardItemPrice.textContent : undefined
    );
    const amount = await waitFor(() => app.getAllByTestId("amount")[0]);
    expect(totalPrice.textContent).toBe(
      `R$${itemValue * Number(amount.textContent)}`
    );
    const decreaseButton = await waitFor(
      () => app.getAllByTestId("Decrease Button")[0]
    );
    expect(decreaseButton).toBeInTheDocument();
    fireEvent.click(decreaseButton);
    expect(totalPrice.textContent).toBe(
      `R$${itemValue * Number(amount.textContent)}`
    );
    fireEvent.click(decreaseButton);
    expect(totalPrice.textContent).toBe(`R$${0}`);
  });
});
