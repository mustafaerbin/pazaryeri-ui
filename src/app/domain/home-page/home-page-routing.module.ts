import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./component/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      id: 'home_page',
      newNode: false,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {

}
