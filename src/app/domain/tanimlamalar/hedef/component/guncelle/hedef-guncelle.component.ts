import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Message, SelectItem} from "primeng/api";
import { AbstractGuncelleComponent } from '../../../../../shared/components/abstract-guncelle-component';
import { AppStore } from '../../../../../shared/utils/app.store';
import { HedefService } from '../../service/hedef.service';
import { HedefStore } from '../../service/hedef.store';
import { Hedef } from '../../dto/hedef';
import { ConfirmType } from '../../../../../shared/model/confirm-data';
import { HedefSorguSonucu } from '../../dto/hedef-sorgu-sonucu';
import { DurumAktifPasif } from '../../../../../shared/utils/constants';
import { CustomValidator } from '../../../../../shared/validation/custom-validator';

@Component({
  templateUrl: './hedef-guncelle.component.html',
})
export class HedefGuncelleComponent extends AbstractGuncelleComponent implements OnInit {

  entity: Hedef;
  entityId: number;
  entityForm: UntypedFormGroup;
  durumList: SelectItem [] = [];


  constructor(appStore: AppStore,
              private route: ActivatedRoute,
              private formBuilder: UntypedFormBuilder,
              private entityService: HedefService,
              private entityStore: HedefStore) {
    super(appStore);
  }

  ngOnInit(): void {
    this.appStore.setData('hedefGeriDon', true);
    this.loadData();

    this.route.params.subscribe(params => {
      this.entityId = params['id'];
    });

    this.route.data.subscribe(data => {
      this.entity = data['entity'];
      console.log("this.entity",this.entity);
      this.buildForms(this.entity);
    });
  }

  public confirm() {
    this.appStore.confirm(
      {
        type: ConfirmType.GUNCELLE,
        acceptFunction: () => {
          this.guncelleAction();
        }, rejectFunction: () => {
          this.appStore.addInstantRejectMessage();
        }
      }
    );
  }

  private guncelleAction() {
    this.entity = Hedef.update(this.entity, this.entityForm.value);
    const errorMessages: Message[] = [];
    if (errorMessages.length) {
      this.appStore.addAllMessage(errorMessages);
    } else {
      this.subscribeToResponse(this.entityService.update(this.entityId, this.entity), this.guncelleSuccess, undefined);
    }
  }

  private guncelleSuccess(data: HedefSorguSonucu) {
    this.entityStore.update(data);
    this.appStore.addSuccessMessage();
    this.appStore.location.back();
  }

  private loadData() {
    this.durumList = this.appStore.selectService.getAll(DurumAktifPasif);
  }

  private buildForms(hedef: Hedef) {
    this.entityForm = this.formBuilder.group({
      adi: [hedef.adi ? hedef.adi : null, Validators.compose(null)],
      durum: [hedef.durum, CustomValidator.required],
      aciklama: [hedef.aciklama ? hedef.aciklama : null, Validators.compose([Validators.maxLength(1024)])]
    });
  }
}
