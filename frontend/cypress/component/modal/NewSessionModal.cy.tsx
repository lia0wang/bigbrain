import React from "react";
import NewGameModal from "../../../src/modal/NewSessionModal";
import { FRONT_END_URL } from "../../../src/config";
import { MemoryRouter } from "react-router-dom";

describe("<NewGameModal />", () => {
  const gameTitle = "Test Game";
  const sessionId = "000000";
  const quizId = 1;
  let onClose;
  let navigate;

  beforeEach(() => {
    onClose = cy.stub();
    navigate = cy.stub();
    cy.mount(
      <MemoryRouter>
        <NewGameModal
          gameTitle={gameTitle}
          sessionId={sessionId}
          quizId={quizId}
          onClose={onClose}
        />
      </MemoryRouter>,
      {
        // Pass in stubbed functions and constants as props for testing
        // We will test if these functions are called with the correct arguments
        // during our tests
        stubs: {
          FRONT_END_URL,
          useNavigate: () => navigate,
          CopyToClipboard: ({ text, onCopy, children }) => (
            <button onClick={() => onCopy(text)}>{children}</button>
          ),
        },
      }
    );
  });

  it("should displays the game title and session id", () => {
    cy.get("h2").should("have.text", "Test Game Session ID");
    cy.get(".text-xl").should("have.text", "000000");
  });

  it("should calls onClose when the close button is clicked", () => {
    cy.get("button")
      .contains("Close")
      .click()
      .then(() => {
        expect(onClose).to.be.called;
      });
  });

  it("shoould copie seesion link has type button", () => {
    cy.get("button")
      .contains("COPY SESSION LINK")
      .should("have.attr", "type", "button");
  });

  it("should go to session admin page has type button", () => {
    cy.get("button")
      .contains("GO TO SESSION ADMIN PAGE")
      .should("have.attr", "type", "button");
  });

  it("should COPY button has correct class", () => {
    cy.get("button")
      .contains("COPY SESSION LINK")
        .should("have.class", "bg-blue-500")
        .should("have.class", "hover:bg-blue-400")
        .should("have.class", "text-white")
        .should("have.class", "font-bold")
        .should("have.class", "py-2")
        .should("have.class", "px-4")
        .should("have.class", "w-[200px]")
        .should("have.class", "border-b-4")
        .should("have.class", "border-blue-700")
        .should("have.class", "hover:border-blue-500")
        .should("have.class", "rounded");
  });

  it("should ADMIN button has correct class", () => {
    cy.get("button")
      .contains("GO TO SESSION ADMIN PAGE")
        .should("have.class", "bg-yellow-500")
        .should("have.class", "hover:bg-yellow-400")
        .should("have.class", "text-white")
        .should("have.class", "font-bold")
        .should("have.class", "py-2")
        .should("have.class", "px-4")
        .should("have.class", "w-[300px]")
        .should("have.class", "border-b-4")
        .should("have.class", "border-yellow-700")
        .should("have.class", "hover:border-yellow-500")
        .should("have.class", "rounded");
  });
  
  it("should Close button has correct class", () => {
    cy.get("button")
      .contains("Close")
        .should("have.class", "bg-white")
        .should("have.class", "hover:bg-gray-100")
        .should("have.class", "text-gray-800")
        .should("have.class", "font-semibold")
        .should("have.class", "py-2")
        .should("have.class", "px-4")
        .should("have.class", "w-[90px]")
        .should("have.class", "border")
        .should("have.class", "border-gray-400")
        .should("have.class", "rounded")
        .should("have.class", "shadow");
  });
});
