import Component from "@glimmer/component";
import { action } from "@ember/object";
import { task, timeout } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default class SignOutButtonComponent extends Component {
  @service store;

  @(task(function*(entry) {
    let ts = new Date();
    let date = ts.toLocaleDateString();
    let time = ts.toLocaleTimeString();

    yield timeout(1000);

    this.store
      .findRecord("entry", entry.id, { backgroundReload: false })
      .then(function(entry) {
        entry.sign_out = `${date} ${time}`;
        entry.save();
      });
  }).drop())
  signOutTask;

  @action
  async signOut(entry) {
    this.signOutTask.perform(entry);
  }
}
