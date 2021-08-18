import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YearModeReport } from '../ModelYear/ModelYear';



@Component(({
    selector: 'report',
    templateUrl: '../DialogYearHtml/dialogSelectYear.html',
    styleUrls: ['../DialogYearCss/dialogSelectYear.css']
}) as any)
export class ModelDialogSelectYear {

    constructor(
        public dialogDataBase: MatDialogRef<ModelDialogSelectYear>,
        @Inject(MAT_DIALOG_DATA) public data: YearModeReport) {
    }

    ///Выгрузить отчет
    public sendReport() {
        this.dialogDataBase.close();
    }

}
