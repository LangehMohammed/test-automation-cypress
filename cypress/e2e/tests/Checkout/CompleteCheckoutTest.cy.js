/// <reference types="Cypress" />

import { CommonActions } from "../../actions/CommonActions";
import { CartPage } from "../../pages/CartPage";
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";
import { CheckoutInfoPage } from "../../pages/CheckoutInfoPage";
import { CheckoutSummaryPage } from "../../pages/CheckoutSummaryPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";

const ca = new CommonActions();
const completecheckoutpage = new CheckoutCompletePage();
const checkoutinfopage = new CheckoutInfoPage();
const checkoutsummarypage = new CheckoutSummaryPage();
const loginpage = new LoginPage();
const inventorypage = new InventoryPage();
const cartpage = new CartPage();

let test_file_path = "checkout/checkout_testdata.json";
let user_file_path = "user_testdata.json";

describe("Checkout Complete Features", () => {
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

  // Verify clicking on the finish button takes you to the complete checkout page
  it("Verify checkout", () => {
    ca.clickOnWebElement(checkoutsummarypage.finsh_button_identifier);

    // Verify we have been redirected to the complete checkout page
    completecheckoutpage.isCheckoutComplete(testData.expected.message.thankyou);

    // Verify cart has been cleared
    ca.verifyWebElementDoesNotExist(cartpage.shopping_cart_badge_identifier);
  });

  // Verify that clicking the generate pdf button generates the pdf
  it.skip("Verify generate pdf", () => {
    // API call is not being made so we cant intercept the request
  });

  // Verify clicking on back to the inventory page
  it("Verify back to home", () => {
    ca.clickOnWebElement(
      completecheckoutpage.back_to_product_button_identifier,
    );

    // Verify we are on the inventory page
    inventorypage.isInventoryPage;
  });
});
