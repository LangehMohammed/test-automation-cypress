/// <reference types="Cypress" />

import { CommonActions } from "../actions/CommonActions";
import { CartPage } from "./CartPage";
import { CheckoutInfoPage } from "./CheckoutInfoPage";

const cartpage = new CartPage();
const checkoutinfopage = new CheckoutInfoPage();
const ca = new CommonActions();

export class CheckoutSummaryPage {
  // Web element identifiers for checkout summary page
  url = "/checkout-step-two.html";
  check_out_item_name_identifier = '[data-test="inventory-item-name"]';
  check_out_item_price_identifier = '[data-test="inventory-item-price"]';
  item_total_identifier = '[data-test="subtotal-label"]';
  subtotal_identifier = '[data-test="subtotal-label"]';
  finsh_button_identifier = '[data-test="finish"]';
  cancle_button_identifier = '[data-test="cancel"]';

  // Action methods for Login Page web elements

  isCheckoutSummaryPage() {
    cy.url().should("include", this.url);
  }

  verifyItemCount() {
    ca.getInventoryItemNames(this.check_out_item_name_identifier).then(
      (items) => {
        const itemCount = items.length;

        // Verify that badge count equals item count
        cy.get(cartpage.shopping_cart_badge_identifier)
          .should("be.visible")
          .and("have.text", `${itemCount}`);
      },
    );
  }

  veriyItemsMatch(firstname, lastname, postalcode) {
    ca.getInventoryItemNames(cartpage.cart_item_name_identifier).then(
      (itemNames) => {
        // Capture cart items
        const cartItems = itemNames;

        // Continue to checkout info
        ca.clickOnWebElement(cartpage.checkout_button_identifier);

        // Continue to checkout summary
        checkoutinfopage.checkout(firstname, lastname, postalcode);

        // compare the overview items against the cart items
        ca.getInventoryItemNames(this.check_out_item_name_identifier).then(
          (overview) => {
            const overviewItems = overview;

            // Verify items match
            expect(overviewItems).to.deep.equal(cartItems);
          },
        );
      },
    );
  }

  verifyItemsTotalPrice() {
    ca.getInventoryItemPrices(this.check_out_item_price_identifier).then(
      (prices) => {
        // Calculate subtotal
        const subtotalInCents = prices.reduce(
          (sum, price) => sum + Math.round(price * 100),
          0,
        );

        const expectedSubtotal = (subtotalInCents / 100).toFixed(2);

        // Verify the subtotal displayed on the page
        cy.get(this.subtotal_identifier).should(
          "have.text",
          `Item total: $${expectedSubtotal}`,
        );
      },
    );
  }
}
