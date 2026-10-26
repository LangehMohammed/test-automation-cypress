import { CommonActions } from "../actions/CommonActions";
import { CheckoutSummaryPage } from "./CheckoutSummaryPage";

const checkoutsummarypage = new CheckoutSummaryPage();
const ca = new CommonActions();

export class CheckoutCompletePage {
  // Web Element identifiers for checkout complete page
  url = "/checkout-complete.html";
  page_title_identifier = '[data-test="title"';
  thank_you_placeholder_identifier = '[data-test="complete-header"]';
  generate_pdf_button_identifier = '[data-test="generate-pdf-order"]';
  back_to_product_button_identifier = '[data-test="back-to-products"]';

  // Action methods for Login Page web elements

  isCheckoutComplete(text) {
    cy.url().should("include", this.url);
    ca.verifyWebElementContainsMessage(
      this.thank_you_placeholder_identifier,
      text,
    );
  }
}
