import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class VisitorsListComponent extends Component {
  @tracked searchText;
  @tracked filteredVisitors;
  @tracked result;

  get visitors() {
    return !this.filteredVisitors ? this.args.model : this.filteredVisitors;
  }

  @action
  searchVisitors() {
    if (this.searchText) {
      let text = this.searchText.toLowerCase();
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
