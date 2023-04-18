import React from "react";
import AuthNavigator from "../../../src/component/auth/AuthNavigator";

describe("<AuthNavigator />", () => {
  const navPath = "/register";
  const navText = "Register";
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = cy.stub();
    cy.mount(
      <AuthNavigator
        navPath={navPath}
        navText={navText}
        navigate={mockNavigate}
      />
    );
  });

  it("renders correctly", () => {
    cy.get(".flex").should("have.class", "flex-col");
    cy.get("p").should("have.text", "If you don't have an account.You can");
    cy.get("span").should("include.text", "Register Here!");
  });

  it("calls navigate function with navPath when span is clicked", () => {
    cy.get("span")
      .click()
      .then(() => {
        expect(mockNavigate).to.be.calledWith(navPath);
      });
  });

  it("applies correct styles to div", () => {
    cy.get(".flex")
      .should("have.class", "mt-[4%]")
      .should("have.class", "ml-[10%]")
      .should("have.class", "2xl:mt-[2%]");
  });

  it("applies correct styles to p", () => {
    cy.get("p")
      .should("have.class", "text-sm")
      .should("have.class", "font-normal")
      .should("have.class", "text-gray-600")
      .should("have.class", "2xl:text-xl");
  });

  it("applies correct styles to span", () => {
    cy.get("span")
      .should("have.class", "text-lg")
      .should("have.class", "font-semibold")
      .should("have.class", "text-blue-500")
      .should("have.class", "cursor-pointer")
      .should("have.class", "lg:text-lg")
      .should("have.class", "2xl:text-2xl");
  });
});
