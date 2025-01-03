import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AbstractTanimlaComponent } from '../../../../../shared/components/abstract-tanimla-component';
import { AppStore } from '../../../../../shared/utils/app.store';
import { HedefService } from '../../service/hedef.service';
import { HedefStore } from '../../service/hedef.store';
import { ConfirmType } from '../../../../../shared/model/confirm-data';
import { Durum } from '../../../../../shared/utils/constants';
import { CustomValidator } from '../../../../../shared/validation/custom-validator';
import { HedefSorguSonucu } from '../../dto/hedef-sorgu-sonucu';
import { Hedef } from '../../dto/hedef';


@Component({
  templateUrl: './hedef-tanimla.component.html'
})
export class HedefTanimlaComponent extends AbstractTanimlaComponent implements OnInit {

  entityForm: UntypedFormGroup;

  public durumList: SelectItem [] = [];

  constructor(appStore: AppStore,
              private formBuilder: UntypedFormBuilder,
              private entityService: HedefService,
              private entityStore: HedefStore) {
    super(appStore);
  }

  ngOnInit(): void {
    this.appStore.setData('hedefGeriDon', true);
    this.loadData();
    this.buildForms();
  }

  goBack(): void {
    this.appStore.clearMessage();
    this.appStore.location.back();
  }

  public confirm() {
    this.appStore.confirm({
      type: ConfirmType.KAYDET, acceptFunction: () => {
        this.kaydetAction();
      },
      rejectFunction: () => this.appStore.addInstantRejectMessage()
    });
  }

  private loadData() {
    this.durumList = this.appStore.selectService.getUnSelected(Durum, true, Durum.MANTIKSAL_SILINMIS);
   // this.appStore.selectService.getNamedSync('hedefYetkiSeviyeSelect.getAllHedefYetkiSeviye', (data) => this.yetkiSeviyesiList = data);
  }

  private buildForms() {
    this.entityForm = this.formBuilder.group({
      adi: [null, Validators.compose([CustomValidator.required, Validators.min(0)])],
      durum: [Durum.AKTIF, CustomValidator.required],
      aciklama: [null, Validators.compose([Validators.maxLength(1024)])]
    });
  }

  private kaydetAction(): void {
    const entity = Hedef.update(new Hedef(), this.entityForm.value);
    this.subscribeToResponse(this.entityService.create(entity), this.kaydetSuccess, undefined);
  }

  private kaydetSuccess(data: HedefSorguSonucu) {
    this.entityStore.add(data);
    this.appStore.addSuccessMessage();
    this.buildForms();
    this.appStore.location.back();
  }
}
