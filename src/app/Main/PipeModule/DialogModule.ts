import { NgModule } from '@angular/core';
import { DialogDiscription } from '../../Inventory/AddFullModel/ModelDialogDiscription/View/DialogDiscription';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelDialogSelectYear } from '../../Inventory/AddFullModel/DialogSelectYear/DialogYearTs/dialogSelectYear';



@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule,
    ],
    entryComponents: [DialogDiscription, ModelDialogSelectYear],
    declarations: [
        DialogDiscription, ModelDialogSelectYear
    ],
})
export class DialogModule { }