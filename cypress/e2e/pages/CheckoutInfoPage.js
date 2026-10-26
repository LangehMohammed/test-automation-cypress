/// <reference types="Cypress" />

import { CommonActions } from "../actions/CommonActions";

const ca = new CommonActions();

export class CheckoutInfoPage {
  // Web element indentifier for checkout information page
  url = "/checkout-step-one.html";
  // Web element identifiers for checkout information form
  first_name_input_identifier = '[data-test="firstName"]';
  last_name_input_identifier = '[data-test="lastName"]';
  postal_code_input_identifier = '[data-test="postalCode"]';
  error_field_identifier = '[data-test="error"]';
  continue_button_identifier = '[data-test="continue"]';

  // Action methods for Login Page web elements

  enterFirstname(value) {
    ca.enterValueInfield(this.first_name_input_identifier, value);
  }

  enterLastname(value) {
    ca.enterValueInfield(this.last_name_input_identifier, value);
  }

  enterPostalcode(value) {
    ca.enterValueInfield(this.postal_code_input_identifier, value);
  }

  clickOnContinue() {
    ca.clickOnWebElement(this.continue_button_identifier);
  }

  verifyErrorMessageContent(message) {
    ca.verifyWebElementContainsMessage(this.error_field_identifier, message);
  }

  clearFormData() {
    ca.clearField(this.first_name_input_identifier);
    ca.clearField(this.last_name_input_identifier);
    ca.clearField(this.postal_code_input_identifier);
  }

  checkout(firstname, lastname, postalcode) {
    cy.get(this.first_name_input_identifier).click().clear().type(firstname);
    cy.get(this.last_name_input_identifier).click().clear().type(lastname);
    cy.get(this.postal_code_input_identifier).click().clear().type(postalcode);

    ca.clickOnWebElement(this.continue_button_identifier);
  }
}
