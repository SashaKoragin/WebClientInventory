import { NgModule } from '@angular/core';
import { DialogDiscription } from '../../Inventory/AddFullModel/ModelDialogDiscription/View/DialogDiscription';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule,
    ],
    entryComponents:[DialogDiscription],
    declarations: [
        DialogDiscription
    ],
})
export class DialogModule { }