import {
  Users, FullSelectedModel, Otdel, Position, Printer, Mfu, ScanerAndCamer, SysBlock, CopySave,
  Monitor, NameSysBlock, Supply, Classification, Swithe,
  Kabinet, FullModel, Statusing, FullProizvoditel, ModelReturn, NameMonitor, Telephon, BlockPower, ModelBlockPower, ProizvoditelBlockPower,
  INewLogicaTable, ModelSwithes, ModeleReturn, MailIdentifier, MailGroup, Rules, ServerEquipment
} from '../../ModelInventory/InventoryModel';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ModelValidation } from '../ValidationModel/UserValidation';
import { EditAndAdd, AuthIdentificationSignalR, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { ConvertDate } from '../../AddFunctionConvertDate/ConvertDateModel';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { ElementRef } from '@angular/core';
import { BroadcastEventListener } from 'ng2-signalr';
import { deserialize } from 'class-transformer';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { FullTemplateSupport, ModelParametrSupport, ModelSeverEquipment, ManufacturerSeverEquipment, TypeServer } from '../../ModelInventory/InventoryModel';
import { ModelDialog, DialogDiscription } from '../ModelDialogDiscription/View/DialogDiscription';
const moment = _rollupMoment || _moment;

export class OtdelTableModel implements INewLogicaTable<Otdel>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Otdel, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdOtdel', 'NameOtdel', 'NameRuk', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Otdel> = new MatTableDataSource<Otdel>();

  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public model: Otdel = new Otdel();
  public index: number;
  public modeltable: Otdel[];
  public user: Users[];

  public filteredUser: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Otdel>('SubscribeOtdel');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Otdel>(Otdel, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdOtdel === submodel.IdOtdel);
      var indexzero = this.dataSource.data.find(x => x.IdOtdel === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdOtdel === 0).IdOtdel = submodel.IdOtdel;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredUser = this.user.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdOtdel)
  }

  public edit(model: Otdel): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdOtdel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addandeditotdel(this.model).toPromise().then((model: ModelReturn<Otdel>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  //Отмена
  public cancel(model: Otdel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var otdeldefault = this.modeltable.find(x => x.IdOtdel === this.model.IdOtdel);
      this.dataSource.data[this.modeltable.indexOf(otdeldefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Otdel {
    var newotdel: Otdel = new Otdel()
    newotdel.ModelIsEdit = true;
    newotdel.IdOtdel = 0;
    return newotdel;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.modeltable = JSON.parse(JSON.stringify(model.Otdels));
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.dataSource.sort = sort;
    this.dataSource.paginator = paginator;
    this.dataSource.data = model.Otdels;
    this.user = model.Users;
    this.filteredUser = this.user.slice();
    return "Модель отделов заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }
  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class UserTableModel implements INewLogicaTable<Users>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: Users, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
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
        if (template.IdCategiria === 6) {
          if (model.IdTelephon) {
            console.log(model.IdTelephon)
            this.editandadd.createSupport(new ModelParametrSupport(
              authService.autorization.loginField,
              authService.autorization.passwordField,
              template.IdTemplate, result.discription, model.IdUser, 0, 0, 0, 0, 0, model.IdTelephon)).toPromise().then((model: ModelParametrSupport) => {
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
          else {
            alert("Создание заявок на телефон невозможна отсутствует телефон!!!")
            return;
          }
        }
        else {
          this.editandadd.createSupport(new ModelParametrSupport(
            authService.autorization.loginField,
            authService.autorization.passwordField,
            template.IdTemplate, result.discription, model.IdUser, 0, 0, 0, 0, 0, 0)).toPromise().then((model: ModelParametrSupport) => {
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
      }
    });
  }


  public displayedColumns = ['Logic', 'IdUser', 'Name', 'TabelNumber', 'Telephon.SerNumber', 'Telephon.Telephon_', 'Telephon.TelephonUndeground', 'Position.NamePosition', 'Otdel.NameOtdel', 'Rule.NameRules', 'StatusActual', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  public modelvalid: ModelValidation = new ModelValidation()
  public otdels: Otdel[];
  public model: Users = new Users();

  public rule: Rules[];
  public position: Position[];
  public modeltable: Users[];
  public telephone: Telephon[];
  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public index: number = 0;

  ///Класс замены обратно
  public anyclassdiv: any;
  public filteredOtdel: any;
  public filteredPosition: any;
  public filteredTelephone: any;
  public filteredRule: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef  //Полный шаблон для манипуляции
  table: ElementRef  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Users>('SubscribeUser');
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteUser');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.SignalR.conect.listen(this.subscribeDelete);
    this.subscribeDelete.subscribe((model: ModeleReturn<Users>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdUser === model.Model.IdUser);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Users>(Users, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdUser === submodel.IdUser);
      var indexzero = this.dataSource.data.find(x => x.IdUser === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdUser === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdUser === 0).IdUser = submodel.IdUser;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {
            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  //Метод для выноса всех костылей на модель
  public modifimethod(): void {
    this.model.Otdel ? this.model.IdOtdel = this.model.Otdel.IdOtdel : this.model.IdOtdel = null;
    this.model.Position ? this.model.IdPosition = this.model.Position.IdPosition : this.model.IdPosition = null;
    this.model.Telephon ? this.model.IdTelephon = this.model.Telephon.IdTelephon : this.model.IdTelephon = null;
    this.model.Rule ? this.model.IdRule = this.model.Rule.IdRule : this.model.IdRule = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredOtdel = this.otdels.slice();
    this.filteredPosition = this.position.slice();
    this.filteredTelephone = this.telephone.slice();
    this.filteredRule = this.rule.slice();
  }

  newmodel(): Users {
    var newuser: Users = new Users()
    newuser.ModelIsEdit = true;
    newuser.IdUser = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      if (this.temlateList[i])
        row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      if (this.temlateList[i])
        row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  ///Редактирование 
  public edit(user: Users): void {
    user.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(user));
    this.isEditAndAddTrue();
    this.addtemplate(user.IdUser)
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addandedituser(this.model, this.SignalR.iduser).subscribe((model: ModelReturn<Users>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  //Удаление
  public delete(model: Users): void {
    var converter = new ConvertDate();
    this.editandadd.deleteUser(converter.convertDateToServer<Users>(JSON.parse(JSON.stringify(model))), this.SignalR.iduser).toPromise().then((model: ModeleReturn<Users>) => {
      alert(model.Message);
    });
  }
  //Отмена
  public cancel(user: Users): void {
    user.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;

    }
    else {
      var userdefault = this.modeltable.find(x => x.IdUser === this.model.IdUser);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = user;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdUser)
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.modeltable = JSON.parse(JSON.stringify(model.Users));
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.Users
    this.otdels = model.Otdels;
    this.telephone = model.Telephon;
    this.position = model.Position;
    this.rule = model.Rule;
    this.filteredOtdel = this.otdels.slice();
    this.filteredPosition = this.position.slice();
    this.filteredTelephone = this.telephone.slice();
    this.filteredRule = this.rule.slice();
    return "Модель пользователей заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class SwitchTableModel implements INewLogicaTable<Swithe>{
  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Swithe, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public models: ModelSwithes[];
  public statusing: Statusing[];
  public supples: Supply[]
  public user: Users[];

  displayedColumns = ['Logic', 'IdSwithes', 'User.Name', 'Supply.DatePostavki', 'ModelSwithes.NameModel', 'ModelSwithes.CountPort', 'ServiceNum', 'SerNum', 'InventarNum', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.Name', 'ActionsColumn'];
  dataSource: MatTableDataSource<Swithe> = new MatTableDataSource<Swithe>();
  isAdd: boolean;
  isEdit: boolean;
  model: Swithe = new Swithe();
  modelToServer: Swithe;
  index: number;
  modeltable: Swithe[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredUser: any;
  public filteredSupples: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Swithe>('SubscribeSwithe');
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteSwitch');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Swithe>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdSwithes === model.Model.IdSwithes);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Swithe>(Swithe, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdSwithes === submodel.IdSwithes);
      var indexzero = this.dataSource.data.find(x => x.IdSwithes === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdSwithes === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdSwithes === 0).IdSwithes = submodel.IdSwithes;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdSwithes)
  }

  public edit(model: Swithe): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdSwithes)
    this.isEditAndAddTrue();
  }

  save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditswitch(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Swithe>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: Swithe): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Swithe>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteSwitch(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Swithe>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  cancel(model: Swithe): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdSwithes === this.model.IdSwithes);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Swithe {
    var newuser: Swithe = new Swithe()
    newuser.ModelIsEdit = true;
    newuser.IdSwithes = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.ModelSwithe ? this.model.IdModelSwithes = this.model.ModelSwithe.IdModelSwithes : this.model.IdModelSwithes = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Swithes));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.Swithes;
    this.kabinet = model.Kabinet;
    this.models = model.ModelSwithe;
    this.statusing = model.Statusing;
    this.user = model.Users;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
    return "Модель коммутаторов заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }
  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class ServerEquipmentTableModel implements INewLogicaTable<ServerEquipment>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: ServerEquipment, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public supples: Supply[];
  public typeServer: TypeServer[];
  public modelSeverEquipment: ModelSeverEquipment[];
  public manufacturerSeverEquipment: ManufacturerSeverEquipment[];

  displayedColumns = ['Logic', 'Id', 'Supply.DatePostavki', 'TypeServer.NameType', 'ModelSeverEquipment.NameModel', 'ManufacturerSeverEquipment.NameManufacturer', 'ServiceNum', 'SerNum', 'InventarNum', 'NameServer', 'IpAdress', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.Name', 'ActionsColumn'];

  dataSource: MatTableDataSource<ServerEquipment> = new MatTableDataSource<ServerEquipment>();
  isAdd: boolean;
  isEdit: boolean;
  model: ServerEquipment = new ServerEquipment();
  modelToServer: ServerEquipment;
  index: number;
  modeltable: ServerEquipment[];

  public filteredKabinet: any;
  public filteredTypeServer: any;
  public filteredStatusing: any;
  public filteredSupples: any;
  public filteredModelSeverEquipment: any;
  public filteredManufacturerSeverEquipment: any;

  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ServerEquipment>('SubscribeServerEquipment');
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteServerEquipment');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<ServerEquipment>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.Id === model.Model.Id);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ServerEquipment>(ServerEquipment, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.Id === submodel.Id);
      var indexzero = this.dataSource.data.find(x => x.Id === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.Id === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.Id === 0).Id = submodel.Id;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredManufacturerSeverEquipment = this.manufacturerSeverEquipment.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredModelSeverEquipment = this.modelSeverEquipment.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredTypeServer = this.typeServer.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.Id)
  }

  public edit(model: ServerEquipment): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.Id)
    this.isEditAndAddTrue();
  }

  save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addAndEditServerEquipment(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<ServerEquipment>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(model: ServerEquipment): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<ServerEquipment>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteServerEquipment(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<ServerEquipment>) => {
      alert(model.Message);
    });
  }

  ///Отмена
  cancel(model: ServerEquipment): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.Id === this.model.Id);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ServerEquipment {
    var newuser: ServerEquipment = new ServerEquipment()
    newuser.ModelIsEdit = true;
    newuser.Id = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.ManufacturerSeverEquipment ? this.model.IdManufacturerSeverEquipment = this.model.ManufacturerSeverEquipment.IdManufacturerSeverEquipment : this.model.IdManufacturerSeverEquipment = null;
    this.model.ModelSeverEquipment ? this.model.IdModelSeverEquipment = this.model.ModelSeverEquipment.IdModelSeverEquipment : this.model.IdModelSeverEquipment = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.TypeServer ? this.model.IdTypeServer = this.model.TypeServer.IdTypeServer : this.model.IdTypeServer = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ServerEquipment));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.ServerEquipment;
    this.kabinet = model.Kabinet;
    this.modelSeverEquipment = model.ModelSeverEquipment;
    this.manufacturerSeverEquipment = model.ManufacturerSeverEquipment;
    this.statusing = model.Statusing;
    this.supples = model.Supply;
    this.typeServer = model.TypeServer;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModelSeverEquipment = this.modelSeverEquipment.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredManufacturerSeverEquipment = this.manufacturerSeverEquipment.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredTypeServer = this.typeServer.slice();
    return "Модель сервисного оборудования заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}





export class PrinterTableModel implements INewLogicaTable<Printer> {
  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }


  createSTO(model: Printer, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
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
      var IdUser = model.IdUser;
      if (result) {
        if (result.isUserCreater) {
          IdUser = authService.autorization.idUserField;
        }
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, IdUser, 0, 0, model.IdPrinter, 0)).toPromise().then((model: ModelParametrSupport) => {
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

  public displayedColumns = ['Logic', 'IdModel', 'User.Name', 'Supply.DatePostavki', 'FullProizvoditel.NameProizvoditel', 'FullModel.NameModel', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'IpAdress', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Printer> = new MatTableDataSource<Printer>();
  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public models: FullModel[];
  public statusing: Statusing[];
  public supples: Supply[]
  public proizvoditel: FullProizvoditel[];
  public user: Users[];

  isAdd: boolean;
  isEdit: boolean;
  model: Printer = new Printer();
  modelToServer: Printer;
  index: number;
  modeltable: Printer[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredProizvoditel: any;
  public filteredUser: any;
  public filteredSupples: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Printer>('SubscribePrinter');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeletePrinter');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Printer>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdPrinter === model.Model.IdPrinter);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Printer>(Printer, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdPrinter === submodel.IdPrinter);
      var indexzero = this.dataSource.data.find(x => x.IdPrinter === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdPrinter === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdPrinter === 0).IdPrinter = submodel.IdPrinter;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdPrinter)
  }

  public edit(model: Printer): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdPrinter)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditprinter(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Printer>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление

  delete(model: Printer): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Printer>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deletePrinter(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Printer>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  public cancel(model: Printer): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdPrinter === this.model.IdPrinter);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Printer {
    var newuser: Printer = new Printer()
    newuser.ModelIsEdit = true;
    newuser.IdPrinter = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.FullProizvoditel ? this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel : this.model.IdProizvoditel = null;
    this.model.FullModel ? this.model.IdModel = this.model.FullModel.IdModel : this.model.IdModel = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Printer));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.Printer;
    this.kabinet = model.Kabinet;
    this.models = model.Model.filter(x => x.IdClasification === 1);
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.user = model.Users;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
    return "Модель принтеров заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }
  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class ScanerAndCamerTableModel implements INewLogicaTable<ScanerAndCamer> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: ScanerAndCamer, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
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
      var IdUser = model.IdUser;
      if (result) {
        if (result.isUserCreater) {
          IdUser = authService.autorization.idUserField;
        }
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, IdUser, 0, 0, 0, 0, model.IdScaner)).toPromise().then((model: ModelParametrSupport) => {
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

  public displayedColumns = ['Logic', 'IdModel', 'User.Name', 'Supply.DatePostavki', 'FullProizvoditel.NameProizvoditel', 'FullModel.NameModel',
    'ZavNumber', 'ServiceNumber', 'InventarNumber', 'IpAdress', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ScanerAndCamer> = new MatTableDataSource<ScanerAndCamer>();
  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public models: FullModel[];
  public statusing: Statusing[];
  public proizvoditel: FullProizvoditel[];
  public user: Users[];
  public supples: Supply[]

  isAdd: boolean;
  isEdit: boolean;
  model: ScanerAndCamer = new ScanerAndCamer();
  modelToServer: ScanerAndCamer;
  index: number;
  modeltable: ScanerAndCamer[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredProizvoditel: any;
  public filteredUser: any;
  public filteredSupples: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ScanerAndCamer>('SubscribeScanerAndCamer');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteScannerAndCamera');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<ScanerAndCamer>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdScaner === model.Model.IdScaner);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ScanerAndCamer>(ScanerAndCamer, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdScaner === submodel.IdScaner);
      var indexzero = this.dataSource.data.find(x => x.IdScaner === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdScaner === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdScaner === 0).IdScaner = submodel.IdScaner;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdScaner)

  }
  public edit(model: ScanerAndCamer): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdScaner)
    this.isEditAndAddTrue();
  }
  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditscaner(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<ScanerAndCamer>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: ScanerAndCamer): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<ScanerAndCamer>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteScannerAndCamera(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<ScanerAndCamer>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  public cancel(model: ScanerAndCamer): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdScaner === this.model.IdScaner);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ScanerAndCamer {
    var newuser: ScanerAndCamer = new ScanerAndCamer()
    newuser.ModelIsEdit = true;
    newuser.IdScaner = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.FullProizvoditel ? this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel : this.model.IdProizvoditel = null;
    this.model.FullModel ? this.model.IdModel = this.model.FullModel.IdModel : this.model.IdModel = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Scaner));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.Scaner;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.models = model.Model.filter(x => [2, 4].includes(x.IdClasification));;
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.user = model.Users;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
    return "Модель сканеров заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class MfuTableModel implements INewLogicaTable<Mfu>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: Mfu, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
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
      var IdUser = model.IdUser;
      if (result) {
        if (result.isUserCreater) {
          IdUser = authService.autorization.idUserField;
        }
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, IdUser, model.IdMfu, 0, 0, 0)).toPromise().then((model: ModelParametrSupport) => {
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

  public displayedColumns = ['Logic', 'IdModel', 'User.Name', 'Supply.DatePostavki', 'FullProizvoditel.NameProizvoditel', 'FullModel.NameModel', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'IpAdress', 'CopySave.SerNum', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Mfu> = new MatTableDataSource<Mfu>();
  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public models: FullModel[];
  public statusing: Statusing[];
  public proizvoditel: FullProizvoditel[];
  public copySave: CopySave[];
  public user: Users[];
  public supples: Supply[]

  isAdd: boolean;
  isEdit: boolean;
  model: Mfu = new Mfu();
  modelToServer: Mfu;
  index: number;
  modeltable: Mfu[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredProizvoditel: any;
  public filteredCopySave: any;
  public filteredUser: any;
  public filteredSupples: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Mfu>('SubscribeMfu');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteMfu');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Mfu>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdMfu === model.Model.IdMfu);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Mfu>(Mfu, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdMfu === submodel.IdMfu);
      var indexzero = this.dataSource.data.find(x => x.IdMfu === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdMfu === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdMfu === 0).IdMfu = submodel.IdMfu;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredCopySave = this.copySave.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdMfu)
  }

  public edit(model: Mfu): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdMfu)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditmfu(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Mfu>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: Mfu): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Mfu>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteMfu(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Swithe>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  cancel(model: Mfu): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdMfu === this.model.IdMfu);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Mfu {
    var newuser: Mfu = new Mfu()
    newuser.ModelIsEdit = true;
    newuser.IdMfu = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.FullProizvoditel ? this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel : this.model.IdProizvoditel = null;
    this.model.FullModel ? this.model.IdModel = this.model.FullModel.IdModel : this.model.IdModel = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.CopySave ? this.model.IdCopySave = this.model.CopySave.IdCopySave : this.model.IdCopySave = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Mfu));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.Mfu;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.models = model.Model.filter(x => x.IdClasification === 3);;
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.copySave = model.CopySave;
    this.user = model.Users;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredCopySave = this.copySave.slice()
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
    return "Модель МФУ заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class SysBlockTableModel implements INewLogicaTable<SysBlock>  {
  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  ///Запрос на СТО 
  public createSTO(model: SysBlock, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog) {
    var modelDialog = new ModelDialog();
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
      var IdUser = model.IdUser;
      if (result) {
        if (result.isUserCreater) {
          IdUser = authService.autorization.idUserField;
        }
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, IdUser, 0, 0, 0, model.IdSysBlock)).toPromise().then((model: ModelParametrSupport) => {
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


  public displayedColumns = ['Logic', 'IdModel', 'User.Name', 'Supply.DatePostavki', 'NameSysBlock.NameComputer', 'ServiceNum', 'SerNum', 'InventarNumSysBlok', 'NameComputer', 'IpAdress', 'Kabinet.NumberKabinet', 'Coment', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<SysBlock> = new MatTableDataSource<SysBlock>();
  public modelvalid: ModelValidation = new ModelValidation()
  public models: NameSysBlock[];
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public user: Users[];
  public supples: Supply[]

  isAdd: boolean;
  isEdit: boolean;
  model: SysBlock = new SysBlock();
  modelToServer: SysBlock;
  index: number;
  modeltable: SysBlock[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredUser: any;
  public filteredSupples: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<SysBlock>('SubscribeSysBlok');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteSystemUnit');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<SysBlock>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdSysBlock === model.Model.IdSysBlock);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<SysBlock>(SysBlock, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdSysBlock === submodel.IdSysBlock);
      var indexzero = this.dataSource.data.find(x => x.IdSysBlock === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdSysBlock === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdSysBlock === 0).IdSysBlock = submodel.IdSysBlock;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdSysBlock)
  }

  public edit(model: SysBlock): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdSysBlock)
    this.isEditAndAddTrue();
  }




  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditsysblok(this.modelToServer, this.SignalR.iduser).subscribe((model: ModelReturn<SysBlock>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: SysBlock): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<SysBlock>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteSysBlock(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<SysBlock>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  public cancel(model: SysBlock): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdSysBlock === this.model.IdSysBlock);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): SysBlock {
    var newuser: SysBlock = new SysBlock()
    newuser.ModelIsEdit = true;
    newuser.IdSysBlock = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }


  modifimethod(): void {
    this.model.NameSysBlock ? this.model.IdModelSysBlock = this.model.NameSysBlock.IdModelSysBlock : this.model.IdModelSysBlock = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.SysBlok));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.SysBlok;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.models = model.ModelSysBlok;
    this.statusing = model.Statusing;
    this.user = model.Users;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
    return "Модель системных блоков заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class MonitorsTableModel implements INewLogicaTable<Monitor>  {
  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Monitor, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['Logic', 'IdModel', 'User.Name', 'Supply.DatePostavki', 'NameMonitor.Name', 'ServiceNum', 'SerNum', 'InventarNumMonitor', 'Kabinet.NumberKabinet', 'Coment', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();
  public modelvalid: ModelValidation = new ModelValidation()
  public models: NameMonitor[];
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public user: Users[];
  public supples: Supply[]


  isAdd: boolean;
  isEdit: boolean;
  model: Monitor = new Monitor();
  modelToServer: Monitor;
  index: number;
  modeltable: Monitor[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredUser: any;
  public filteredSupples: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Monitor>('SubscribeMonitor');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteMonitor');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Monitor>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdMonitor === model.Model.IdMonitor);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Monitor>(Monitor, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdMonitor === submodel.IdMonitor);
      var indexzero = this.dataSource.data.find(x => x.IdMonitor === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdMonitor === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdMonitor === 0).IdMonitor = submodel.IdMonitor;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdMonitor)
  }

  public edit(model: Monitor): void {
    console.log(this.model);
    console.log(this.dataSource.data);
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdMonitor)
    this.isEditAndAddTrue();
    console.log(this.model);
    console.log(this.dataSource.data);
  }

  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditmonitor(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Monitor>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: Monitor): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Monitor>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteMonitor(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Swithe>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  cancel(model: Monitor): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdMonitor === this.model.IdMonitor);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Monitor {
    var newuser: Monitor = new Monitor()
    newuser.ModelIsEdit = true;
    newuser.IdMonitor = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }



  modifimethod(): void {
    this.model.NameMonitor ? this.model.IdModelMonitor = this.model.NameMonitor.IdModelMonitor : this.model.IdModelMonitor = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Monitors));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.Monitors;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.models = model.NameMonitors;
    this.statusing = model.Statusing;
    this.user = model.Users;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
    return "Модель мониторов заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class TelephonsTableModel implements INewLogicaTable<Telephon> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: Telephon, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
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
        var IdUser = authService.autorization.idUserField;
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, IdUser, 0, 0, 0, 0, 0, model.IdTelephon)).toPromise().then((model: ModelParametrSupport) => {
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

  public displayedColumns = ['Logic', 'IdTelephone', 'Supply.DatePostavki', 'NameTelephone', 'Telephon_', 'TelephonUndeground', 'ServiceNum', 'SerNumber', 'InventarNum', 'IpTelephon', 'MacTelephon', 'Kabinet.NumberKabinet', 'Coment', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Telephon> = new MatTableDataSource<Telephon>();
  public modelvalid: ModelValidation = new ModelValidation()
  public supples: Supply[]
  public kabinet: Kabinet[];
  public statusing: Statusing[];

  isAdd: boolean;
  isEdit: boolean;
  model: Telephon = new Telephon();
  index: number;
  modeltable: Telephon[];
  modelToServer: Telephon;
  public filteredKabinet: any;
  public filteredSupples: any;
  public filteredStatusing: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef  //Полный шаблон для манипуляции
  table: ElementRef  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Telephon>('SubscribeTelephone');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteTelephone');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Users>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdTelephon === model.Model.IdTelephon);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Telephon>(Telephon, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdTelephon === submodel.IdTelephon);
      var indexzero = this.dataSource.data.find(x => x.IdTelephon === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdTelephon === 0).IdTelephon = submodel.IdTelephon;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
            console.log(this.modeltable[this.modeltable.indexOf(index)]);
            console.log(this.dataSource.data);
            console.log(this.isAdd);
            console.log(this.isEdit);
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {
            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public calbackfiltersAll() {
    this.filteredKabinet = this.kabinet.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
  }


  newmodel(): Telephon {
    var newuser: Telephon = new Telephon()
    newuser.ModelIsEdit = true;
    newuser.IdTelephon = 0;
    return newuser;
  }

  // //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdTelephon)
  }

  public edit(model: Telephon): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdTelephon)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`
    }
    this.editandadd.addandedittelephon(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Telephon>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: Telephon): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Telephon>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteTelephone(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Telephon>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  public cancel(model: Telephon): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdTelephon === this.model.IdTelephon);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public modifimethod(): void {
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.model.ModelIsEdit = false;
    this.isEdit = true;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Telephon));
    this.dataSource.data = JSON.parse(JSON.stringify(model.Telephon));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.statusing = model.Statusing;
    this.supples = model.Supply;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
    return "Модель телефонов заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class BlockPowerTableModel implements INewLogicaTable<BlockPower> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: BlockPower, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['Logic', 'IdBlockPowers', 'User.Name', 'Supply.DatePostavki', 'ProizvoditelBlockPower.Name', 'ModelBlockPower.Name', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<BlockPower> = new MatTableDataSource<BlockPower>();
  public modelvalid: ModelValidation = new ModelValidation()

  public kabinet: Kabinet[];
  public models: ModelBlockPower[];
  public statusing: Statusing[];
  public proizvoditel: ProizvoditelBlockPower[];
  public user: Users[];
  public supples: Supply[]


  isAdd: boolean;
  isEdit: boolean;
  model: BlockPower = new BlockPower();
  modelToServer: BlockPower;
  index: number;
  modeltable: BlockPower[];

  public filteredKabinet: any;
  public filteredModels: any;
  public filteredStatusing: any;
  public filteredUser: any;
  public filteredSupples: any;
  public filteredProizvoditel: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<BlockPower>('SubscribeBlockPower');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteBlockPower');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<BlockPower>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdBlockPowers === model.Model.IdBlockPowers);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<BlockPower>(BlockPower, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdBlockPowers === submodel.IdBlockPowers);
      var indexzero = this.dataSource.data.find(x => x.IdBlockPowers === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdBlockPowers === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdBlockPowers === 0).IdBlockPowers = submodel.IdBlockPowers;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }


  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredUser = this.user.slice();
    this.filteredProizvoditel = this.proizvoditel.slice()
    this.filteredModels = this.models.slice();
    this.filteredKabinet = this.kabinet.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdBlockPowers)
  }

  public edit(model: BlockPower): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdBlockPowers)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    this.editandadd.addandeditblockpower(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<BlockPower>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(model: BlockPower): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<BlockPower>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteBlockPower(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Swithe>) => {
      alert(model.Message);
    });
  }
  ///Отмена
  public cancel(model: BlockPower): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdBlockPowers === this.model.IdBlockPowers);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): BlockPower {
    var newuser: BlockPower = new BlockPower()
    newuser.ModelIsEdit = true;
    newuser.IdBlockPowers = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }


  modifimethod(): void {
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    this.model.ProizvoditelBlockPower ? this.model.IdProizvoditelBP = this.model.ProizvoditelBlockPower.IdProizvoditelBP : this.model.IdProizvoditelBP = null;
    this.model.ModelBlockPower ? this.model.IdModelBP = this.model.ModelBlockPower.IdModelBP : this.model.IdModelBP = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.BlockPower));
    this.dataSource.data = model.BlockPower;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.statusing = model.Statusing;
    this.supples = model.Supply;
    this.models = model.ModelBlockPower;
    this.proizvoditel = model.ProizvoditelBlockPower;
    this.user = model.Users;
    this.filteredUser = this.user.slice();
    this.filteredProizvoditel = this.proizvoditel.slice()
    this.filteredModels = this.models.slice();
    this.filteredKabinet = this.kabinet.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
    return "Модель ИБП заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }
  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameSysBlockTableModel implements INewLogicaTable<NameSysBlock> {
  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: NameSysBlock, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdModelSysBlock', 'NameComputer', 'ActionsColumn'];
  public dataSource: MatTableDataSource<NameSysBlock> = new MatTableDataSource<NameSysBlock>();

  isAdd: boolean;
  isEdit: boolean;
  model: NameSysBlock = new NameSysBlock();
  index: number;
  modeltable: NameSysBlock[];

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<NameSysBlock>('SubscribeNameSysBlock');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<NameSysBlock>(NameSysBlock, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModelSysBlock === submodel.IdModelSysBlock);
      var indexzero = this.dataSource.data.find(x => x.IdModelSysBlock === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModelSysBlock === 0).IdModelSysBlock = submodel.IdModelSysBlock;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdModelSysBlock)
  }

  public edit(model: NameSysBlock): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSysBlock)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameSysBlock(this.model).toPromise().then((model: ModelReturn<NameSysBlock>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: NameSysBlock): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModelSysBlock === this.model.IdModelSysBlock);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): NameSysBlock {
    var newuser: NameSysBlock = new NameSysBlock()
    newuser.ModelIsEdit = true;
    newuser.IdModelSysBlock = 0;
    return newuser;
  }

  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ModelSysBlok));
    this.dataSource.data = model.ModelSysBlok;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модель Наименование системных блоков заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameMonitorTableModel implements INewLogicaTable<NameMonitor> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: NameMonitor, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }
  public displayedColumns = ['IdModelMonitor', 'Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<NameMonitor> = new MatTableDataSource<NameMonitor>();


  isAdd: boolean;
  isEdit: boolean;
  model: NameMonitor = new NameMonitor();
  index: number;
  modeltable: NameMonitor[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<NameMonitor>('SubscribeNameMonitor');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<NameMonitor>(NameMonitor, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModelMonitor === submodel.IdModelMonitor);
      var indexzero = this.dataSource.data.find(x => x.IdModelMonitor === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModelMonitor === 0).IdModelMonitor = submodel.IdModelMonitor;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdModelMonitor);
  }

  public edit(model: NameMonitor): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelMonitor)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameMonitor(this.model).toPromise().then((model: ModelReturn<NameMonitor>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: NameMonitor): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModelMonitor === this.model.IdModelMonitor);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): NameMonitor {
    var newuser: NameMonitor = new NameMonitor()
    newuser.ModelIsEdit = true;
    newuser.IdModelMonitor = 0;
    return newuser;
  }

  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }


  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.NameMonitors));
    this.dataSource.data = model.NameMonitors;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модель Наименование мониторов заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameModelBlokPowerTableModel implements INewLogicaTable<ModelBlockPower> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: ModelBlockPower, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdModelBP', 'Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ModelBlockPower> = new MatTableDataSource<ModelBlockPower>();

  isAdd: boolean;
  isEdit: boolean;
  model: ModelBlockPower = new ModelBlockPower();
  index: number;
  modeltable: ModelBlockPower[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ModelBlockPower>('SubscribeModelBlockPower');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ModelBlockPower>(ModelBlockPower, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModelBP === submodel.IdModelBP);
      var indexzero = this.dataSource.data.find(x => x.IdModelBP === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModelBP === 0).IdModelBP = submodel.IdModelBP;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdModelBP);
  }

  public edit(model: ModelBlockPower): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelBP);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameModelBlokPower(this.model).toPromise().then((model: ModelReturn<ModelBlockPower>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: ModelBlockPower): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModelBP === this.model.IdModelBP);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ModelBlockPower {
    var newuser: ModelBlockPower = new ModelBlockPower()
    newuser.ModelIsEdit = true;
    newuser.IdModelBP = 0;
    return newuser;
  }

  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ModelBlockPower));
    this.dataSource.data = model.ModelBlockPower;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модель ИБП заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameProizvoditelBlockPowerTableModel implements INewLogicaTable<ProizvoditelBlockPower> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: ProizvoditelBlockPower, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdProizvoditelBP', 'Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ProizvoditelBlockPower> = new MatTableDataSource<ProizvoditelBlockPower>();

  isAdd: boolean;
  isEdit: boolean;
  model: ProizvoditelBlockPower = new ProizvoditelBlockPower();
  index: number;
  modeltable: ProizvoditelBlockPower[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ProizvoditelBlockPower>('SubscribeProizvoditelBlockPower');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ProizvoditelBlockPower>(ProizvoditelBlockPower, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdProizvoditelBP === submodel.IdProizvoditelBP);
      var indexzero = this.dataSource.data.find(x => x.IdProizvoditelBP === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdProizvoditelBP === 0).IdProizvoditelBP = submodel.IdProizvoditelBP;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdProizvoditelBP)
  }

  public edit(model: ProizvoditelBlockPower): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditelBP)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameProizvoditelBlockPower(this.model).toPromise().then((model: ModelReturn<ProizvoditelBlockPower>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: ProizvoditelBlockPower): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdProizvoditelBP === this.model.IdProizvoditelBP);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ProizvoditelBlockPower {
    var newuser: ProizvoditelBlockPower = new ProizvoditelBlockPower();
    newuser.ModelIsEdit = true;
    newuser.IdProizvoditelBP = 0;
    return newuser;
  }

  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x => x.IdProizvoditelBP === this.model.IdProizvoditelBP);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ProizvoditelBlockPower));
    this.dataSource.data = model.ProizvoditelBlockPower;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Производитель ИБП заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameFullModelTableModel implements INewLogicaTable<FullModel> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: FullModel, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdModel', 'NameModel', 'IdClasificationName', 'ActionsColumn'];
  public dataSource: MatTableDataSource<FullModel> = new MatTableDataSource<FullModel>();

  isAdd: boolean;
  isEdit: boolean;
  model: FullModel = new FullModel();
  index: number;
  modeltable: FullModel[];

  public classification: Classification[]
  public filteredClassification: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<FullModel>('SubscribeFullModel');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<FullModel>(FullModel, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModel === submodel.IdModel);
      var indexzero = this.dataSource.data.find(x => x.IdModel === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModel === 0).IdModel = submodel.IdModel;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  calbackfiltersAll() {
    this.filteredClassification = this.classification.slice();
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdModel)
  }

  edit(model: FullModel): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameFullModel(this.model).toPromise().then((model: ModelReturn<FullModel>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: FullModel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModel === this.model.IdModel);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): FullModel {
    var newuser: FullModel = new FullModel();
    newuser.ModelIsEdit = true;
    newuser.IdModel = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.Classification ? this.model.IdClasification = this.model.Classification.IdClasification : this.model.IdClasification = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Model));
    this.dataSource.data = model.Model;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.classification = model.Classification;
    this.filteredClassification = this.classification.slice();
    return "Модели принтеров(МФУ) заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameFullProizvoditelTableModel implements INewLogicaTable<FullProizvoditel> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: FullProizvoditel, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdProizvoditel', 'NameProizvoditel', 'ActionsColumn'];
  public dataSource: MatTableDataSource<FullProizvoditel> = new MatTableDataSource<FullProizvoditel>();

  isAdd: boolean;
  isEdit: boolean;
  model: FullProizvoditel = new FullProizvoditel();
  index: number;
  modeltable: FullProizvoditel[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<FullProizvoditel>('SubscribeFullProizvoditel');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<FullProizvoditel>(FullProizvoditel, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdProizvoditel === submodel.IdProizvoditel);
      var indexzero = this.dataSource.data.find(x => x.IdProizvoditel === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdProizvoditel === 0).IdProizvoditel = submodel.IdProizvoditel;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdProizvoditel)
  }

  public edit(model: FullProizvoditel): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameFullProizvoditel(this.model).toPromise().then((model: ModelReturn<FullProizvoditel>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: FullProizvoditel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdProizvoditel === this.model.IdProizvoditel);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): FullProizvoditel {
    var newuser: FullProizvoditel = new FullProizvoditel();
    newuser.ModelIsEdit = true;
    newuser.IdProizvoditel = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Proizvoditel));
    this.dataSource.data = model.Proizvoditel;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Производители принтеров(МФУ) заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameClassificationTableModel implements INewLogicaTable<Classification> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Classification, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdClasification', 'NameClass', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Classification> = new MatTableDataSource<Classification>();

  isAdd: boolean;
  isEdit: boolean;
  model: Classification = new Classification();
  index: number;
  modeltable: Classification[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Classification>('SubscribeClassification');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Classification>(Classification, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdClasification === submodel.IdClasification);
      var indexzero = this.dataSource.data.find(x => x.IdClasification === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdClasification === 0).IdClasification = submodel.IdClasification;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdClasification)
  }

  public edit(model: Classification): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdClasification)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameClassification(this.model).toPromise().then((model: ModelReturn<Classification>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: Classification): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdClasification === this.model.IdClasification);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Classification {
    var newuser: Classification = new Classification();
    newuser.ModelIsEdit = true;
    newuser.IdClasification = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Classification));
    this.dataSource.data = model.Classification;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Классификация заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}
export class NameCopySaveTableModel implements INewLogicaTable<CopySave> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: CopySave, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdCopySave', 'NameCopySave', 'SerNum', 'InventarNum', 'ActionsColumn'];
  public dataSource: MatTableDataSource<CopySave> = new MatTableDataSource<CopySave>();
  public modelvalid: ModelValidation = new ModelValidation()

  isAdd: boolean;
  isEdit: boolean;
  model: CopySave = new CopySave();
  index: number;
  modeltable: CopySave[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<CopySave>('SubscribeCopySave');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<CopySave>(CopySave, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdCopySave === submodel.IdCopySave);
      var indexzero = this.dataSource.data.find(x => x.IdCopySave === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdCopySave === 0).IdCopySave = submodel.IdCopySave;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdCopySave);
  }

  edit(model: CopySave): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdCopySave)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameCopySave(this.model).toPromise().then((model: ModelReturn<CopySave>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: CopySave): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdCopySave === this.model.IdCopySave);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): CopySave {
    var newuser: CopySave = new CopySave();
    newuser.ModelIsEdit = true;
    newuser.IdCopySave = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.CopySave));
    this.dataSource.data = model.CopySave;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "CopySave заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameKabinetTableModel implements INewLogicaTable<Kabinet> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Kabinet, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdNumberKabinet', 'NumberKabinet', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Kabinet> = new MatTableDataSource<Kabinet>();

  isAdd: boolean;
  isEdit: boolean;
  model: Kabinet = new Kabinet();
  index: number;
  modeltable: Kabinet[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Kabinet>('SubscribeKabinet');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Kabinet>(Kabinet, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdNumberKabinet === submodel.IdNumberKabinet);
      var indexzero = this.dataSource.data.find(x => x.IdNumberKabinet === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdNumberKabinet === 0).IdNumberKabinet = submodel.IdNumberKabinet;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdNumberKabinet);
  }

  edit(model: Kabinet): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdNumberKabinet)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameKabinet(this.model).toPromise().then((model: ModelReturn<Kabinet>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  cancel(model: Kabinet): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdNumberKabinet === this.model.IdNumberKabinet);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Kabinet {
    var newuser: Kabinet = new Kabinet();
    newuser.ModelIsEdit = true;
    newuser.IdNumberKabinet = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Kabinet));
    this.dataSource.data = model.Kabinet;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Кабинеты заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameSupplyTableModel implements INewLogicaTable<Supply> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Supply, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdSupply', 'NameSupply', 'NameKontract', 'DatePostavki', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Supply> = new MatTableDataSource<Supply>();

  getTime: string;

  private getDateTimeNotUpdate(): void {
    this.model.DatePostavki = moment(this.date.value).format('DD-MM-YYYY');
    this.getTime = `/Date(${moment(this.date.value, 'DD-MM-YYYY').valueOf()})/`;
  }

  isAdd: boolean;
  isEdit: boolean;
  model: Supply = new Supply();
  index: number;
  modeltable: Supply[];
  modelToServer: Supply;
  date = new FormControl(new Date());

  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Supply>('SubscribeSupply');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Supply>(Supply, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdSupply === submodel.IdSupply);
      var indexzero = this.dataSource.data.find(x => x.IdSupply === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdSupply === 0).IdSupply = submodel.IdSupply;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdSupply);
  }
  edit(model: Supply): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    console.log(model.DatePostavki);
    model.DatePostavki.match(/T/g) !== null ? this.date = new FormControl(new Date(model.DatePostavki.split("T")[0])) : this.date = new FormControl(new Date(model.DatePostavki.split("-").reverse().join("-")))
    this.addtemplate(model.IdSupply)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameSupply(this.modelToServer).toPromise().then((model: ModelReturn<Supply>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: Supply): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdSupply === this.model.IdSupply);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Supply {
    var newuser: Supply = new Supply();
    newuser.ModelIsEdit = true;
    newuser.IdSupply = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    this.getDateTimeNotUpdate();
    this.modelToServer.DatePostavki = this.getTime;
    delete this.modelToServer.DataCreate;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Supply));
    this.dataSource.data = model.Supply;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Поставщики партий заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameStatusingTableModel implements INewLogicaTable<Statusing> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Statusing, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdStatus', 'Name', 'Color', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Statusing> = new MatTableDataSource<Statusing>();

  isAdd: boolean;
  isEdit: boolean;
  model: Statusing = new Statusing();
  index: number;
  modeltable: Statusing[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Statusing>('SubscribeStatusing');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Statusing>(Statusing, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdStatus === submodel.IdStatus);
      var indexzero = this.dataSource.data.find(x => x.IdStatus === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdStatus === 0).IdStatus = submodel.IdStatus;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdStatus);
  }

  edit(model: Statusing): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdStatus)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditNameStatus(this.model).toPromise().then((model: ModelReturn<Statusing>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  public cancel(model: Statusing): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdStatus === this.model.IdStatus);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): Statusing {
    var newuser: Statusing = new Statusing();
    newuser.ModelIsEdit = true;
    newuser.IdStatus = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll(".validation");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Statusing));
    this.dataSource.data = model.Statusing;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Справочник статусов заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class NameModelSwitheTableModel implements INewLogicaTable<ModelSwithes> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: ModelSwithes, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdModelSwithes', 'NameModel', 'CountPort', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ModelSwithes> = new MatTableDataSource<ModelSwithes>();

  isAdd: boolean;
  isEdit: boolean;
  model: ModelSwithes = new ModelSwithes();
  index: number;
  modeltable: ModelSwithes[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ModelSwithes>('SubscribeModelSwithe');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ModelSwithes>(ModelSwithes, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModelSwithes === submodel.IdModelSwithes);
      var indexzero = this.dataSource.data.find(x => x.IdModelSwithes === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModelSwithes === 0).IdModelSwithes = submodel.IdModelSwithes;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdModelSwithes);
  }

  edit(model: ModelSwithes): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSwithes)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditModelSwitch(this.model).toPromise().then((model: ModelReturn<ModelSwithes>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  cancel(model: ModelSwithes): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModelSwithes === this.model.IdModelSwithes);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ModelSwithes {
    var newuser: ModelSwithes = new ModelSwithes();
    newuser.ModelIsEdit = true;
    newuser.IdModelSwithes = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ModelSwithe));
    this.dataSource.data = model.ModelSwithe;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модели комутаторов заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class ModelSeverEquipmenTableModel implements INewLogicaTable<ModelSeverEquipment>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: ModelSeverEquipment, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdModelSeverEquipment', 'NameModel', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ModelSeverEquipment> = new MatTableDataSource<ModelSeverEquipment>();

  isAdd: boolean;
  isEdit: boolean;
  model: ModelSeverEquipment = new ModelSeverEquipment();
  index: number;
  modeltable: ModelSeverEquipment[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ModelSeverEquipment>('SubscribeModelSeverEquipment');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ModelSeverEquipment>(ModelSeverEquipment, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModelSeverEquipment === submodel.IdModelSeverEquipment);
      var indexzero = this.dataSource.data.find(x => x.IdModelSeverEquipment === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModelSeverEquipment === 0).IdModelSeverEquipment = submodel.IdModelSeverEquipment;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdModelSeverEquipment);
  }

  edit(model: ModelSeverEquipment): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSeverEquipment)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditModelSeverEquipment(this.model).toPromise().then((model: ModelReturn<ModelSeverEquipment>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  cancel(model: ModelSeverEquipment): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModelSeverEquipment === this.model.IdModelSeverEquipment);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ModelSeverEquipment {
    var newuser: ModelSeverEquipment = new ModelSeverEquipment();
    newuser.ModelIsEdit = true;
    newuser.IdModelSeverEquipment = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ModelSeverEquipment));
    this.dataSource.data = model.ModelSeverEquipment;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модели сервисного оборудования заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class ManufacturerSeverEquipmentTableModel implements INewLogicaTable<ManufacturerSeverEquipment>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: ManufacturerSeverEquipment, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdManufacturerSeverEquipment', 'NameManufacturer', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ManufacturerSeverEquipment> = new MatTableDataSource<ManufacturerSeverEquipment>();

  isAdd: boolean;
  isEdit: boolean;
  model: ManufacturerSeverEquipment = new ManufacturerSeverEquipment();
  index: number;
  modeltable: ManufacturerSeverEquipment[];
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ManufacturerSeverEquipment>('SubscribeManufacturerSeverEquipment');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ManufacturerSeverEquipment>(ManufacturerSeverEquipment, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdManufacturerSeverEquipment === submodel.IdManufacturerSeverEquipment);
      var indexzero = this.dataSource.data.find(x => x.IdManufacturerSeverEquipment === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdManufacturerSeverEquipment === 0).IdManufacturerSeverEquipment = submodel.IdManufacturerSeverEquipment;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdManufacturerSeverEquipment);
  }

  edit(model: ManufacturerSeverEquipment): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdManufacturerSeverEquipment)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditManufacturerSeverEquipment(this.model).toPromise().then((model: ModelReturn<ManufacturerSeverEquipment>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }
  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }
  ///Отмена
  cancel(model: ManufacturerSeverEquipment): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdManufacturerSeverEquipment === this.model.IdManufacturerSeverEquipment);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ManufacturerSeverEquipment {
    var newuser: ManufacturerSeverEquipment = new ManufacturerSeverEquipment();
    newuser.ModelIsEdit = true;
    newuser.IdManufacturerSeverEquipment = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ManufacturerSeverEquipment));
    this.dataSource.data = model.ManufacturerSeverEquipment;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Производители сервисного оборудования заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}

export class TypeServerTableModel implements INewLogicaTable<TypeServer>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: TypeServer, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdTypeServer', 'NameType', 'ActionsColumn'];
  public dataSource: MatTableDataSource<TypeServer> = new MatTableDataSource<TypeServer>();

  isAdd: boolean;
  isEdit: boolean;
  model: TypeServer = new TypeServer();
  index: number;
  modeltable: TypeServer[];

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<TypeServer>('SubscribeTypeServer');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<TypeServer>(TypeServer, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdTypeServer === submodel.IdTypeServer);
      var indexzero = this.dataSource.data.find(x => x.IdTypeServer === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdTypeServer === 0).IdTypeServer = submodel.IdTypeServer;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdTypeServer);
  }

  edit(model: TypeServer): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdTypeServer)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditTypeServer(this.model).toPromise().then((model: ModelReturn<TypeServer>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: TypeServer): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdTypeServer === this.model.IdTypeServer);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): TypeServer {
    var newuser: TypeServer = new TypeServer();
    newuser.ModelIsEdit = true;
    newuser.IdTypeServer = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.TypeServer));
    this.dataSource.data = model.TypeServer;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Типы серверного оборудования заполнены";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }

}





export class MailIdentifiersTableModel implements INewLogicaTable<MailIdentifier>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: MailIdentifier, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }
  displayedColumns: any[] = ['IdUser', 'User.Name', 'User.TabelNumber', 'IdentifierUser', 'MailGroup.NameGroup', 'MailGroup.IdOtdelNumber', 'ActionsColumn'];
  public dataSource: MatTableDataSource<MailIdentifier> = new MatTableDataSource<MailIdentifier>();
  public modelvalid: ModelValidation = new ModelValidation()
  public group: MailGroup[];

  isAdd: boolean;
  isEdit: boolean;
  model: MailIdentifier = new MailIdentifier();
  modelToServer: MailIdentifier;
  index: number;
  modeltable: MailIdentifier[];

  public filteredMailGroup: any;

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<MailIdentifier>('SubscribeModelMailIdentifier');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<MailIdentifier>(MailIdentifier, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdUser === submodel.IdUser);
      var indexzero = this.dataSource.data.find(x => x.IdUser === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdUser === 0).IdUser = submodel.IdUser;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (data[column.split('.')[0]][column.split('.')[1]]) {
                if (typeof (data[column.split('.')[0]][column.split('.')[1]]) !== 'number') {
                  tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                }
              }
            }
          }
        }
      }
      return tot;
    }
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredMailGroup = this.group.slice();
  }

  public async add(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  edit(model: MailIdentifier): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdUser)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<MailIdentifier>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.editModelMailIdentifier(this.modelToServer).toPromise().then((model: ModelReturn<MailIdentifier>) => {
      console.log(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: MailIdentifier): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdUser === this.model.IdUser);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }


  newmodel(): MailIdentifier {
    throw new Error("Method not implemented.");
  }


  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.MailGroup ? this.model.IdGroupMail = this.model.MailGroup.IdGroupMail : this.model.IdGroupMail = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }




  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.MailIdentifier));
    this.dataSource.data = model.MailIdentifier;
    this.castomefiltermodel();
    this.group = model.MailGroup;
    this.filteredMailGroup = this.group.slice();
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модели идентификаторов заполнены";
  }


  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}


export class MailGroupTableModel implements INewLogicaTable<MailGroup>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: MailGroup, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  displayedColumns: any[] = ['IdGroupMail', 'NameGroup', 'IdOtdelNumber', 'ActionsColumn'];
  public dataSource: MatTableDataSource<MailGroup> = new MatTableDataSource<MailGroup>();
  public modelvalid: ModelValidation = new ModelValidation()

  isAdd: boolean;
  isEdit: boolean;
  model: MailGroup = new MailGroup();
  modelToServer: MailGroup;
  index: number;
  modeltable: MailGroup[];
  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any //Заложенный шаблон Массив
  rowList: any    //Строка по номеру из БД Массив 
  fulltemplate: ElementRef<any>  //Полный шаблон для манипуляции
  table: ElementRef<any>  //Полный шаблон для манипуляции


  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<MailGroup>('SubscribeModelMailGroups');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<MailGroup>(MailGroup, substring);
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdGroupMail === submodel.IdGroupMail);
      var indexzero = this.dataSource.data.find(x => x.IdGroupMail === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdGroupMail === 0).IdGroupMail = submodel.IdGroupMail;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.IdGroupMail);
  }

  edit(model: MailGroup): void {
    model.ModelIsEdit = true;
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdGroupMail);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<MailGroup>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.editModelMailGroup(this.modelToServer).toPromise().then((model: ModelReturn<MailGroup>) => {
      if (model.Model === null) {
        this.isEditAndAddFalse();
        this.dataSource.data.pop();
        this.dataSource._updateChangeSubscription();
        this.removetemplate();
      }
      alert(model.Message);
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: MailGroup): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdGroupMail === this.model.IdGroupMail);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): MailGroup {
    var newuser: MailGroup = new MailGroup();
    newuser.ModelIsEdit = true;
    newuser.IdGroupMail = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.MailGroup));
    this.dataSource.data = model.MailGroup;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модели групп заполнены";
  }


  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }
}
