import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './RoutingMain';

import { Root } from "../Main/ModelMain/Main";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule} from '../MaterialLibary/MaterialLibary';

import { LoginInventarization } from '../../Secyrity/Security/Security';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        AngularMaterialModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    declarations: [
        Root,  LoginInventarization
    ],
     bootstrap: [Root],
   // providers:[AppRoutingModule]
})
export class Maining {
    constructor(router: Router) {
        //Для Debuger
    }

}