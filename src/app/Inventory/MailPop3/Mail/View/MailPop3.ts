import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { strict } from 'assert';
import { WebMailModel } from '../../../ModelInventory/InventoryModel';

@Component(({
  selector: 'mail',
  templateUrl: '../Html/MailPop3.html',
  styleUrls: ['../Html/MailPop3.css'],
  providers: [SelectAllParametrs]

}) as any)

export class MailPop3 implements OnInit {

  constructor(public select: SelectAllParametrs) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columns: Table = this.dinamicmodel.mail[0];
  public statusText: string = null;

  ngOnInit(): void {
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
    modelServer.idField = row.Id;
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
      modelServer.idField = row.Id;
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

  ///Удалить письмо
  deleteRow(row: any) {
    var modelServer = new WebMailModel();
    modelServer.idField = row.Id;
    modelServer.nameGroupModelField = this.columns.Type;
    console.log(modelServer);
    this.select.deleteMail(modelServer).subscribe((data: string) => {
      this.statusText = data;
      let index: number = this.columns.Model.data.findIndex(item => item.Id === row.Id);
      this.columns.Model.data.splice(index, 1);
      this.columns.Model._updateChangeSubscription();
    });
  }
}
