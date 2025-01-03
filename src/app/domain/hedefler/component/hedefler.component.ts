import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AmacHedefComponent } from './amac-hedef/amac-hedef.component';
import { CustomValidator } from '../../../shared/validation/custom-validator';
import { AppStore } from '../../../shared/utils/app.store';
import { AbstractComponent } from '../../../shared/components/abstract-component';

@Component({
  templateUrl: './hedefler.component.html',
  styleUrls: ['./hedefler.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HedeflerComponent extends AbstractComponent implements OnInit {

  @ViewChild('amacHedefBilgileri') girisComponent: AmacHedefComponent;

  geriButtonDisabled: boolean = false;
  ileriButtonDisabled: boolean = false;
  items: MenuItem[];
  activeIndex: number = 0;
  entityForm: UntypedFormGroup;

  STEPS = {
    STEP_1: 0,
    STEP_2: 1,
    STEP_3: 2,
    STEP_4: 3,
    STEP_5: 4,
    STEP_6: 5,
    STEP_7: 6,
    STEP_8: 7,
    STEP_9: 8,
    STEP_10: 9
  };

  constructor(appStore: AppStore,
              private formBuilder: UntypedFormBuilder) {
    super(appStore);
  }

  ngOnInit() {
    this.buildSteps();
    this.buildForms(null);
  }

  buildForms(entity: any) {
    this.entityForm = this.formBuilder.group({
      amacHedefBilgileri: [null, CustomValidator.required]
    });
  }

  geri(): void {
    if (this.activeIndex > this.STEPS.STEP_1 && this.activeIndex <= this.STEPS.STEP_10) {
      this.activeIndex--;
      this.geriButtonDisabled = false;
    } else {
      this.geriButtonDisabled = true;
    }
  }

  devam(): void {
    if (this.activeIndex >= this.STEPS.STEP_1 && this.activeIndex < this.STEPS.STEP_10) {
      this.activeIndex++;
      this.ileriButtonDisabled = false;
    } else {
      this.ileriButtonDisabled = true;
    }
  }

  private buildSteps() {
    this.items = [{
      label: this.appStore.translate.instant('label.amac.hedef'),
      command: (event: any) => {
        this.activeIndex = this.STEPS.STEP_1;
      }
    },
      {
        label: this.appStore.translate.instant('label.faaliyet.adimlari'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_2;
        }
      },
      {
        label: this.appStore.translate.instant('label.is.birlikleri'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_3;
        }
      },
      {
        label: this.appStore.translate.instant('label.hedef.oranlari'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_4;
        }
      },
      {
        label: this.appStore.translate.instant('label.boyut.kume'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_5;
        }
      },
      {
        label: this.appStore.translate.instant('label.kaynaklar'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_6;
        }
      },
      {
        label: this.appStore.translate.instant('label.riskler'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_7;
        }
      },
      {
        label: this.appStore.translate.instant('label.ozet'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_8;
        }
      },
      {
        label: this.appStore.translate.instant('label.hedef.tarihcesi'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_9;
        }
      },
      {
        label: this.appStore.translate.instant('label.dosyalar'),
        command: (event: any) => {
          this.activeIndex = this.STEPS.STEP_10;
        }
      }
    ];
  }
}
