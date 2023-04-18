import React from "react";
import EditFormControl from "../../../src/component/edit/EditFormControl";

describe("<EditFormControl />", () => {
  const select = "Test";
  const options = new Map<string, string>([["Test", "test"]]);
  let setSelect;

  beforeEach(() => {
    setSelect = cy.stub();
    cy.mount(
      <EditFormControl
        select={select}
        setSelect={setSelect}
        options={options}
      />
    );
  });

  it("should input label have id equal to select", () => {
    cy.get("label").should("have.attr", "id", select);
  });

  it("should input label have text equal to select", () => {
    cy.get("label").should("have.text", select);
  });

  it("should input label have correct class", () => {
    cy.get("label").should("have.class", "MuiFormLabel-root");
    cy.get("label").should("have.class", "MuiInputLabel-root");
    cy.get("label").should("have.class", "MuiInputLabel-formControl");
    cy.get("label").should("have.class", "MuiInputLabel-animated");
    cy.get("label").should("have.class", "MuiInputLabel-outlined");
    cy.get("label").should("have.class", "MuiInputLabel-shrink");
  });
});
