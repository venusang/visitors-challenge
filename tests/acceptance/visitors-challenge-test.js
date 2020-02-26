import {
  click,
  fillIn,
  visit,
  findAll,
  triggerKeyEvent
} from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";

import { module, test } from "qunit";

function setUpServer(server) {
  server.createList("entry", 3);
}

module("Acceptance | visitors-challenge", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("View All Entries: I can view all visitors who have been signed-in", async function(assert) {
    setUpServer(this.server);
    await visit("/");
    assert.dom("[data-test-id='entry-row']").exists({ count: 3 });
  });

  test("Sign-In: The user can add a new visitor to the current visitors list", async function(assert) {
    setUpServer(this.server);
    await visit("/");
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
  test("Search: The user can search the current visitors list and the list will only show visitors who are not signed out", async function(assert) {
    setUpServer(this.server);
    await visit("/");
    await click(".sign-out-btn");

    await fillIn("input.search-text", "Signed out");
    await triggerKeyEvent("input.search-text", "keyup", 83);

    let allEntries = findAll("[data-test-id='entry-row']");
    let signOutText = findAll("[data-test-id='visitor-sign-out']")[0];
    allEntries.forEach(() => {
      assert.dom("[data-test-id='entry-row']").exists();
      assert.dom(signOutText).hasText(signOutText.innerText);
    });
  });
});
