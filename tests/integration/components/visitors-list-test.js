import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | visitors-list", function(hooks) {
  setupRenderingTest(hooks);

  test("As I am a Cool Chip employee, when I open the application, I can see a list of all Cool Chip visitors", async function(assert) {
    await render(hbs`<VisitorsList />`);
    this.setProperties({
      mockFiles: [
        {
          name: "Captain Crunch",
          notes: "I like sailing and fishing",
          sign_out: "laterzz"
        },
        {
          name: "Popeye",
          notes: "Me likes spinach - aye",
          sign_out: "peace out mates"
        }
      ]
    });

    // Template block usage:
    await render(hbs`
      <VisitorsList @model={{this.mockFiles}} />
    `);

    assert.dom(".visitor-name").hasText("Captain Crunch");
    assert.dom(".visitor-notes").hasText("I like sailing and fishing");
    assert.dom(".visitor-sign-out").hasText("laterzz");
  });
});
