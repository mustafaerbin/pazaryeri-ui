import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractComponent} from '../shared/components/abstract-component';
import {AppStore} from '../shared/utils/app.store';
import {filter, startWith} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-domain-component',
  templateUrl: './domain.component.html',
})
export class DomainComponent extends AbstractComponent implements OnInit {

  home = {icon: 'fa fa-home'};

  constructor(appStore: AppStore,
              private title: Title,
              private route: ActivatedRoute,
              private router: Router) {
    super(appStore);
  }

  ngOnInit(): void {
    this.route.data.subscribe(value => {
      //this.appStore.appInit(value.initValue);
      this.appStore.appInit([]);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {

    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), startWith(this.router))
      .subscribe(() => {
        const route = this.getActiveRoute(this.route);
        if (!(route.snapshot.data.disableLoading)) {
          this.appStore.loading = false;
          this.appStore.broadcastMessage(route.snapshot.data.messageBroadcastTimeout);
        }
        this.appStore.loading = false;
        if (!(route.snapshot.data.newNode)) {
          this.appStore.header = null;
        } else {
          this.appStore.header = this.getHeader();
        }

        this.title.setTitle(this.appStore.translate.instant('label.lega.client', {title: "INNOVA"}));
        this.title.setTitle("Tedas");

      });
  }

  private getHeader() {
    const activeRoute = this.getActiveRoute(this.route);
    return this.appStore.translate.instant(activeRoute.snapshot.data['id']);
  }

  private getActiveRoute(route: ActivatedRoute): ActivatedRoute {
    if (!route || !route.firstChild) {
      return route;
    }
    return this.getActiveRoute(route.firstChild);
  }
}
