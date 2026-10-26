/// <reference types="Cypress" />

import { CommonActions } from "../../actions/CommonActions";
import { CartPage } from "../../pages/CartPage";
import { CheckoutInfoPage } from "../../pages/CheckoutInfoPage";
import { CheckoutSummaryPage } from "../../pages/CheckoutSummaryPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";

const checkoutinfopage = new CheckoutInfoPage();
const checkoutsummarypage = new CheckoutSummaryPage();
const loginpage = new LoginPage();
const inventorypage = new InventoryPage();
const cartpage = new CartPage();
const ca = new CommonActions();

let test_file_path = "checkout/checkout_testdata.json";
let user_file_path = "user_testdata.json";

describe("Checkout Summary Features", () => {
  let userData = null;
  let testData = null;

  before(() => {
    cy.fixture(test_file_path).then((data) => {
      testData = data;
    });
    cy.fixture(user_file_path).then((data) => {
      userData = data;

      cy.visit("/");

      loginpage.login(
        userData.credentials.standard_user.username,
        userData.credentials.standard_user.password,
      );

      // Add products to the cart
      inventorypage.verifyAddToCart();

      // Go to cart
      ca.clickOnWebElement(cartpage.shopping_cart_button_identifier);

      // Go to checkout info page
      ca.clickOnWebElement(cartpage.checkout_button_identifier);

      // Go to checkout summary page
      checkoutinfopage.checkout(
        testData.userinfo.firstname,
        testData.userinfo.lastname,
        testData.userinfo.postalcode,
      );
    });
  });

  // Verify that the cart count is same as the number of items on the summary page
  it("Verify cart item count", () => {
    checkoutsummarypage.verifyItemCount();
  });

  it("Verify items subtotal", () => {
    checkoutsummarypage.verifyItemsTotalPrice();
  });

  // Verify the products in the cart and checkout overview are the same
  it("  Verify the products in the cart and checkout overview are the same", () => {
    ca.clickOnWebElement(checkoutsummarypage.cancle_button_identifier);
    // Open the cart
    ca.clickOnWebElement(cartpage.shopping_cart_button_identifier);

    // Verify Items match
    checkoutsummarypage.veriyItemsMatch(
      testData.userinfo.firstname,
      testData.userinfo.lastname,
      testData.userinfo.postalcode,
    );
  });
});
