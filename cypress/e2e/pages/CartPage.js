import { CommonActions } from "../actions/CommonActions";

const ca = new CommonActions();

export class CartPage {
  // Web element identifiers for cart page
  shopping_cart_button_identifier = "div#shopping_cart_container";
  shopping_cart_badge_identifier = '[data-test="shopping-cart-badge"]';

  // Cart items web element identifiers
  cart_item_identifier = '[data-test="inventory-item"]';
  cart_item_name_identifier = '[data-test="inventory-item-name"]';
  remove_item_from_cart_button_identifier = "button.cart_button";
  checkout_button_identifier = '[data-test="checkout"]';
  continue_shopping_button_identifier = '[data-test="continue-shopping"]';

  // Action methods for Login Page web elements

  verifyRemoveFromCart() {
    let count = 0;

    ca.getInventoryItemNames(this.cart_item_name_identifier).then(
      (itemNames) => {
        count = itemNames.length - 1;

        itemNames.forEach((label) => {
          // Find the inventory item containing this product
          cy.get(this.cart_item_name_identifier)
            .contains(label)
            .parents(this.cart_item_identifier)
            .within(() => {
              // Click the Remove from Cart button for this product
              ca.clickOnWebElement(
                this.remove_item_from_cart_button_identifier,
              );
            });

          if (count > 0) {
            // Verify the cart badge
            cy.get(this.shopping_cart_badge_identifier)
              .should("be.visible")
              .and("have.text", `${count}`);

            //Verify the removed product is no longer in cart
            cy.get(this.cart_item_name_identifier)
              .contains(label)
              .should("not.exist");
          } else {
            ca.verifyWebElementDoesNotExist(
              this.shopping_cart_badge_identifier,
            );
            // Verify they are no items in cart
            ca.verifyWebElementDoesNotExist(this.cart_item_identifier);
          }

          count -= 1;
        });
      },
    );
  }
}
