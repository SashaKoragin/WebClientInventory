import { NgModule } from '@angular/core';
import { DialogDiscription } from '../../Inventory/AddFullModel/ModelDialogDiscription/View/DialogDiscription';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelDialogSelectYear } from '../../Inventory/AddFullModel/DialogSelectYear/DialogYearTs/dialogSelectYear';
import { ReportCard } from '../../Inventory/AddFullModel/DialogReportCard/DialogReportCardTs/DialogReportCard';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ReportEpo } from '../../Inventory/AddFullModel/DialogReportEpo/DialogReportEpoTs/DialogReportEpo';
import { PipeModule } from './PipeInventory';
import { DialogAksiokEditAndAdd } from '../../Inventory/AddFullModel/DialogAksiokEditAndAdd/DialogAksiokEditAndAddTs/DialogAksiokEditAndAdd';
import { DragAndDrop } from '../../Inventory/AddFullModel/UploadFilleDragAndDrop/Ts/UploadFilleDragAndDrop';

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPermissionsModule,
        PipeModule
    ],
    entryComponents: [DialogDiscription, ModelDialogSelectYear, ReportCard, ReportEpo, DialogAksiokEditAndAdd,DragAndDrop],
    declarations: [
        DialogDiscription, ModelDialogSelectYear, ReportCard, ReportEpo, DialogAksiokEditAndAdd,DragAndDrop
    ],
})
export class DialogModule { }