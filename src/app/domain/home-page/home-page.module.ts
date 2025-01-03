import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './component/home-page.component';
import { HomePageService } from './service/home-page.service';
import { SharedModule } from '../../shared/shared.module';
import { BadgeModule } from 'primeng/badge';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { FooterService } from './component/footer/service/footer.service';
import { FooterComponent } from './component/footer/footer.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule,
    BadgeModule,
    TagModule,
    ChartModule
  ],
  declarations: [
    HomePageComponent,
    FooterComponent
  ],
  providers: [
    HomePageService,
    FooterService,
    DatePipe,
  ]
})
export class HomePageModule {

}
