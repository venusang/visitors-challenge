import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | sign-out-button", function(hooks) {
  setupRenderingTest(hooks);

  test("As a Cool Chip employee that is viewing the visitors list, when I click the Sign out button for specific visitor, the visitor is marked as signed out", async function(assert) {
    await render(hbs`<SignOutButton />`);
    this.setProperties({
      mockVisitor: [
        {
          name: "Captain Crunch",
          notes: "I like sailing and fishing",
          sign_out: null
        }
      ]
    });

    // Template block usage:
    // await render(hbs`
    //   <VisitorsList @model={{this.mockVisitor}} />
    // `);
    await render(hbs`
      <SignOutButton @entry={{this.mockVisitor}} />
    `);
    await click(".sign-out-btn");
    //line 30 is failing - probably has to do with concurrency
    assert.dom(".visitor-sign-out").exists();
  });
});
