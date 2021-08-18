import { NgModule } from '@angular/core';
import { DialogDiscription } from '../../Inventory/AddFullModel/ModelDialogDiscription/View/DialogDiscription';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelDialogSelectYear } from '../../Inventory/AddFullModel/DialogSelectYear/DialogYearTs/dialogSelectYear';
import { ReportCard } from '../../Inventory/AddFullModel/DialogReportCard/DialogReportCardTs/DialogReportCard';

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    entryComponents: [DialogDiscription, ModelDialogSelectYear, ReportCard],
    declarations: [
        DialogDiscription, ModelDialogSelectYear, ReportCard
    ],
})
export class DialogModule { }