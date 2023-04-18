import React from "react";
import AuthButton from "../../../src/component/auth/AuthButton";

describe("<AuthButton />", () => {
  const email = "test@test.com";
  const password = "password123";
  const buttonText = "Login";
  let mockFn;

  beforeEach(() => {
    mockFn = cy.stub();
    cy.mount(
      <AuthButton
        fn={mockFn}
        email={email}
        password={password}
        innerText={buttonText}
      />
    );
  });

  describe("Rendering", () => {
    it("should render a button with the correct text", () => {
      cy.get("button").should("have.text", buttonText);
    });

    it("should apply correct button styles", () => {
      cy.get("button")
        .should("have.class", "w-[80%]")
        .should("have.class", "h-[55px]")
        .should("have.class", "drop-shadow-lg");
    });
  });

  describe("Functionality", () => {
    it("should call provided function with email and password when clicked", () => {
      cy.get("button")
        .click()
        .then(() => {
          expect(mockFn).to.be.calledWith(email, password);
        });
    });
  });
});
