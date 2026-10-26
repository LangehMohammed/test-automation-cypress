export class CommonActions {
  clickOnWebElementWithIndex(webelement_identifier, index) {
    cy.get(webelement_identifier).eq(index).click();
  }

  // click on a web element
  clickOnWebElement(webelement_identifier) {
    cy.get(webelement_identifier).should("be.visible").click();
  }

  // clear input field
  clearField(webelement_identifier) {
    cy.get(webelement_identifier).clear();
  }

  // enter value into a field
  enterValueInfield(webelement_identifier, value) {
    cy.get(webelement_identifier).clear().type(value);
  }

  // assert that a web element contains a message
  verifyWebElementContainsMessage(webelement_identifier, value) {
    cy.get(webelement_identifier).should("contain", value);
  }

  // assert that a web element exists in the DOM
  verifyWebElementExist(webelement_identifier) {
    cy.get(webelement_identifier).should("exist");
  }

  // assert the web element contians text
  verifyWebElementContainText(webelement_identifier, text) {
    cy.get(webelement_identifier).should("contain", text);
  }

  // assert the web element does not contian text
  verifyWebElementDoesNotContianText(webelement_identifier, text) {
    cy.get(webelement_identifier).should("not.contain", text);
  }

  // assert that a web element does not exist in the DOM
  verifyWebElementDoesNotExist(webelement_identifier) {
    cy.get(webelement_identifier).should("not.exist");
  }

  // assert that a web element is visible
  verifyWebElementIsVisible(webelement_identifier) {
    cy.get(webelement_identifier).should("be.visible");
  }

  // assert that a web element is not visible
  verifyWebElementIsNotVisible(webelement_identifier) {
    cy.get(webelement_identifier).should("not.be.visible");
  }

  // assert a web element does not overflow out of it's parent
  verifyWebElementOverflows(value) {
    cy.get(value).then(($child) => {
      // Get the child element's parent container
      const $parent = $child.parent();

      // Get bounding rectangles for both elements
      const childRect = $child[0].getBoundingClientRect();
      const parentRect = $parent[0].getBoundingClientRect();

      // Assert that the child extends past any of the parent's boundaries
      const isOverflowing =
        childRect.right > parentRect.right ||
        childRect.bottom > parentRect.bottom ||
        childRect.left < parentRect.left ||
        childRect.top < parentRect.top;

      expect(isOverflowing).to.be.true;
    });
  }

  // assert alert message
  assertAlertMessage(message) {
    // Assert alert contains right message
    cy.on("window:alert", (str) => {
      expect(str).to.equals(message);
    });
  }

  // select a value from a dropdwon element
  selectValueFromDropdownList(webelement_identifier, value) {
    cy.get(webelement_identifier).should("be.visible").select(value);
    //.should("have.value", value);
  }

  // verify a page is taking longer than expected to load
  verifyTimeGapForPageLoad(url, pageIdentifier, expectedTime) {
    let urlChangedTime;

    // verify that we are on the page and log the timestamp
    cy.url()
      .should("include", url)
      .then(() => {
        urlChangedTime = performance.now();
      });

    // wait for the page identifier element on the page to load
    cy.get(pageIdentifier)
      .should("be.visible")
      .then(() => {
        const pageLoadedTime = performance.now();
        const renderingDuration = pageLoadedTime - urlChangedTime;

        // assert that the delay is longer than expected time
        expect(renderingDuration).to.be.greaterThan(expectedTime);
      });
  }

  getInventoryItemNames(selector) {
    return cy
      .get(selector)
      .should("have.length.greaterThan", 0)
      .then(($items) => {
        return [...$items].map((element) => element.innerText.trim());
      });
  }

  getInventoryItemPrices(selector) {
    return this.getInventoryItemNames(selector).then((prices) => {
      return prices.map((price) => Number(price.replace("$", "").trim()));
    });
  }

  getInventoryImageUrls(selector) {
    return cy
      .get(selector)
      .should("have.length.greaterThan", 0)
      .then(($items) => {
        return [...$items].map((image) => image.getAttribute("src"));
      });
  }
}
