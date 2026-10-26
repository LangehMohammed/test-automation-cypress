/// <reference types="Cypress" />

import { CommonActions } from "../../actions/CommonActions";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";

let user_file_path = "user_testdata.json";
let test_file_path = "inventory/inventory_testdata.json";

const inventorypage = new InventoryPage();
const loginpage = new LoginPage();
const ca = new CommonActions();

describe("Inventory Features", () => {
  let userData = null;
  let testData = null;

  before(() => {
    cy.fixture(user_file_path).then((data) => {
      userData = data;
    });
    cy.fixture(test_file_path).then((data) => {
      testData = data;

      cy.visit("/");

      loginpage.login(
        userData.credentials.standard_user.username,
        userData.credentials.standard_user.password,
      );
    });
  });

  beforeEach(() => {
    inventorypage.isInventoryPage();
  });

  it("Verify inventory page", () => {
    inventorypage.isInventoryPage();
  });

  // Verify that the burger menu opens and closes
  it("Verify menu opens and closes", () => {
    // Verify menu is not visible
    ca.verifyWebElementIsNotVisible(inventorypage.menu_identifer);

    ca.clickOnWebElement(inventorypage.burger_menu_button_identifier);

    // Verify that menu is visible
    ca.verifyWebElementIsVisible(inventorypage.menu_identifer);

    ca.clickOnWebElement(inventorypage.close_menu_button_identifier);

    // Verify that the menu is no loger visible
    ca.verifyWebElementIsNotVisible(inventorypage.menu_identifer);
  });

  // Verify that sorting filter works for sorting Z to A
  it("Verify filtering for Name (Z to A)", () => {
    inventorypage.verifySortingFilter(
      testData.dropdownoptions.z_to_a,
      inventorypage.inventory_item_name_identifier,
    );
  });

  // Verify that sorting filter works for sorting form low to high price
  it("Verify filtering for Price (low to high)", () => {
    inventorypage.verifySortingFilter(
      testData.dropdownoptions.lowtohighprice,
      inventorypage.inventory_item_price_identifier,
    );
  });

  // Verify that sorting filter works for sorting form high to low price
  it("Verify filtering for Price (high to low)", () => {
    inventorypage.verifySortingFilter(
      testData.dropdownoptions.hightolowprice,
      inventorypage.inventory_item_price_identifier,
    );
  });

  // Verify that sorting filter works for sorting A to Z
  it("Verify filtering for Name (A to Z)", () => {
    inventorypage.verifySortingFilter(
      testData.dropdownoptions.a_to_z,
      inventorypage.inventory_item_name_identifier,
    );
  });

  // Verify that clicking on the item name redirects the user to the product details page of that item
  it("Verify item name redirects to product details page", () => {
    inventorypage.vefifyItemNameRedirctProduct(
      inventorypage.inventory_item_name_identifier,
      inventorypage.product_item_identifier,
    );
  });

  // Verify that clicking on the item image redirects the user to the product details page of that item
  it("Verify item image redirects to product details page", () => {
    inventorypage.verifyItemImageRedirectProduct(
      '[data-test="inventory-item"] img.inventory_item_img',
      ".inventory_details_img",
    );
  });

  // Verify that add to cart button works on inventory page
  it("Add to cart inventory", () => {
    // Verify the Add to Cart button exist
    ca.verifyWebElementContainText(
      inventorypage.inventory_item_cart_button_identifier,
      "Add to cart",
    );

    // Verify the shopping cart is empty
    ca.verifyWebElementDoesNotExist(
      inventorypage.shopping_cart_badge_identifier,
    );

    inventorypage.verifyAddToCart();
  });

  // Verify that remove from cart button works on the inventory page
  it("Remove form cart inventory", () => {
    // Verify the Remove button exist
    ca.verifyWebElementContainText(
      inventorypage.inventory_item_cart_button_identifier,
      "Remove",
    );

    // Verify the shopping cart is not empty
    ca.verifyWebElementExist(inventorypage.shopping_cart_badge_identifier);

    inventorypage.verifyRemoveFromCart(
      inventorypage.inventory_item_cart_button_identifier,
    );
  });
});
