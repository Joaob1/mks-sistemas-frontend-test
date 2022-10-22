import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import Home from "pages";
import { Provider } from "react-redux";
import { store } from "redux/store";

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
    const buyButton = await app.findAllByText("COMPRAR");

    expect(Number(countItems.textContent)).toBe(0);

    let valueCountItems = 0;

    buyButton.forEach((button) => {
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      valueCountItems++;

      expect(Number(countItems.textContent)).toBe(valueCountItems);
    });
  });

  it("Should render a sidebar when click on the cart div", async () => {
    const cartDiv = await app.findByTestId("cartDiv");

    fireEvent.click(cartDiv);

    const sidebar = await app.findByTestId("sidebar");

    expect(sidebar).toBeInTheDocument();
  });

  it(`Should render a sidebar Item when fire the buy button,
      increase the amount of itens when fire the increase button
      decrease the amount of itens when fire the decrease button,
      unmount him when decrease the amount of itens to 0,
      and unmount him when fire the clear button,
       `, async () => {
    const cartDiv = await app.findByTestId("cartDiv");
    fireEvent.click(cartDiv);
    const buyButton = await app.findAllByText("COMPRAR");
    buyButton.forEach(async (button) => {
      fireEvent.click(button);
      const amount = await app.findByTestId("amount");
      expect(amount).tobe(1);
      // Should render a sidebar Item when fire the buy button
      const sidebarItem = await app.findByTestId("sidebarItem");
      expect(sidebarItem).toBeInTheDocument();

      // increase the amount of itens when fire the increase button
      const increaseButton = await app.findByTestId("Increase button");
      expect(increaseButton).toBeInTheDocument();
      fireEvent.click(increaseButton);
      expect(amount).tobe(2);

      // decrease the amount of itens when fire the decrease button
      const decreaseButton = await app.findByTestId("Decrease Button");
      expect(decreaseButton).toBeInTheDocument();
      fireEvent.click(decreaseButton);
      expect(amount).toBe(1);

      // unmount the SidebarItem component when decrease the amount of itens to 0
      fireEvent.click(decreaseButton);
      expect(sidebarItem).not.toBeInTheDocument();

      fireEvent.click(button);
      expect(sidebarItem).toBeInTheDocument();

      // unmount the SidebarItem component when fire the clear button
      const clearButton = await app.findByTestId("Clear Product");
      expect(clearButton).toBeInTheDocument();
      fireEvent.click(clearButton);
      expect(sidebarItem).not.toBeInTheDocument();
      expect(decreaseButton).not.toBeInTheDocument();
      expect(increaseButton).not.toBeInTheDocument();
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  it("Should close the sidebar when click the close button", async () => {
    const cartDiv = await app.findByTestId("cartDiv");
    fireEvent.click(cartDiv);
    const sidebar = await app.findByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    const closeSidebar = await app.findByTestId("closeSidebar");
    fireEvent.click(closeSidebar);
    expect(sidebar).not.toBeInTheDocument();
  });
});
