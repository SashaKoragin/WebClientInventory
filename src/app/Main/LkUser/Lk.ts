import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { LkUser } from '../../LKUser/Main/Model/MainLk';
import { AppRoutingModuleLkModule } from './NavigationLk';
import { PipeModule } from '../PipeModule/PipeInventory';
import { DialogModule } from '../PipeModule/DialogModule';
import { NgxPermissionsModule } from 'ngx-permissions';




@NgModule(({
    imports: [
        FormsModule,
        CommonModule,
        PipeModule,
        DialogModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AppRoutingModuleLkModule,
        NgxPermissionsModule
    ],
    declarations: [
        LkUser
    ]

}) as any)

export class LkModule {

 }