import Add from "./Add.svelte";
import { mount } from "cypress-svelte-unit-test";

it("add city using form", () => {
  mount(Add, {
    callbacks: {
      add: cy.stub().as("add"),
    },
  });
  cy.get("input#city").type("Boston, MA");
  cy.get("button#add-btn").click();
  cy.get("@add")
    .should("be.called")
    .its("firstCall.args.0.detail")
    .should("deep.equal", { city: "Boston, MA" });
});