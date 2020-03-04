import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  @tracked firstName;
  @tracked lastName;
  @tracked notes;

  @tracked searchText;
  @tracked filteredVisitors;
  @tracked result;

  get visitors() {
    return !this.filteredVisitors ? this.model : this.filteredVisitors;
  }

  @action
  searchVisitors(evt) {
    if (evt) {
      let text = evt.key.toLowerCase();
      if (text.startsWith("s")) {
        this.searchText = "Signed out";
        let allEntries = this.visitors;

        this.filteredVisitors = allEntries.filter(entry => entry.sign_out);
      }
    } else {
      this.filteredVisitors = "";
    }
  }
}
