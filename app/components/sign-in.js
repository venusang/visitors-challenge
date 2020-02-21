import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class SignInComponent extends Component {
  @service store;
  @tracked firstName;
  @tracked lastName;
  @tracked notes;
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  get disabled() {
    if (!this.firstName || !this.lastName) {
      return true;
    } else {
      return false;
    }
  }

  @action
  addNewVisitor() {
    // let visitor =
    this.store.createRecord("entry", {
      name: this.name,
      notes: this.notes,
      sign_out: ""
    });

    //visitor.save();
    this.clearVisitorForm();
  }

  @action
  clearVisitorForm() {
    this.firstName = "";
    this.lastName = "";
    this.notes = "";
  }
}
