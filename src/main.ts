import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {environment} from "./environments/environment";
import {connect} from "@rxjs-insights/devtools/connect";


if (environment.production) {
    enableProdMode();
} else {
    connect().then(r => null);
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
