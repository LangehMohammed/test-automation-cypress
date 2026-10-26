import { CommonActions } from "../actions/CommonActions";
import { CartPage } from "./CartPage";
import { InventoryPage } from "./InventoryPage";

const inventorypage = new InventoryPage();
const cartpage = new CartPage();
const ca = new CommonActions();

export class ProductPage {
  // Web element identifiers for Product page
  add_to_cart_button_identifier = '[data-test="add-to-cart"]';
  remove_from_cart_button_identifier = '[data-test="remove"]';

  // Verify add to cart button works on product page
  verifyAddToCart() {
    let index = 0;
    let badgeCount = 1;
    ca.getInventoryItemNames(inventorypage.inventory_item_name_identifier).then(
      (itemNames) => {
        itemNames.forEach((label) => {
          cy.get(inventorypage.inventory_item_name_identifier)
            .contains(label)
            .click();

          // click on add to cart button
          cy.get(this.add_to_cart_button_identifier)
            .should("be.visible")
            .click();

          // Verify the Add to Cart button no loger exist
          ca.verifyWebElementDoesNotExist(this.add_to_cart_button_identifier);

          // Veriry the Remove from Cart button exist
          ca.verifyWebElementExist(this.remove_from_cart_button_identifier);

          // Verify the cart count
          cy.get(inventorypage.shopping_cart_badge_identifier).should(
            "have.text",
            `${badgeCount}`,
          );

          // Open the cart
          ca.clickOnWebElement(inventorypage.shopping_cart_button_identifier);

          // Verify the selected product is in the cart
          cy.get(cartpage.cart_item_name_identifier)
            .eq(index)
            .should("have.text", label);

          // Return to the inventory page
          ca.clickOnWebElement(cartpage.continue_shopping_button_identifier);

          // Confirm inventory items are available for the next iteration
          cy.get(inventorypage.inventory_item_name_identifier).should(
            "have.length",
            itemNames.length,
          );

          index += 1;
          badgeCount += 1;
        });
      },
    );
  }

  // Verify remove from cart button works on product page
  verifyRemoveFromCart() {
    let count = 0;
    ca.getInventoryItemNames(inventorypage.inventory_item_name_identifier).then(
      (itemNames) => {
        count = itemNames.length - 1;

        itemNames.forEach((label) => {
          cy.get(inventorypage.inventory_item_name_identifier)
            .contains(label)
            .click();

          // click on remove from cart button
          cy.get(this.remove_from_cart_button_identifier)
            .should("be.visible")
            .click();

          // Verify the remove from Cart button no loger exist
          ca.verifyWebElementDoesNotExist(
            this.remove_from_cart_button_identifier,
          );

          // Veriry the Add to cart button exist
          ca.verifyWebElementExist(this.add_to_cart_button_identifier);

          if (count > 0) {
            // Verify the cart badge
            cy.get(inventorypage.shopping_cart_badge_identifier)
              .should("be.visible")
              .and("have.text", `${count}`);

            ca.clickOnWebElement(inventorypage.shopping_cart_button_identifier);

            //Verify the removed product is no longer in cart
            cy.get(inventorypage.inventory_item_name_identifier)
              .contains(label)
              .should("not.exist");

            ca.clickOnWebElement(cartpage.continue_shopping_button_identifier);
          } else {
            ca.verifyWebElementDoesNotExist(
              this.shopping_cart_badge_identifier,
            );

            ca.clickOnWebElement(inventorypage.shopping_cart_button_identifier);
            // Verify they are no items in cart
            ca.verifyWebElementDoesNotExist(cartpage.cart_item_identifier);

            ca.clickOnWebElement(cartpage.continue_shopping_button_identifier);
          }

          // Confirm inventory items are available for the next iteration
          cy.get(inventorypage.inventory_item_name_identifier).should(
            "have.length",
            itemNames.length,
          );

          count -= 1;
        });
      },
    );
  }
}
