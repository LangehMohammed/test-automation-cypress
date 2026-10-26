import { CommonActions } from "../actions/CommonActions";
import { CartPage } from "./CartPage";

const ca = new CommonActions();
const cartpage = new CartPage();

export class InventoryPage {
  // Web element identifiers for Inventory Page
  url = "/inventory.html";
  page_title_identifier = '[data-test="title"]';
  filter_button_identifier = '[data-test="product-sort-container"]';

  // Web element identifiers for top navigation bar
  burger_menu_button_identifier = "button#react-burger-menu-btn";
  close_menu_button_identifier = "div.bm-cross-button";
  menu_identifer = "div.bm-menu-wrap";
  menu_item_inventory = '[data-test="inventory-sidebar-link"]';
  menu_item_dynamic_catalog = '[data-test="dynamic-catalog-sidebar-link]"';
  menu_item_dynamic_catalog_submenu = '[data-test="dynamic-catalog-submenu"]';
  menu_item_dynamic_catalog_submenu_lazy_load =
    '[data-test="dynamic-catalog-lazy-load-link"]';
  menu_item_dynamic_catalog_submenu_spinner =
    '[data-test="dynamic-catalog-spinner-link"]';
  menu_item_dynamic_catalog_submenu_slider =
    '[data-test="dynamic-catalog-lazy-slider"]';
  menu_item_logout = '[data-test="logout-sidebar-link"]';

  shopping_cart_button_identifier = "div#shopping_cart_container";
  shopping_cart_badge_identifier = '[data-test="shopping-cart-badge"]';

  // Web element identifiers for product items
  inventory_list_identifier = '[data-test="inventory-list"]';
  inventory_item_identifier = '[data-test="inventory-item"]';
  inventory_item_image_identifier =
    '[data-test="inventory-item"] img.inventory_item_img';
  inventory_item_name_identifier = '[data-test="inventory-item-name"]';
  inventory_item_price_identifier = '[data-test="inventory-item-price"]';
  inventory_item_cart_button_identifier =
    '[data-test="inventory-item-description"] button.btn_inventory ';

  // Web element indentifiers for profuct detials page
  product_item_identifier = '[data-test="inventory-item-name"]';
  back_to_inventory_button_identifier = '[data-test="back-to-products"]';

  // Action methods for Login Page web elements

  isInventoryPage() {
    cy.url().should("include", this.url);
  }

  // Verify inventory items are sorted
  verifyInventoryItemsSorted(sortby, selector) {
    switch (sortby) {
      case "az":
        ca.getInventoryItemNames(selector).then((actualNames) => {
          const expectedNames = [...actualNames].sort((a, b) =>
            a.localeCompare(b),
          );

          expect(actualNames).to.deep.equal(expectedNames);
        });
        break;

      case "za":
        ca.getInventoryItemNames(selector).then((actualNames) => {
          const expectedNames = [...actualNames].sort((a, b) =>
            b.localeCompare(a),
          );

          expect(actualNames).to.deep.equal(expectedNames);
        });
        break;

      case "lohi":
        ca.getInventoryItemPrices(selector).then((actualPrices) => {
          const expectedPrices = [...actualPrices].sort((a, b) => a - b);

          expect(actualPrices).to.deep.equal(expectedPrices);
        });
        break;

      case "hilo":
        ca.getInventoryItemPrices(selector).then((actualPrices) => {
          const expectedPrices = [...actualPrices].sort((a, b) => b - a);

          expect(actualPrices).to.deep.equal(expectedPrices);
        });
        break;

      default:
        throw new Error(`Unsupported sort option: ${sortby}`);
    }
  }

  // Verify sorting filter works per sort option
  verifySortingFilter(sortby, itemselector) {
    // Select filter option
    ca.selectValueFromDropdownList(this.filter_button_identifier, sortby);

    // Assert items are sorted as per filter option
    this.verifyInventoryItemsSorted(sortby, itemselector);
  }

