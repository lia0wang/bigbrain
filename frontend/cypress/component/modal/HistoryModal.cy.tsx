import React from "react";
import { MemoryRouter } from "react-router-dom";
import HistoryModal from "../../../src/modal/HistoryModal";

describe("<HistoryModal />", () => {
  const quizId = 1;
  const gameTitle = "Test Game";
  const sessionIds = ["session-1", "session-2"];
  let onClose;
  beforeEach(() => {
    onClose = cy.stub();
    cy.mount(
      <MemoryRouter>
        <HistoryModal
          quizId={quizId}
          gameTitle={gameTitle}
          sessionIds={sessionIds}
          onClose={onClose}
        />
      </MemoryRouter>
    );
  });

  it("should render a list of session ids", () => {
    cy.get("li").should("have.length", sessionIds.length);
    sessionIds.forEach((sessionId) => {
      cy.get("li").should("contain", sessionId);
    });
  });

  it("should call onClose when close button is clicked", () => {
    cy.get("button")
      .click()
      .then(() => {
        expect(onClose).to.be.called;
      });
  });

  it("should render title", () => {
    cy.get("h2").should("have.text", "History Sessions");
  });

  it("should session ids displayed in order", () => {
    cy.get("li").each(($li, index) => {
      expect($li.text()).to.equal(sessionIds[index]);
    });
  });
});
