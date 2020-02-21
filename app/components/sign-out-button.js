import Component from "@glimmer/component";
import { action } from "@ember/object";
import { task, timeout } from "ember-concurrency";

export default class SignOutButtonComponent extends Component {
  @(task(function*(entry) {
    let ts = new Date();
    let date = ts.toLocaleDateString();
    let time = ts.toLocaleTimeString();
    yield timeout(1000);
    entry.sign_out = `${date} ${time}`;
  }).drop())
  signOutTask;

  @action
  signOut(entry) {
    this.signOutTask.perform(entry);
  }
}
