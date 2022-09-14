import { action, observable } from "mobx";

class Mob {
  @observable public count: number = 0;

  @action public increaseCount() {
    this.count++;
  }
}

export const mob = new Mob();