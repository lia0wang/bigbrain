import React from "react";
import AuthPassword from "../../../src/component/auth/AuthPassword";

describe("<AuthPassword />", () => {
  const password = "password123";
  let setPassword;

  beforeEach(() => {
    setPassword = cy.stub();
    cy.mount(<AuthPassword password={password} setPassword={setPassword} />);
  });

  it("should render a password input field with the correct label", () => {
    cy.get('input[type="password"]').should("have.attr", "id", "password");
    cy.get("label").should("have.text", "Password");
  });

  it("should render a label has the correct class", () => {
    cy.get("label").should("have.class", "MuiFormLabel-colorPrimary");
    cy.get("label").should("have.class", "MuiInputLabel-outlined");
    cy.get("label").should("have.class", "MuiInputLabel-shrink");
    cy.get("label").should("have.class", "MuiInputLabel-formControl");
  });

  it("should render a password input field with the correct class", () => {
    cy.get('input[type="password"]').should("have.class", "MuiInputBase-input");
    cy.get('input[type="password"]').should(
      "have.class",
      "MuiOutlinedInput-input"
    );
    cy.get('input[type="password"]').should(
      "have.class",
      "MuiInputBase-inputAdornedEnd"
    );
    cy.get('input[type="password"]').should(
      "have.class",
      "css-nxo287-MuiInputBase-input-MuiOutlinedInput-input"
    );
  });

  it("should render a IconButton with the correct class", () => {
    cy.get("button").should("have.class", "MuiButtonBase-root");
    cy.get("button").should("have.class", "MuiIconButton-root");
    cy.get("button").should("have.class", "MuiIconButton-edgeEnd");
    cy.get("button").should("have.class", "MuiIconButton-sizeMedium");
    cy.get("button").should(
      "have.class",
      "css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root"
    );
  });
});
