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

describe("Checkout Info Features", () => {
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

      // Add items to cart
      inventorypage.verifyAddToCart();

      // Go to checkout info page
      ca.clickOnWebElement(inventorypage.shopping_cart_button_identifier);
      ca.clickOnWebElement(cartpage.checkout_button_identifier);
    });
  });

  beforeEach(() => {
    checkoutinfopage.clearFormData();
  });

  // Verify an error is displayed when an empty form is submited
  it("Verify empty form submited", () => {
    checkoutinfopage.clickOnContinue();

    // Verify error message is displayed
    checkoutinfopage.verifyErrorMessageContent(
      testData.expected.message.nofirstname,
    );
  });

  // Verify an error message is displayed if the first name is not provided
  it("Veriry no first name", () => {
    checkoutinfopage.enterLastname(testData.userinfo.lastname);
    checkoutinfopage.enterPostalcode(testData.userinfo.postalcode);
    checkoutinfopage.clickOnContinue();

    // Verify error message is displayed
    checkoutinfopage.verifyErrorMessageContent(
      testData.expected.message.nofirstname,
    );
  });

  // Verify an error message is displayed if the last name is not provided
  it("Veriry no last name", () => {
    checkoutinfopage.enterFirstname(testData.userinfo.firstname);
    checkoutinfopage.enterPostalcode(testData.userinfo.postalcode);
    checkoutinfopage.clickOnContinue();

    // Verify error message is displayed
    checkoutinfopage.verifyErrorMessageContent(
      testData.expected.message.nolastname,
    );
  });

  // Verify an error message is displayed if the postal code is not provided
  it("Veriry no postal code", () => {
    checkoutinfopage.enterFirstname(testData.userinfo.firstname);
    checkoutinfopage.enterLastname(testData.userinfo.lastname);
    checkoutinfopage.clickOnContinue();

    // Verify error message is displayed
    checkoutinfopage.verifyErrorMessageContent(
      testData.expected.message.nopostalcode,
    );
  });

  // Verify valid information provided proceeds to the checkout summary page
  it("Verify valid info", () => {
    checkoutinfopage.checkout(
      testData.userinfo.firstname,
      testData.userinfo.lastname,
      testData.userinfo.postalcode,
    );

    // Verify redirected to checkout summary page
    checkoutsummarypage.isCheckoutSummaryPage();
  });
});
