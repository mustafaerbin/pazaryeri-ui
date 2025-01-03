import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';
import {SelectService} from './config/select.service';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MultiSelectModule} from 'primeng/multiselect';
import {TreeModule} from 'primeng/tree';
import {DateFormatPipe} from './components/date/date-format.pipe';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CardModule} from 'primeng/card';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BlockUIModule} from 'primeng/blockui';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {TooltipModule} from 'primeng/tooltip';
import {AccordionModule} from 'primeng/accordion';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {FileUploadModule} from 'primeng/fileupload';
import {DataViewModule} from 'primeng/dataview';
import {StepsModule} from 'primeng/steps';
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';
import {CheckboxModule} from 'primeng/checkbox';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {TabMenuModule} from 'primeng/tabmenu';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PickListModule} from 'primeng/picklist';
import {ToolbarModule} from 'primeng/toolbar';
import {ChipsModule} from 'primeng/chips';
import {ScrollPanelModule}  from 'primeng/scrollpanel';
import {TreeTableModule} from 'primeng/treetable';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SkeletonModule} from "primeng/skeleton";
import {MenuModule} from "primeng/menu";
import {InputNumberModule} from "primeng/inputnumber";
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { InitService } from './resolvers/init-service';
import { DateTimeFormatPipe } from './components/date/date-time-format.pipe';
import { ParaFormatPipe } from './components/para/para-format.pipe';
import { EnumPipe } from './utils/enum.pipe';
import { StringWrapperPipe } from './utils/string-wrapper.pipe';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { CommonDatatableComponent } from './components/datatable/common-datatable.component';
import { CommonLazytableComponent } from './components/lazytable/common-lazytable.component';
import { ParaComponent } from './components/para/para.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { AciklamaComponent } from './components/aciklama/aciklama.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        TabViewModule,
        DropdownModule,
        InputSwitchModule,
        MultiSelectModule,
        TreeModule,
        ToggleButtonModule,
        CardModule,
        OverlayPanelModule,
        ScrollPanelModule,
        SplitButtonModule,
        TableModule,
        InputTextareaModule,
        BlockUIModule,
        TranslateModule,
        ConfirmDialogModule,
        MessageModule,
        MessagesModule,
        TooltipModule,
        AccordionModule,
        CalendarModule,
        AutoCompleteModule,
        KeyFilterModule,
        InputNumberModule,
        DialogModule,
        InputMaskModule,
        FileUploadModule,
        DataViewModule,
        StepsModule,
        ListboxModule,
        FieldsetModule,
        CheckboxModule,
        TriStateCheckboxModule,
        MegaMenuModule,
        OrganizationChartModule,
        TreeTableModule,
        TabMenuModule,
        SelectButtonModule,
        PickListModule,
        ChipsModule,
        SkeletonModule,
        MenuModule
    ],
  providers: [SelectService, InitService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  declarations: [
    DateFormatPipe,
    DateTimeFormatPipe,
    ParaFormatPipe,
    EnumPipe,
    StringWrapperPipe,
    BookmarkComponent,
    CommonDatatableComponent,
    CommonLazytableComponent,
    ParaComponent,
    ValidationMessageComponent,
    AciklamaComponent
  ],
  exports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    BlockUIModule,
    InputSwitchModule,
    MultiSelectModule,
    TreeModule,
    TabViewModule,
    TooltipModule,
    AccordionModule,
    ToggleButtonModule,
    OverlayPanelModule,
    SplitButtonModule,
    TableModule,
    ConfirmDialogModule,
    TranslateModule,
    MessageModule,
    MessagesModule,
    CalendarModule,
    AutoCompleteModule,
    KeyFilterModule,
    DialogModule,
    InputMaskModule,
    FileUploadModule,
    TabViewModule,
    DataViewModule,
    StepsModule,
    ListboxModule,
    FieldsetModule,
    ListboxModule,
    CheckboxModule,
    TriStateCheckboxModule,
    MegaMenuModule,
    OrganizationChartModule,
    TreeTableModule,
    TabMenuModule,
    ScrollPanelModule,
    SelectButtonModule,
    PickListModule,
    RadioButtonModule,
    ToolbarModule,
    ChipsModule,
    DateFormatPipe,
    DateTimeFormatPipe,
    ParaFormatPipe,
    EnumPipe,
    StringWrapperPipe,
    BookmarkComponent,
    CommonDatatableComponent,
    CommonLazytableComponent,
    ParaComponent,
    ValidationMessageComponent,
    AciklamaComponent
  ]
})
export class SharedModule {
}
