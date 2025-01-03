import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HedeflerComponent} from "./component/hedefler.component";

const routes: Routes = [
  {
    path: '',
    component: HedeflerComponent,
    data: {
      id: 'hedefler',
      newNode: false,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HedeflerRoutingModule {

}