  // Verify that item redirects to it's product page
  vefifyItemNameRedirctProduct(
    inventory_element_identifier,
    product_element_identifier,
  ) {
    ca.getInventoryItemNames(inventory_element_identifier).then((itemNames) => {
      itemNames.forEach((label) => {
        cy.get(inventory_element_identifier).contains(label).click();

        // Verify the correct product is displayed
        cy.get(product_element_identifier)
          .should("be.visible")
          .and("have.text", label);

        // Return to the inventory page
        ca.clickOnWebElement(this.back_to_inventory_button_identifier);

        // Wait for inventory items to be available again
        cy.get(this.page_title_identifier).should("be.visible");
      });
    });
  }

  // Verify that item image redirects to its product page
  verifyItemImageRedirectProduct(
    inventory_image_identifier,
    product_image_identifier,
  ) {
    ca.getInventoryImageUrls(inventory_image_identifier).then((imageUrls) => {
      imageUrls.forEach((imageUrl, index) => {
        // Click the inventory item's image
        cy.get(inventory_image_identifier).eq(index).click();

        // Verify the correct product image is displayed
        cy.get(product_image_identifier)
          .should("be.visible")
          .and("have.attr", "src", imageUrl);

        // Return to the inventory page
        ca.clickOnWebElement(this.back_to_inventory_button_identifier);

        // Verify inventory page is available again
        cy.get(this.page_title_identifier).should("be.visible");
      });
    });
  }

  // Verify add to cart works
  verifyAddToCart() {
    let index = 0;
    let badgeCount = 1;
    ca.getInventoryItemNames(this.inventory_item_name_identifier).then(
      (itemNames) => {
        itemNames.forEach((label) => {
          // Find the inventory item containing this product
          cy.get(this.inventory_item_name_identifier)
            .contains(label)
            .parents(this.inventory_item_identifier)
            .within(() => {
              // Click the Add to Cart button for this product
              ca.clickOnWebElement(this.inventory_item_cart_button_identifier);

              // Verify the Add to Cart button no loger exist
              ca.verifyWebElementDoesNotContianText(
                this.inventory_item_cart_button_identifier,
                "Add to cart",
              );

              // Veriry the Remove from Cart button exist
              ca.verifyWebElementContainText(
                this.inventory_item_cart_button_identifier,
                "Remove",
              );
            });

          // Verify the cart count
          cy.get(this.shopping_cart_badge_identifier).should(
            "have.text",
            `${badgeCount}`,
          );

          // Open the cart
          ca.clickOnWebElement(this.shopping_cart_button_identifier);

          // Verify the selected product is in the cart
          cy.get(this.product_item_identifier)
            .eq(index)
            .should("have.text", label);

          // Return to the inventory page
          ca.clickOnWebElement(cartpage.continue_shopping_button_identifier);

          // Confirm inventory items are available for the next iteration
          cy.get(this.inventory_item_name_identifier).should(
            "have.length",
            itemNames.length,
          );

          index += 1;
          badgeCount += 1;
        });
      },
    );
  }

  verifyRemoveFromCart(selector) {
    let count = 0;

    ca.getInventoryItemNames(this.inventory_item_name_identifier).then(
      (itemNames) => {
        count = itemNames.length - 1;

        itemNames.forEach((label) => {
          // Find the inventory item containing this product
          cy.get(this.inventory_item_name_identifier)
            .contains(label)
            .parents(this.inventory_item_identifier)
            .within(() => {
              // Click the Remove from Cart button for this product
              ca.clickOnWebElement(selector);
            });

          if (count > 0) {
            // Verify the cart badge
            cy.get(this.shopping_cart_badge_identifier)
              .should("be.visible")
              .and("have.text", `${count}`);

            ca.clickOnWebElement(this.shopping_cart_button_identifier);

            //Verify the removed product is no longer in cart
            cy.get(this.inventory_item_name_identifier)
              .contains(label)
              .should("not.exist");

            ca.clickOnWebElement(cartpage.continue_shopping_button_identifier);
          } else {
            ca.verifyWebElementDoesNotExist(
              this.shopping_cart_badge_identifier,
            );

            ca.clickOnWebElement(this.shopping_cart_button_identifier);
            // Verify they are no items in cart
            ca.verifyWebElementDoesNotExist(this.inventory_item_identifier);

            ca.clickOnWebElement(cartpage.continue_shopping_button_identifier);
          }

          count -= 1;
        });
      },
    );
  }
}
