import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAllParametrs, PostInventar, AuthIdentification, EditAndAdd } from '../../../../Post RequestService/PostRequest';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { WebMailModel, FullTemplateSupport, ModelParametrSupport } from '../../../ModelInventory/InventoryModel';
import { MatDialog } from '@angular/material';
import { ModelDialog, DialogDiscription } from '../../../AddFullModel/ModelDialogDiscription/View/DialogDiscription';
import { Select } from '../../../AddFullModel/ModelViewSelect/View/SelectView';

@Component(({
  selector: 'mail',
  templateUrl: '../Html/MailPop3.html',
  styleUrls: ['../Html/MailPop3.css'],
  providers: [SelectAllParametrs, EditAndAdd, PostInventar]

}) as any)

export class MailPop3 implements OnInit {

  constructor(
    public editandadd: EditAndAdd,
    public select: SelectAllParametrs,
    public selectAll: PostInventar,
    public authService: AuthIdentification,
    public dialog: MatDialog) { }

  @ViewChild('SqlModel', { static: false }) selectionChild: Select;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columns: Table = this.dinamicmodel.mail[0];
  public statusText: string = null;

  ngOnInit(): void {
    this.selectAll.allTemplate();
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mailView[0].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
    })
  }

  selectserver(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectmail.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.mail[this.dinamicmodel.mainselectmail.indexcolumnmodel]
    })
  }



  ///Просмотреть Body
  visilibytyBody(row: any) {
    var modelServer = new WebMailModel();
    modelServer.idMailField = row.IdMail;
    modelServer.nameGroupModelField = this.columns.Type;
    console.log(modelServer);
    this.select.visibilityBodyMail(modelServer).subscribe((data: string) => {
      console.log(data);
      alert(data);
    });
  }

  ///Выгрузить файл
  async donloadFile(row: any) {
    if (row.IsFile == "Вложение есть") {
      var modelServer = new WebMailModel();
      modelServer.idMailField = row.IdMail;
      modelServer.nameGroupModelField = this.columns.Type;
      console.log(modelServer);
      var blob = await this.select.outputMail(modelServer);
      if (blob) {
        var nameFile = `Вложение ${row.Id}`;
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = nameFile;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
      else {
        alert('Отсутствует маршрут url для файла!')
      }
    }
    else {
      alert("Отсутствует файл вложения!")
    }
  }

  ///Удалить письмо и клендарь
  deleteRow(row: any) {
    var modelServer = new WebMailModel();
    if (this.columns.Type === "CalendarVksStp") {
      modelServer.nameGroupModelField = "MailIn";
    }
    else {
      modelServer.nameGroupModelField = this.columns.Type;
    }
    console.log(row);
    modelServer.idMailField = row.IdMail;
    this.select.deleteMail(modelServer).subscribe((data: string) => {
      this.statusText = data;
      let index: number = this.columns.Model.data.findIndex(item => item.Id === row.Id);
      this.columns.Model.data.splice(index, 1);
      this.columns.Model._updateChangeSubscription();
    });
  }

  createSTO(model: any, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
    modelDialog.discription = template.Description;
    modelDialog.info = template.InfoTemplate;
    modelDialog.name = template.Name;
    modelDialog.idTemplate = template.IdTemplate;
    modelDialog.rowModel = model;
    const dialogRef = dialog.open(DialogDiscription, {
      width: "800px",
      height: "500px",
      data: modelDialog
    })
    dialogRef.afterClosed().subscribe((result: ModelDialog) => {
      console.log(result);
      if (result) {
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, 0, 0, 0, 0, 0, 0, 0, model.Id)).toPromise().then((model: ModelParametrSupport) => {
            console.log(model)
            if (model.errorField) {
              alert("Заявка не создана смотри ошибки!!! " + model.errorField)
              return;
            }
            if (model.step3ResponseSupportField) {
              this.selectionChild.updateProcedure();
              alert("Заявка успешно создана!")
              return;
            }
          });
      }
    });
  }

}
