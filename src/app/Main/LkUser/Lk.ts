import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { LkUser } from '../../LKUser/Main/Model/MainLk';
import { AppRoutingModuleLkModule } from './NavigationLk';
import { PipeModule } from '../PipeModule/PipeInventory';
import { DialogModule } from '../PipeModule/DialogModule';




@NgModule(({
    imports: [
        FormsModule,
        CommonModule,
        PipeModule,
        DialogModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AppRoutingModuleLkModule
    ],
    declarations: [
        LkUser
    ]

}) as any)

export class LkModule {

 }