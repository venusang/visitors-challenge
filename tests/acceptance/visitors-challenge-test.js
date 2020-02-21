import { click, fillIn, visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | visitors-challenge", function(hooks) {
  setupApplicationTest(hooks);
  // Missing piece: I need to mock the API but can't figure out how to do it
  // assert.expect(1);
  //
  // server.post("/api/entries", function(schema) {
  //   const attributes = this.normalizedRequestAttrs();
  //   const expectedAttributes = {
  //     name: "some name",
  //     notes: "notes notes",
  //     sign_in: ""
  //   };
  //   assert.deepEqual(
  //     attributes,
  //     expectedAttributes,
  //     "attributes don't match the expected ones"
  //   );
  //   return schema.users.create(attributes);
  // });

  // I would also make sure a beforeEach type of statement is included once I set-up the mock server
  test("The user can add a new visitor to the current visitors list", async function(assert) {
    await visit("/");
    await fillIn("input#firstname", "Joe");
    await fillIn("input#lastname", "Coffee");
    await fillIn("notes#notes", "Joe likes coffee");
    await click(".save-btn");

    assert.dom(".visitor-name").hasText("Joe Coffee");
    assert.dom(".visitor-notes").hasText("Joe likes coffee");
    assert.dom(".visitor-sign-out").hasText("");
  });
  test("The user can search the current visitors list and the list will only show visitors who are not signed out", async function(assert) {
    await visit("/");
    await fillIn("input.search-text", "Signed out");
    // assuming the mock is this - providing one record just for berevity
    /***:

      mockData = [
        {
          name:'Samantha',
          notes: 'Smith',
          sign_in: 'its friday she is gone
        }
      ]

    **/
    assert.dom(".visitor-name").hasText("Samantha");
    assert.dom(".visitor-notes").hasText("Smith");
    assert.dom(".visitor-sign-out").hasText("its friday she is gone");
  });
});
