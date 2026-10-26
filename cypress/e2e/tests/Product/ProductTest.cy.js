/// <reference types="Cypress" />

import { ProductPage } from "../../pages/ProductPage";
import { LoginPage } from "../../pages/LoginPage";

let user_file_path = "user_testdata.json";

const productpage = new ProductPage();
const loginpage = new LoginPage();

describe("Product Features", () => {
  let userData = null;

  before(() => {
    cy.fixture(user_file_path).then((data) => {
      userData = data;

      cy.visit("/");

      loginpage.login(
        userData.credentials.standard_user.username,
        userData.credentials.standard_user.password,
      );
    });
  });

  // Verify that add to cart button works
  it("Add to cart", () => {
    productpage.verifyAddToCart();
  });

  // Verify remove from cart button works
  it("Remover from cart", () => {
    productpage.verifyRemoveFromCart();
  });
});
