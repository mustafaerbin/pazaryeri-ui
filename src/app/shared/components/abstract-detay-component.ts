import {AppStore} from "../utils/app.store";
import {AbstractComponent} from "./abstract-component";

export abstract class AbstractDetayComponent extends AbstractComponent {

  constructor(appStore: AppStore) {
    super(appStore);
  }
}
