import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Maining } from './app/Main/Routing/NgMain';

const platform = platformBrowserDynamic();
enableProdMode();
platform.bootstrapModule(Maining);