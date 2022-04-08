import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAllParametrs, AuthIdentification, PostInventar, EditAndAdd } from '../../../../Post RequestService/PostRequest';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AnalysisEpoAndInventarka, FullTemplateSupport, ModelParametrSupport } from '../../../ModelInventory/InventoryModel';
import { SelectionModel } from '@angular/cdk/collections';
import { ModelDialog, DialogDiscription } from '../../ModelDialogDiscription/View/DialogDiscription';

@Component(({
    selector: 'reportEpo',
    templateUrl: '../DialogReportEpoHtml/DialogReportEpo.html',
    styleUrls: ['../DialogReportEpoCss/DialogReportEpo.css'],
    providers: [SelectAllParametrs, PostInventar, EditAndAdd]
}) as any)

export class ReportEpo {

    constructor(public dialogReportEpo: MatDialogRef<ReportEpo>,
        @Inject(MAT_DIALOG_DATA) public authService: AuthIdentification,
        public select: SelectAllParametrs,
        public dialog: MatDialog,
        public selectAll: PostInventar,
        public editandadd: EditAndAdd,) {
        this.sendserver();
        select.selectAllReportEpo().then(report => {
            this.dataSourceAnalysisEpo.data = report;
            this.dataSourceAnalysisEpo.paginator = this.paginatorAnalysisEpo;
            this.dataSourceAnalysisEpo.data.forEach(element => {
                if (element.IsPrint) {
                    this.selection.select(element);
                }
            });
        })
    }

    @ViewChild('epo', { static: true }) paginatorAnalysisEpo: MatPaginator;
    public displayedColumnsAnalysisEpo = ['Logic', 'IsPrint', 'Id', 'NameInfoReport'];
    public dataSourceAnalysisEpo: MatTableDataSource<AnalysisEpoAndInventarka> = new MatTableDataSource<AnalysisEpoAndInventarka>();
    //Выбор элементов
    public selection = new SelectionModel<AnalysisEpoAndInventarka>(true, []);

    //Выборка всех
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSourceAnalysisEpo.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSourceAnalysisEpo.data);
    }

    createSTO(model: AnalysisEpoAndInventarka, template: FullTemplateSupport) {
        console.log(model);
        var modelDialog = new ModelDialog();
        modelDialog.discription = template.Description;
        modelDialog.info = template.InfoTemplate;
        modelDialog.name = template.Name;
        modelDialog.idTemplate = template.IdTemplate;
        modelDialog.rowModel = model;
        const dialogRef = this.dialog.open(DialogDiscription, {
            width: "800px",
            height: "500px",
            data: modelDialog
        })
        dialogRef.afterClosed().subscribe((result: ModelDialog) => {
            console.log(result);
            if (result) {
                this.editandadd.createSupport(new ModelParametrSupport(
                    this.authService.autorization.loginField,
                    this.authService.autorization.passwordField,
                    template.IdTemplate, result.discription, 0, 0, 0, 0, 0, 0, 0, 0, model.Id)).toPromise().then((model: ModelParametrSupport) => {
                        console.log(model)
                        if (model.errorField) {
                            alert("Заявка не создана смотри ошибки!!! " + model.errorField)
                            return;
                        }
                        if (model.step3ResponseSupportField) {
                            alert("Заявка успешно создана!")
                            return;
                        }
                    });
            }
        });
    }

    //Формирование отчета
    sendReport() {
        var arrayId = this.selection.selected.map(id => id.Id)
        if (arrayId.length > 0) {
            this.select.allReportEpoAndInventory(arrayId);
        }
        else {
            alert("Не выбран не один отчет!")
        }
    }

    //Выход
    closed() {
        this.dialogReportEpo.close();
    }

    ///Загрузка шаблонов
    async sendserver() {
        await this.selectAll.allTemplate();
    }
}

