import { NgModule } from '@angular/core';
import { AppRoutingModule } from './Navigation';
import { MainInventar } from '../../Inventory/Main/Main/MainInventory';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { ReactiveFormsModule } from '@angular/forms';
import { Equipment } from '../../Inventory/Equipment/View/Equepment';
import { Invent } from '../../Inventory/Invent/View/Invent';
import { User } from '../../Inventory/User/View/User';
import { FormsModule } from '@angular/forms';
import { DocumentSelect } from '../../Inventory/Documents/View/DocumentsSelect';


@NgModule(({
    imports: [
        FormsModule,
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    declarations: [
        MainInventar, Equipment, Invent, User,DocumentSelect
    ]
}) as any)

export class InventarModule { }