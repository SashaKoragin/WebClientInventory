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
    ],
    declarations: [
        Root
    ],
     bootstrap: [Root]
})
export class Maining {
    constructor(router: Router) {
        console.log(router.url)
        //Для Debuger
    }

}