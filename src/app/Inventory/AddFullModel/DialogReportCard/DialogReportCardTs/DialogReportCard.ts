import { Component, Inject } from '@angular/core';
import { GenerateModelReportCard, ReportCardModel } from '../ReportCardModel/ReportCardModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelValidation } from '../../ValidationModel/UserValidation';
import { EditAndAdd } from '../../../../Post RequestService/PostRequest';

@Component(({
    selector: 'reportCard',
    templateUrl: '../DialogReportCardHtml/DialogReportCard.html',
    styleUrls: ['../DialogReportCardCss/DialogReportCard.css'],
    providers: [EditAndAdd]
}) as any)

export class ReportCard {
    constructor(
        public editandadd: EditAndAdd,
        public dialogDataBase: MatDialogRef<ReportCard>,
        @Inject(MAT_DIALOG_DATA) public data: ReportCardModel) {
    }

    public isReportStart: boolean = false
    public generateModel: GenerateModelReportCard = new GenerateModelReportCard(this.data.department);
    ///Валидация
    public modelvalid: ModelValidation = new ModelValidation()
    ///Выгрузить отчет
    public sendReport() {
        this.isReportStart = true;
        this.data.settingParametersField.yearField = this.generateModel.selectedYears;
        this.data.settingParametersField.mouthField = this.generateModel.selectedMouth;
        this.data.settingParametersField.viewField = this.generateModel.selectedView;
        this.data.settingParametersField.typeField = this.generateModel.selectedType;
        console.log(this.generateModel.selectedDepartmentIndex);
        if (this.generateModel.selectedDepartmentIndex) {
            this.data.settingParametersField.idDepartmentField = this.generateModel.selectedDepartmentIndex.IdOtdel;
        }
        else {
            this.data.settingParametersField.idDepartmentField = 0
        }
        this.editandadd.createReportCard(this.data).subscribe(async model => {
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `Табель`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.isReportStart = false;
        });;
        //console.log(this.data);
        //this.dialogDataBase.close();
    }
}