import { CommonActions } from "../actions/CommonActions";

const ca = new CommonActions();

export class LoginPage {
  // Web element identifiers for Login Page

  username_field_identifier = '[data-test="username"]';
  password_field_identifier = '[data-test="password"]';
  login_button_identifier = '[data-test="login-button"]';
  error_message_identifier = '[data-test="error"]';
  error_button_identifier = '[data-test="error-button"]';

  // Action methods for Login Page web elements

  enterUsername(value) {
    ca.enterValueInfield(this.username_field_identifier, value);
  }

  enterPassword(value) {
    ca.enterValueInfield(this.password_field_identifier, value);
  }

  clickOnLogIn() {
    ca.clickOnWebElement(this.login_button_identifier);
  }

  login(username, password) {
    cy.get(this.username_field_identifier).click().type(username);
    cy.get(this.password_field_identifier).click().type(password);
    cy.get(this.login_button_identifier).click();
  }

  verifyErrorMessageContent(message) {
    ca.verifyWebElementContainsMessage(this.error_message_identifier, message);
  }

  // verify that all images of inventory items point to the same image
  verifyInventoryImagesIdentical(value, url) {
    cy.get(value).each(($img) => {
      expect($img).to.have.attr("src", url);
    });
  }
}
