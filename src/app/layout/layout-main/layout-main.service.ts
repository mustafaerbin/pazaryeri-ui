import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutMainService {

  get menuOverlayHidden(): boolean {
    return this._menuOverlayHidden;
  }

  set menuOverlayHidden(value: boolean) {
    this._menuOverlayHidden = value;
  }

  private _menuOverlayHidden = true;

}
