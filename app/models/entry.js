import Model, { attr } from "@ember-data/model";

export default class EntryModel extends Model {
  @attr name;
  @attr notes;
  @attr sign_out;
  @attr isIdle;
  get firstName() {
    return `firstName`;
  }
  get lastName() {
    return `lastName`;
  }
}
