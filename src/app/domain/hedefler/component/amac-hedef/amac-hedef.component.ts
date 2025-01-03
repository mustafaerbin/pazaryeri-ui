import { Component, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Amachedef } from './dto/amachedef';
import { CustomValidator } from '../../../../shared/validation/custom-validator';
import { AbstractGuncelleComponent } from '../../../../shared/components/abstract-guncelle-component';
import { AppStore } from '../../../../shared/utils/app.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmType } from '../../../../shared/model/confirm-data';

@Component({
  selector: 'app-amac-hedef',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './amac-hedef.component.html',
  styleUrl: './amac-hedef.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmacHedefComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class AmacHedefComponent extends AbstractGuncelleComponent implements OnInit, ControlValueAccessor {

  //-aseven-TODO: entity tanımlaması yapılmalı.
  entity: Amachedef;
  entityForm: UntypedFormGroup;

  dialogVisible: boolean = false;

  tempOptions: SelectItem[] = [{
    label: 'option1',
    value: 1,
    title: 'option1',
    disabled: false
  }];

  hedefKaynagiOptions: SelectItem[] = [];
  amacOptions: SelectItem[] = [];
  hedefOptions: SelectItem[] = [];
  altHedefOptions: SelectItem[] = [];
  evetHayirOptions: SelectItem[] = [];
  hedefOnemDerecesiOptions: SelectItem[] = [];

  constructor(appStore: AppStore,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private formBuilder: UntypedFormBuilder) {
    super(appStore);
  }

  ngOnInit(): void {
    this.buildForms(this.entity);
    this.loadData();
  }

  loadData() {
    this.hedefKaynagiOptions = this.tempOptions;
    this.amacOptions = this.tempOptions;
    this.hedefOptions = this.tempOptions;
    this.altHedefOptions = this.tempOptions;
    this.evetHayirOptions = this.tempOptions;
    this.hedefOnemDerecesiOptions = this.tempOptions;
  }

  private buildForms(entity: Amachedef) {
    this.entityForm = this.formBuilder.group({
      hedefKaynagi: [entity ? entity.hedefKaynagi : null, CustomValidator.required],
      amac: [entity ? entity.amac : null, CustomValidator.required],
      hedef: [entity ? entity.hedef : null, CustomValidator.required],
      altHedef: [entity ? entity.altHedef : null, CustomValidator.required],
      isAnahtarPerformansGostergesi: [entity ? entity.isAnahtarPerformansGostergesi : null, CustomValidator.required],
      hedefOnemDerecesi: [entity ? entity.hedefOnemDerecesi : null, CustomValidator.required]
    });
    this.entityForm.valueChanges.subscribe(value => {
      if (this.entityForm.valid) {
        this.onChange(value);
      } else {
        this.onChange(null);
      }
    });
  }

  confirm() {
    this.appStore.confirm({
      type: ConfirmType.KAYDET,
      acceptFunction: () => {
        this.kaydet();
      }, rejectFunction: () => {
        this.appStore.addInstantRejectMessage();
      }
    });
  }

  kaydet() {
    console.log("kaydetAction")
  }

  temizleAction() {
    console.log("temizleAction")
  }

  duzenleAction() {
    console.log("duzenleAction")
  }

  showDialog() {
    this.dialogVisible = true;
  }

  onHide() {
    this.dialogVisible = false;
  }

  private onChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: any): void {
    this.buildForms(value);
  }

  setDisabledState(isDisabled: boolean) {
  }
}
