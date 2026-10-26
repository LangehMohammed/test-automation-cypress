/// <reference types="Cypress" />

import { CommonActions } from "../../actions/CommonActions";
import { CartPage } from "../../pages/CartPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";

const cartpage = new CartPage();
const inventorypage = new InventoryPage();
const loginpage = new LoginPage();
const ca = new CommonActions();

let user_file_path = "user_testdata.json";

describe("Cart Features", () => {
  let userData = null;

  before(() => {
    cy.fixture(user_file_path).then((data) => {
      userData = data;

      cy.visit("/");

      loginpage.login(
        userData.credentials.standard_user.username,
        userData.credentials.standard_user.password,
      );

      // Add items to cart
      inventorypage.verifyAddToCart();
    });
  });

  // Veriry that remove from cart button works on cart page
  it("Remove from cart", () => {
    ca.clickOnWebElement(inventorypage.shopping_cart_button_identifier);

    // Verify that items exist in cart
    ca.verifyWebElementExist(inventorypage.inventory_item_identifier);

    cartpage.verifyRemoveFromCart(
      inventorypage.remove_item_from_cart_button_identifier,
    );
  });
});
