import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { AbstractStore } from '../../../../shared/utils/abstract-store';
import { HedefSorguSonucu } from '../dto/hedef-sorgu-sonucu';


@Injectable()
export class HedefStore extends AbstractStore {

  private _sorguSonuclari: BehaviorSubject<HedefSorguSonucu[]> = new BehaviorSubject([]);
  public readonly sorguSonuclari: Observable<HedefSorguSonucu[]> = this._sorguSonuclari.asObservable();

  constructor() {
    super();
  }

  public set(sorguSonuclari: HedefSorguSonucu[]) {
    this._sorguSonuclari.next(sorguSonuclari);
    this.tableRendered = true;
  }

  public update(entity: HedefSorguSonucu) {
    const sorguSonuclari = this._sorguSonuclari.getValue().slice();
    const index = sorguSonuclari.findIndex(function (item) {
      return item.id === entity.id;
    });
    sorguSonuclari[index] = entity;
    this._sorguSonuclari.next(sorguSonuclari);
  }

  public add(entity: HedefSorguSonucu) {
    const sorguSonuclari = this._sorguSonuclari.getValue().slice();
    sorguSonuclari.unshift(entity);
    this._sorguSonuclari.next(sorguSonuclari);
    this.tableRendered = true;
  }

  public delete(id) {
    const sorguSonuclari = this._sorguSonuclari.getValue().slice();
    const index = sorguSonuclari.findIndex(function (item) {
      return item.id === id;
    });
    sorguSonuclari.splice(index, 1);
    this._sorguSonuclari.next(sorguSonuclari);
  }
}
