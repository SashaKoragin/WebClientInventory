import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './RoutingMain';

import { Root } from "../Main/ModelMain/Main";

import { AuthModule } from './RouteLogin/RoutingAuth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule} from '../MaterialLibary/MaterialLibary';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';
import { AuthIdentificationSignalR } from '../../Post RequestService/PostRequest';
import { ServerHost } from '../../AdressGetPost/AdressInventory';
import { NgxPermissionsModule } from 'ngx-permissions';

export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.logging = true;
    c.url = `http://${ServerHost}:8059/signalr`;
    return c;
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        AuthModule,
        AngularMaterialModule,
        HttpClientModule,
        AppRoutingModule,
        NgxPermissionsModule.forRoot(),
        SignalRModule.forRoot(createConfig),
    ],
    declarations: [
        Root
    ],
     bootstrap: [Root],
     providers:[AuthIdentificationSignalR]

})
export class Maining {
    constructor(router: Router) {
        //console.log(router.url)
        
        //Для Debuger
    }

}