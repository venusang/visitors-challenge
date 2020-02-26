import { Factory } from "ember-cli-mirage";

export default Factory.extend({
  name(i) {
    return `First${i} Last${i}`;
  },

  notes(i) {
    return `Notes${i} 😊🍕 🍣`;
  },

  sign_out() {
    return null;
  }
});
