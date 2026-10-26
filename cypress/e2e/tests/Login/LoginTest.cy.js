import { CommonActions } from "../../actions/CommonActions";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";

const loginpage = new LoginPage();
const inventorypage = new InventoryPage();
const ca = new CommonActions();

let test_file_path = "login/login_testdata.json";

describe("Login Feature", () => {
  let testData = null;

  before(() => {
    //Loading the test Data from fixture
    cy.fixture(test_file_path).then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it("Verify Login Page", () => {
    cy.contains("Swag Labs");
  });

  // Verify that login works for standard users.
  it("Verify login for standard user", () => {
    loginpage.login(
      testData.credentials.standard_user.username,
      testData.credentials.standard_user.password,
    );

    // Verify that we have been loged In
    inventorypage.isInventoryPage();
  });

  // Verify user with username locked_out_user cannot login
  it("Verify user with username locked_out_user cannot login", () => {
    loginpage.login(
      testData.credentials.locked_out_user.username,
      testData.credentials.locked_out_user.password,
    );

    // Check if error message is displayed
    loginpage.verifyErrorMessageContent(
      testData.expected.messages.lockedouterror,
    );
  });

  // Verify invalid username with correct password cannot login
  it("Verify invalid username", () => {
    loginpage.login(
      testData.credentials.invalid_user.username,
      testData.credentials.standard_user.password,
    );

    // Check if error message is displayed
    loginpage.verifyErrorMessageContent(testData.expected.messages.error);
  });

  // Verify valid user with invalid password cannot login
  it("Verify invalid possword", () => {
    loginpage.login(
      testData.credentials.standard_user.username,
      testData.credentials.invalid_user.password,
    );

    // Check if error message is displayed
    loginpage.verifyErrorMessageContent(testData.expected.messages.error);
  });

  // Verify an error is displayed when credentials are not provided
  it("Verify credentials not provided", () => {
    loginpage.clickOnLogIn();

    // Check if error message is displayed
    loginpage.verifyErrorMessageContent(testData.expected.messages.nousername);
  });

  // Verify an error is displayed when a username is not provided
  it("Verify username not provided", () => {
    loginpage.enterPassword(testData.credentials.standard_user.password);
    loginpage.clickOnLogIn();

    // Check if error message is displayed
    loginpage.verifyErrorMessageContent(testData.expected.messages.nousername);
  });

  // Verify an error is displayed when a password is not provided
  it("Verify password not provided", () => {
    loginpage.enterUsername(testData.credentials.standard_user.username);
    loginpage.clickOnLogIn();

    // Check if error message is displayed
    loginpage.verifyErrorMessageContent(testData.expected.messages.nopassword);
  });

  // Verify sucessful login for problem user
  it("Verify login for problem user", () => {
    loginpage.login(
      testData.credentials.problem_user.username,
      testData.credentials.problem_user.password,
    );

    // Verify that we have been loged In
    inventorypage.isInventoryPage();

    // Asert all images of inventory items point to the same image
    loginpage.verifyInventoryImagesIdentical(
      inventorypage.inventory_item_image_identifier,
      testData.expected.assets.imgurl,
    );
  });

  // Verify successful login for performance glitch user
  it("Verify login for performance glitch user", () => {
    loginpage.login(
      testData.credentials.performance_glitch_user.username,
      testData.credentials.performance_glitch_user.password,
    );

    // Asert the page takes longer than 2 seconds to load
    ca.verifyTimeGapForPageLoad(
      inventorypage.url,
      inventorypage.page_title_identifier,
      2,
    );
  });

  // Verify successful login for error_user
  it("Verify login for error user", () => {
    loginpage.login(
      testData.credentials.error_user.username,
      testData.credentials.error_user.password,
    );

    // Verify that we have been loged In
    inventorypage.isInventoryPage();

    // Assert alert message
    ca.assertAlertMessage(testData.expected.messages.alert);

    // Select second option from the filter dropdown
    ca.selectValueFromDropdownList(
      inventorypage.filter_button_identifier,
      testData.dropdownoptions.z_to_a,
    );
  });

  // Verify successful login for visual user
  it("Verify login for visual user", () => {
    loginpage.login(
      testData.credentials.visual_user.username,
      testData.credentials.visual_user.password,
    );

    // Verify that we have been loged In
    inventorypage.isInventoryPage();

    // Check if shoping cart icon is overflowing
    ca.verifyWebElementOverflows(inventorypage.shopping_cart_button_identifier);
  });

  // Verify that error close button closes the error pop up message
  it("Verify close error button works", () => {
    // Verify that the error pop up message is not visible
    ca.verifyWebElementDoesNotExist(loginpage.error_message_identifier);

    loginpage.clickOnLogIn();

    // Verify the error close button is visible
    ca.verifyWebElementExist(loginpage.error_button_identifier);

    ca.clickOnWebElement(loginpage.error_button_identifier);

    // Verify that the error pop up message is no longer visible
    ca.verifyWebElementDoesNotExist(loginpage.error_message_identifier);
  });
});
