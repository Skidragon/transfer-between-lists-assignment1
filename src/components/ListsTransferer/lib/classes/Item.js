import uuidv1 from "uuid/v1";

export class Item {
  constructor({ isChecked = false, name = "" }) {
    this.isChecked = isChecked;
    this.name = name;
    this.id = uuidv1();
  }
}
