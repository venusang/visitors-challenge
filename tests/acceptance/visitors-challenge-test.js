import {
  click,
  visit,
  fillIn,
  findAll,
  triggerKeyEvent
} from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";

import { module, test } from "qunit";

async function setUpServer(server) {
  server.createList("entry", 3);
  await visit("/");
}

module("Acceptance | visitors-challenge", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Listing visitors: I can view all visitors who have been signed-in", async function(assert) {
    await setUpServer(this.server);
    assert.dom("[data-test-id='entry-row']").exists({ count: 3 });
  });

  test("Add a new visitor: As a Cool Chip Employee that is viewing the visitors list, when I click `Add a New Visitor` and I provide the first name, last name and notes about the visitor, and I choose to save, Then I see the new visitor added to the list of all visitors that is not signed out.", async function(assert) {
    await setUpServer(this.server);
    await fillIn("input#firstname", "Joe");
    await fillIn("input#lastname", "Coffee");
    await fillIn("input#notes", "Joe likes coffee");
    await click(".save-btn");

    assert.deepEqual(
      findAll("[data-test-id='visitor-name']").lastObject.textContent,
      "Joe Coffee"
    );

    assert.deepEqual(
      findAll("[data-test-id='visitor-notes']").lastObject.textContent,
      "Joe likes coffee"
    );

    assert.deepEqual(
      findAll("[data-test-id='visitor-sign-out']").lastObject.textContent,
      ""
    );
  });

  test("Signing out visitors: As a Cool Chip employee that is viewing the visitors list, when I click the Sign Out button for a specific visitor, then the visitor is marked as signed out", async function(assert) {
    await setUpServer(this.server);
    await click(".sign-out-btn");
    let signOutText = findAll("[data-test-id='visitor-sign-out']")[0];
    assert.dom(".visitor-sign-out").hasText(signOutText.innerHTML);
  });

  test("Search: The user can search the current visitors list and the list will only show visitors who are not signed out", async function(assert) {
    await setUpServer(this.server);
    await click(".sign-out-btn");

    await fillIn("input.search-text", "Signed out");
    await triggerKeyEvent("input.search-text", "keyup", 83);

    let allEntries = findAll("[data-test-id='entry-row']");
    let signOutText = findAll("[data-test-id='visitor-sign-out']")[0];
    allEntries.forEach(() => {
      assert.dom("[data-test-id='entry-row']").exists({ count: 1 });
      assert.dom(signOutText).hasText(signOutText.innerHTML);
    });
  });
});
