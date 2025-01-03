import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {DomainRoutingModule} from "./domain-routing.module";
import {DomainComponent} from "./domain.component";
import {InitDataResolve} from "../shared/resolvers/init-data.resolve";
import {BookmarkResolve} from '../shared/resolvers/bookmark.resolve';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InplaceModule } from 'primeng/inplace';
import {ToastModule} from 'primeng/toast';
import {StyleClassModule} from "primeng/styleclass";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        DomainRoutingModule,
        CommonModule,
        SharedModule,
        BreadcrumbModule,
        ScrollPanelModule,
        InplaceModule,
        ToastModule,
        StyleClassModule,
        TranslateModule
    ],
  declarations: [
    DomainComponent,
  ],
  providers: [
    InitDataResolve,
    BookmarkResolve
  ],
})

export class DomainModule {

}
