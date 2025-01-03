import {Component, Input} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Aciklama} from './aciklama';
import { SelectService } from '../../config/select.service';
import { Dil } from '../../utils/constants';
import { CustomValidator } from '../../validation/custom-validator';

@Component({
  selector: 'app-aciklama',
  styleUrls: ['aciklama.component.css'],
  templateUrl: './aciklama.component.html',
})
export class AciklamaComponent {

  @Input()
  public aciklamalar: UntypedFormArray;

  public dilList: SelectItem [] = [];

  constructor(private selectService: SelectService) {
    this.dilList = this.selectService.getAll(Dil, false);
  }

  static buildAciklamaForm(aciklamaList: any, disabledAciklama?: boolean, disabledKisaAciklama?: boolean, disabledDil?: boolean): UntypedFormArray {

    let _aciklamaList;
    let aciklamaObj;
    if (aciklamaList) {
      _aciklamaList = aciklamaList.slice();
      aciklamaObj = _aciklamaList[0] || {id: null, aciklama: '', kisaAciklama: ''};
    } else {
      aciklamaList = [];
      _aciklamaList = [];
      aciklamaObj = {id: null, aciklama: '', kisaAciklama: ''};
    }

    Object.keys(Dil).map(e => {
      if (!(parseInt(e, 10) >= 0)) {
        if (!_aciklamaList.find(function (item) {
            return item.dil === Dil[e];
          })) {
          aciklamaList.push({
            id: null,
            aciklama: aciklamaObj.aciklama,
            kisaAciklama: aciklamaObj.kisaAciklama,
            dil: Dil[e]
          });
        }
      }
    });

    if (disabledAciklama === undefined) {
      disabledAciklama = false;
    }
    if (disabledKisaAciklama === undefined) {
      disabledKisaAciklama = false;
    }
    if (disabledDil === undefined) {
      disabledDil = true;
    }

    const aciklamaFormGroup = aciklamaList.map(aciklama => this.buildAciklama(aciklama, disabledAciklama, disabledKisaAciklama, disabledDil));
    return new UntypedFormArray(aciklamaFormGroup);
  }

  private static buildAciklama(aciklama: Aciklama, disabledAciklama: boolean, disabledKisaAciklama: boolean, disabledDil: boolean): UntypedFormGroup {

    return new UntypedFormGroup({
      id: new UntypedFormControl(aciklama.id),
      aciklama: new UntypedFormControl({
        value: aciklama.aciklama,
        disabled: disabledAciklama
      }, Validators.compose([CustomValidator.required, Validators.maxLength(255)])),
      _aciklama: new UntypedFormControl(aciklama.aciklama),
      kisaAciklama: new UntypedFormControl({
        value: aciklama.kisaAciklama,
        disabled: disabledKisaAciklama
      }, Validators.compose([CustomValidator.required, Validators.maxLength(6)])),
      _kisaAciklama: new UntypedFormControl(aciklama.kisaAciklama),
      dil: new UntypedFormControl({value: aciklama.dil, disabled: disabledDil}),
      _dil: new UntypedFormControl(aciklama.dil)
    });
  }
}
