import {
  Users, FullSelectedModel, Otdel, Position, Printer, Mfu, ScanerAndCamer, SysBlock, CopySave,
  Monitor, NameSysBlock, Supply, Classification, Swithe,
  Kabinet, FullModel, Statusing, FullProizvoditel, ModelReturn, NameMonitor, Telephon, BlockPower, ProizvoditelBlockPower, ModeleReturn, MailIdentifier, MailGroup, ServerEquipment, Token,
  FullTemplateSupport, ModelParametrSupport, ModelSeverEquipment, ManufacturerSeverEquipment, TypeServer, AllTechnics, RuleUsers, JournalAis3, OtherAll, EventProcess, ParameterEventProcess
} from '../../ModelInventory/InventoryModel';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ModelValidation } from '../ValidationModel/UserValidation';
import { EditAndAdd, AuthIdentificationSignalR, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { ConvertDate } from '../../AddFunctionConvertDate/ConvertDateModel';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { ElementRef, ViewChild } from '@angular/core';
import { BroadcastEventListener } from 'ng2-signalr';
import { deserialize } from 'class-transformer';
import { FormControl } from '@angular/forms';
import { ModelDialog, DialogDiscription } from '../ModelDialogDiscription/View/DialogDiscription';
import { SelectionModel } from '@angular/cdk/collections';
import { INewLogicaTable, SettingDepartmentCaseGetServer, SettingDepartmentCaseToServer, Rb_Holiday, CategoryPhoneHeader, RegulationsDepartment, RegulationsDepartmentToServer, ResourceIt, TaskAis3, ModelOther, ProizvoditelOther, TypeOther, AksiokAddAndEdit, ModelBlockPower, ModelSwithes, SelectDayOfTheWeek } from '../../ModelInventory/InventoryModel';
import { ModelSelect, ParametrsAct } from '../../AllSelectModel/ParametrModel';
import { DialogAksiokEditAndAdd } from '../DialogAksiokEditAndAdd/DialogAksiokEditAndAddTs/DialogAksiokEditAndAdd';
const moment = _rollupMoment || _moment;

///Добавление ролей в БД на пользователя 
export class AddAndDeleteRuleUser {

  constructor(public editandadd: EditAndAdd) { }

  public loaded: boolean = false;
  public displayedColumnsUser = ['Select', 'NameUser', 'TabelNumber'];
  public dataSourceUser: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  table: ElementRef<any>;  //Полный шаблон для манипуляции

  @ViewChild('roles', { static: true }) paginatorUserRoles: MatPaginator;
  public displayedColumnsRule = ['Select', 'IdRule', 'NameRules'];
  public dataSourceRule: MatTableDataSource<RuleUsers> = new MatTableDataSource<RuleUsers>();
  public firstUser: string = null;

  public filterstableRule(filterValue: string): void {
    filterValue = filterValue.trim();  //Remove whitespace
    filterValue = filterValue.toLowerCase();  //MatTableDataSource defaults to lowercase matches
    this.dataSourceRule.filter = filterValue;
  }


  public filterstableUser(filterValue: string): void {
    filterValue = filterValue.trim();  //Remove whitespace
    filterValue = filterValue.toLowerCase();  //MatTableDataSource defaults to lowercase matches
    this.dataSourceUser.filter = filterValue;
  }

  selectionUsers = new SelectionModel<Users>(false, []);

  selectUserDb() {
    if (this.selectionUsers.selected.length === 1) {
      this.firstUser = "Роли пользователя: " + this.selectionUsers.selected[0].NameUser
      this.editandadd.ruleAndUsers(this.selectionUsers.selected[0].IdUser).toPromise().then((model: RuleUsers[]) => {
        if (model) {
          this.dataSourceRule.data = model;
        }
      });
    }
    else {
      this.firstUser = null;
      this.dataSourceRule.data = null;
      this.dataSourceRule._updateChangeSubscription();
    }
  }

  isChechRule(row: RuleUsers): boolean {
    if (row.idField !== null) {
      return true;
    }
    return false;
  }

  enableRule(row: RuleUsers) {
    row.idUserField = this.selectionUsers.selected[0].IdUser;
    this.editandadd.addandDeleteRuleUser(row).toPromise().then((model: RuleUsers[]) => {
      if (model) {
        this.dataSourceRule.data = model;
      }
    })
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef): Promise<string> {
    this.table = table;
    this.dataSourceUser.data = JSON.parse(JSON.stringify(model.Users));
    this.dataSourceUser.paginator = paginator;
    this.dataSourceUser.sort = sort;
    return "Модель пользователей заполнена";
  }
}




export class OtdelTableModel implements INewLogicaTable<Otdel>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: Otdel, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdOtdel', 'CodeOtdel', 'NameOtdel', 'NameRuk', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Otdel> = new MatTableDataSource<Otdel>();

  public isEdit: boolean = false;
  public isAdd: boolean = false;

  modelCancelError: Otdel = new Otdel();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdOtdel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<Otdel>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addandeditotdel(this.model).toPromise().then((model: ModelReturn<Otdel>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.modeltable = JSON.parse(JSON.stringify(model.Otdels));
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.dataSource.sort = sort;
    this.dataSource.paginator = paginator;
    this.dataSource.data = model.Otdels;
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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
    if (SignalR !== null) {
      this.subscribeservers();
    }
  }

  createSTO(model: Users, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
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


  public displayedColumns = ['Logic', 'IdUser', 'NameUser', 'TabelNumber', 'Telephon.SerNumber', 'Telephon.Telephon_', 'Telephon.TelephonUndeground', 'Position.NamePosition', 'Otdel.NameOtdel', 'StatusActual', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  public modelvalid: ModelValidation = new ModelValidation()
  public otdels: Otdel[];
  public modelCancelError: Users = new Users();
  public model: Users = new Users();

  //public rule: Rules[];
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
  //public filteredRule: any;
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

        var indexData = this.dataSource.data.find(x => x.IdUser === model.Model.IdUser);
        this.dataSource.data[this.dataSource.data.indexOf(indexData)] = model.Model;
        this.modeltable[this.modeltable.indexOf(indexData)] = model.Model;
        this.dataSource._updateChangeSubscription();
      }
    })
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Users>(Users, substring);
      this.index = 0;
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
    //this.model.Rule ? this.model.IdRule = this.model.Rule.IdRule : this.model.IdRule = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
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
    // this.filteredRule = this.rule.slice();
  }

  newmodel(): Users {
    var newuser: Users = new Users()
    newuser.ModelIsEdit = true;
    newuser.IdUser = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.modelCancelError = JSON.parse(JSON.stringify(user));
    this.model = JSON.parse(JSON.stringify(user));
    this.isEditAndAddTrue();
    this.addtemplate(user.IdUser)
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.editandadd.addandedituser(converter.convertDateToServer<Users>(this.model), this.SignalR.iduser).subscribe((model: ModelReturn<Users>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }
  //Удаление
  public delete(model: Users): void {
    var converter = new ConvertDate();
    this.editandadd.deleteUser(converter.convertDateToServer<Users>(JSON.parse(JSON.stringify(model))), this.SignalR.iduser).subscribe((model: ModeleReturn<Users>) => {
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
    this.dataSource.data = model.Users;
    this.otdels = model.Otdels;
    this.telephone = model.Telephon.filter(x => x.Telephon_ !== undefined);
    this.position = model.Position;
    this.filteredOtdel = this.otdels.slice();
    this.filteredPosition = this.position.slice();
    this.filteredTelephone = this.telephone.slice();
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

  public aksiokEditAndAdd(model: Swithe, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNum;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.SerNum;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }


  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public models: ModelSwithes[];
  public statusing: Statusing[];
  public supples: Supply[]
  public user: Users[];

  displayedColumns = ['Logic', 'IdSwithes', 'User.NameUser', 'Supply.DatePostavki', 'ModelSwithe.NameModel', 'ModelSwithe.CountPort', 'ServiceNum', 'SerNum', 'InventarNum', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
  dataSource: MatTableDataSource<Swithe> = new MatTableDataSource<Swithe>();
  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: Swithe = new Swithe();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdSwithes === submodel.IdSwithes);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Swithe>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditswitch(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Swithe>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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

  public aksiokEditAndAdd(model: ServerEquipment, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNum;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.SerNum;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }

  public modelvalid: ModelValidation = new ModelValidation()
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public supples: Supply[];
  public typeServer: TypeServer[];
  public modelSeverEquipment: ModelSeverEquipment[];
  public manufacturerSeverEquipment: ManufacturerSeverEquipment[];

  displayedColumns = ['Logic', 'Id', 'Supply.DatePostavki', 'TypeServer.NameType', 'ModelSeverEquipment.NameModel', 'ManufacturerSeverEquipment.NameManufacturer', 'ServiceNum', 'SerNum', 'InventarNum', 'NameServer', 'IpAdress', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];

  dataSource: MatTableDataSource<ServerEquipment> = new MatTableDataSource<ServerEquipment>();
  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: ServerEquipment = new ServerEquipment();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.Id === submodel.Id);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<ServerEquipment>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addAndEditServerEquipment(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<ServerEquipment>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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


export class OtherAllTableModel implements INewLogicaTable<OtherAll>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: OtherAll, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public aksiokEditAndAdd(model: OtherAll, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNum;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.SerNum;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }


  public modelvalid: ModelValidation = new ModelValidation();

  public modelOther: ModelOther[];
  public proizvoditelOther: ProizvoditelOther[];
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public supples: Supply[];
  public typeOther: TypeOther[];
  public user: Users[];

  displayedColumns = ['Logic', 'IdOtherAll', 'User.NameUser', 'Supply.DatePostavki', 'TypeOther.Name', 'ModelOther.Name', 'ProizvoditelOther.Name', 'ServiceNumber', 'SerNum', 'InventarNum', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
  dataSource: MatTableDataSource<OtherAll> = new MatTableDataSource<OtherAll>();
  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: OtherAll = new OtherAll();
  model: OtherAll = new OtherAll();
  modelToServer: OtherAll;
  index: number;
  modeltable: OtherAll[];

  public filteredModelOther: any;
  public filteredProizvoditelOther: any;
  public filteredKabinet: any;
  public filteredStatusing: any;
  public filteredSupply: any;
  public filteredTypeOther: any;
  public filteredUsers: any;

  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<OtherAll>('SubscribeOtherAll');
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteOtherAll');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<OtherAll>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdOtherAll === model.Model.IdOtherAll);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<OtherAll>(OtherAll, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdOtherAll === submodel.IdOtherAll);
      var indexzero = this.dataSource.data.find(x => x.IdOtherAll === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdOtherAll === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdOtherAll === 0).IdOtherAll = submodel.IdOtherAll;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdOtherAll === submodel.IdOtherAll);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.filteredModelOther = this.modelOther.slice();
    this.filteredProizvoditelOther = this.proizvoditelOther.slice();
    this.filteredKabinet = this.kabinet.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredSupply = this.supples.slice();
    this.filteredTypeOther = this.typeOther.slice();
    this.filteredUsers = this.user.slice();
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
    this.addtemplate(newmodel.IdOtherAll)
  }

  public edit(model: OtherAll): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdOtherAll)
    this.isEditAndAddTrue();
  }

  save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<OtherAll>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addAndEditOtherAll(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<OtherAll>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(model: OtherAll): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<OtherAll>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteOtherAll(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<OtherAll>) => {
      alert(model.Message);
    });
  }

  ///Отмена
  cancel(model: OtherAll): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdOtherAll === this.model.IdOtherAll);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): OtherAll {
    var newuser: OtherAll = new OtherAll()
    newuser.ModelIsEdit = true;
    newuser.IdOtherAll = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.model.ModelOther ? this.model.IdModelOther = this.model.ModelOther.IdModelOther : this.model.IdModelOther = null;
    this.model.ProizvoditelOther ? this.model.IdProizvoditelOther = this.model.ProizvoditelOther.IdProizvoditelOther : this.model.IdProizvoditelOther = null;
    this.model.Kabinet ? this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet : this.model.IdNumberKabinet = null;
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.TypeOther ? this.model.IdTypeOther = this.model.TypeOther.IdTypeOther : this.model.IdTypeOther = null;
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.OtherAll));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.OtherAll;
    this.modelOther = model.ModelOther;
    this.proizvoditelOther = model.ProizvoditelOther;
    this.kabinet = model.Kabinet;
    this.statusing = model.Statusing;
    this.supples = model.Supply;
    this.typeOther = model.TypeOther;
    this.user = model.Users.filter(x => x.StatusActual !== 2);
    this.calbackfiltersAll();
    return "Модель разного оборудования заполнена";
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


export class TokenTableModel implements INewLogicaTable<Token>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: Token, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public modelvalid: ModelValidation = new ModelValidation()
  public statusing: Statusing[];
  public supples: Supply[];
  public user: Users[];

  public SysBlockAllModel: SysBlock[];
  public sysblock: SysBlock[];

  public displayedColumns = ['Logic', 'IdToken', 'User.NameUser', 'Supply.DatePostavki', 'ProizvoditelName', 'SerNum', 'SysBlock.NameComputer', 'SysBlock.ServiceNum', 'SysBlock.SerNum', 'SysBlock.InventarNumSysBlok', 'SysBlock.IpAdress', 'SysBlock.Kabinet.NumberKabinet', 'Coment', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn']
  dataSource: MatTableDataSource<Token> = new MatTableDataSource<Token>();
  isAdd: boolean;
  isEdit: boolean;

  modelCancelError: Token = new Token();
  model: Token = new Token();
  modelToServer: Token;
  index: number;
  modeltable: Token[];

  public filteredSupples: any;
  public filteredUser: any;
  public filteredSysBlock: any;
  public filteredStatusing: any;

  //Подписка
  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;


  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Token>('SubscribeToken');
    this.subscribeDelete = new BroadcastEventListener<string>('SubscribeDeleteToken');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Token>) => {
      if (model.Index === 0) {
        let index: number = this.dataSource.data.findIndex(item => item.IdToken === model.Model.IdToken);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<Token>(Token, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdToken === submodel.IdToken);
      var indexzero = this.dataSource.data.find(x => x.IdToken === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdToken === 0).IdHistory = submodel.IdHistory;
          this.dataSource.data.find(x => x.IdToken === 0).IdToken = submodel.IdToken;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdToken === submodel.IdToken);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
              if (typeof (data[column.split('.')[0]][column.split('.')[1]]) === 'object') {
                if (data[column.split('.')[0]][column.split('.')[1]][column.split('.')[2]]) {
                  tot = (tot || data[column.split('.')[0]][column.split('.')[1]][column.split('.')[2]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                }
              }
              else {
                if (data[column.split('.')[0]][column.split('.')[1]]) {
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
  //Фильтрация компьютеров победа
  public async filterSysBlokToken(value: any) {
    if (value != null) {
      this.model.SysBlock = null
      this.filteredSysBlock = null
      this.sysblock = this.SysBlockAllModel.filter(x => x.IdUser === value.IdUser && x.IdStatus !== 16)
    }
    else {
      this.sysblock = this.SysBlockAllModel.filter(x => x.IdUser === this.modelCancelError.IdUser && x.IdStatus !== 16)
    }
    this.filteredSysBlock = this.sysblock;
  }


  public calbackfiltersAll(): void {
    this.filteredStatusing = this.statusing.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredUser = this.user.slice();
    this.filteredSysBlock = this.sysblock.slice();
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
    this.addtemplate(newmodel.IdToken)
  }

  public edit(model: Token): void {
    this.sysblock = this.SysBlockAllModel.filter(x => x.IdUser === model.IdUser && new Array(undefined, null, 16).some(y => y === x.IdStatus))
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.filterSysBlokToken(null);
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdToken);
    this.isEditAndAddTrue();
  }

  ///Конвертация даты поставки во вложенной моделе подготовка оправки на сервер
  public sveDateTimeConvertModel(object: any) {
    for (var property in object) {
      if (typeof (object[property]) === 'object') {
        object[property] = this.sveDateTimeConvertModel(object[property]);
      }
      else {
        if (property === 'DatePostavki') {
          object[property] = `/Date(${new Date(object[property]).getTime()})/`;
        }
      }
    }
    return object
  }

  save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    this.sveDateTimeConvertModel(this.modelToServer);
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Token>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addAndEditToken(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Token>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(model: Token): void {
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Token>(JSON.parse(JSON.stringify(model)));
    this.editandadd.deleteToken(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModeleReturn<Token>) => {
      alert(model.Message);
    });
  }

  ///Отмена
  cancel(model: Token): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdToken === this.model.IdToken);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
    this.calbackfiltersAll();
  }

  newmodel(): Token {
    var newuser: Token = new Token()
    newuser.ModelIsEdit = true;
    newuser.IdToken = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.model.Statusing ? this.model.IdStatus = this.model.Statusing.IdStatus : this.model.IdStatus = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    this.model.SysBlock ? this.model.IdSysBlock = this.model.SysBlock.IdSysBlock : this.model.IdSysBlock = null;
    if (this.model.Supply) {
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if (this.model.Supply.DatePostavki.length <= 10) {
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-") + "T00:00:00.000Z"
      }
    }
    if (this.model.SysBlock) {
      if (this.model.SysBlock.Supply) {
        this.model.SysBlock.Supply.DatePostavki = null;
      }
    }
    else {
      this.model.IdSupply = null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Token));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.Token;
    this.statusing = model.Statusing;
    this.supples = model.Supply;
    this.user = model.Users.filter(x => x.StatusActual !== 2);
    this.SysBlockAllModel = model.SysBlok;
    this.sysblock = [];
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredSysBlock = this.sysblock.slice();
    this.filteredUser = this.user.slice();
    return "Модель токенов заполнена";
  }

  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.sysblock = [];
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

  public aksiokEditAndAdd(model: Printer, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNumber;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.ZavNumber;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }

  public displayedColumns = ['Logic', 'IdModel', 'User.NameUser', 'Supply.DatePostavki', 'FullProizvoditel.NameProizvoditel', 'FullModel.NameModel', 'Name', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'IpAdress', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
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
  modelCancelError: Printer = new Printer();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdPrinter === submodel.IdPrinter);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Printer>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditprinter(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Printer>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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

  public aksiokEditAndAdd(model: ScanerAndCamer, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNumber;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.ZavNumber;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }


  public displayedColumns = ['Logic', 'IdModel', 'User.NameUser', 'Supply.DatePostavki', 'FullProizvoditel.NameProizvoditel', 'FullModel.NameModel', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'IpAdress', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
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
  modelCancelError: ScanerAndCamer = new ScanerAndCamer();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdScaner === submodel.IdScaner);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<ScanerAndCamer>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditscaner(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<ScanerAndCamer>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.models = model.Model.filter(x => [2, 4, 5].includes(x.IdClasification));;
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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

  public aksiokEditAndAdd(model: Mfu, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNumber;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.ZavNumber;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }


  public displayedColumns = ['Logic', 'IdModel', 'User.NameUser', 'Supply.DatePostavki', 'FullProizvoditel.NameProizvoditel', 'FullModel.NameModel', 'Name', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'IpAdress', 'CopySave.SerNum', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
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
  modelCancelError: Mfu = new Mfu();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdMfu === submodel.IdMfu);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Mfu>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditmfu(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Mfu>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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
    if (model.User) {
      model.User.Otdel.User = null;
      if (model.User.Telephon) {
        model.User.Telephon.User = null;
      }
    }
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

  public aksiokEditAndAdd(model: SysBlock, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNumSysBlok;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.SerNum;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }

  ///Создание акта
  public createAct(model: SysBlock) {
    var modelSelect = new ModelSelect(0);
    modelSelect.parametrsActField = new ParametrsAct();
    modelSelect.parametrsActField.idClasificationActField = 1;
    modelSelect.parametrsActField.idModelTemplateField = model.IdSysBlock;
    this.editandadd.createAct(modelSelect, model.SerNum);
  }

  public displayedColumns = ['Logic', 'IdModel', 'User.NameUser', 'Supply.DatePostavki', 'NameSysBlock.NameComputer', 'ServiceNum', 'SerNum', 'InventarNumSysBlok', 'NameComputer', 'IpAdress', 'Kabinet.NumberKabinet', 'Coment', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
  public dataSource: MatTableDataSource<SysBlock> = new MatTableDataSource<SysBlock>();
  public modelvalid: ModelValidation = new ModelValidation()
  public models: NameSysBlock[];
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public user: Users[];
  public supples: Supply[]

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: SysBlock = new SysBlock();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdSysBlock === submodel.IdSysBlock);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<SysBlock>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditsysblok(this.modelToServer, this.SignalR.iduser).subscribe((model: ModelReturn<SysBlock>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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
    if (model.User) {
      model.User.Otdel.User = null;
    }
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
      var IdUser = model.IdUser;
      if (result) {
        if (result.isUserCreater) {
          IdUser = authService.autorization.idUserField;
        }
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorization.loginField,
          authService.autorization.passwordField,
          template.IdTemplate, result.discription, IdUser, 0, model.IdMonitor)).toPromise().then((model: ModelParametrSupport) => {
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

  public aksiokEditAndAdd(model: Monitor, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNumMonitor;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.SerNum;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }

  public displayedColumns = ['Logic', 'IdModel', 'User.NameUser', 'Supply.DatePostavki', 'NameMonitor.NameManufacturer', 'NameMonitor.NameModel', 'ServiceNum', 'SerNum', 'InventarNumMonitor', 'Kabinet.NumberKabinet', 'Coment', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();
  public modelvalid: ModelValidation = new ModelValidation()
  public models: NameMonitor[];
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public user: Users[];
  public supples: Supply[]


  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: Monitor = new Monitor();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdMonitor === submodel.IdMonitor);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdMonitor)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if (this.modelToServer.Supply) {
      this.modelToServer.Supply.DatePostavki = `/Date(${new Date(this.modelToServer.Supply.DatePostavki).getTime()})/`;
    }
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Monitor>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditmonitor(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Monitor>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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

  public displayedColumns = ['Logic', 'IdTelephone', 'User.NameUser', 'Supply.DatePostavki', 'NameTelephone', 'Telephon_', 'TelephonUndeground', 'ServiceNum', 'SerNumber', 'InventarNumberTelephone', 'IpTelephon', 'MacTelephon', 'Kabinet.NumberKabinet', 'Coment', 'Statusing.NameStatus', 'CategoryPhoneHeader.NameHeaders', 'WriteOffSign', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Telephon> = new MatTableDataSource<Telephon>();
  public modelvalid: ModelValidation = new ModelValidation()

  public users: Users[];
  public supples: Supply[]
  public kabinet: Kabinet[];
  public statusing: Statusing[];
  public categoryPhoneHeader: CategoryPhoneHeader[];

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: Telephon = new Telephon();
  model: Telephon = new Telephon();
  index: number;
  modeltable: Telephon[];
  modelToServer: Telephon;
  public filteredUsers: any;
  public filteredKabinet: any;
  public filteredSupples: any;
  public filteredStatusing: any;
  public filteredCategoryPhoneHeader: any;
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
      this.index = 0;
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
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdTelephon === submodel.IdTelephon);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<Telephon>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandedittelephon(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<Telephon>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    this.model.CategoryPhoneHeader ? this.model.IdCategoryHeaders = this.model.CategoryPhoneHeader.IdCategoryHeaders : this.model.IdCategoryHeaders = null;
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
    // this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Telephon));
    this.dataSource.data = JSON.parse(JSON.stringify(model.Telephon));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.users = model.Users;
    this.kabinet = model.Kabinet;
    this.statusing = model.Statusing;
    this.supples = model.Supply;
    this.categoryPhoneHeader = model.CategoryPhoneHeader;
    this.filteredUsers = this.users.slice();
    this.filteredKabinet = this.kabinet.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredCategoryPhoneHeader = this.categoryPhoneHeader.slice();
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

  public aksiokEditAndAdd(model: BlockPower, modelRequest: string, dialog: MatDialog, authService: AuthIdentification) {
    this.editandadd.isBeginTask(6).toPromise().then((isCheck: boolean) => {
      var isBeginTask = isCheck
      if (isBeginTask) {
        var aksiokAddAndEdit = new AksiokAddAndEdit();
        aksiokAddAndEdit.parametersModelField.modelRequestField = modelRequest;
        aksiokAddAndEdit.parametersModelField.inventoryNumField = model.InventarNumber;
        aksiokAddAndEdit.parametersModelField.serNumberField = model.ZavNumber;
        if (aksiokAddAndEdit.parametersModelField.modelRequestField === 'Edit' || aksiokAddAndEdit.parametersModelField.modelRequestField === 'Add') {
          this.editandadd.validationModelAksiok(aksiokAddAndEdit).toPromise().then((modelAksiok: AksiokAddAndEdit) => {
            if (modelAksiok.parametersModelField.errorServerField) {
              alert(modelAksiok.parametersModelField.errorServerField);
              return;
            }
            else {
              const dialogRef = dialog.open(DialogAksiokEditAndAdd, {
                width: "1000px",
                height: "750px",
                data: modelAksiok
              })
            }
          });
        }
        else {
          aksiokAddAndEdit.parametersModelField.loginUserField = authService.autorization.loginField;
          aksiokAddAndEdit.parametersModelField.passwordField = authService.autorization.passwordField;
          this.editandadd.uploadFileAksiok(aksiokAddAndEdit);
        }
      }
      else {
        alert("Процесс по синхронизации данных ещё не завершён!!!")
      }
    });
  }


  public displayedColumns = ['Logic', 'IdBlockPowers', 'User.NameUser', 'Supply.DatePostavki', 'ProizvoditelBlockPower.Name', 'ModelBlockPower.Name', 'ZavNumber', 'ServiceNumber', 'InventarNumber', 'Coment', 'Kabinet.NumberKabinet', 'Statusing.NameStatus', 'WriteOffSign', 'ActionsColumn'];
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
  modelCancelError: BlockPower = new BlockPower();
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
      this.index = 0;
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
        ///В случае списания удаляем модель с интерфейся
        if (submodel.WriteOffSign) {
          let index: number = this.dataSource.data.findIndex(item => item.IdBlockPowers === submodel.IdBlockPowers);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<BlockPower>(JSON.parse(JSON.stringify(this.modelToServer)));
    this.editandadd.addandeditblockpower(this.modelToServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<BlockPower>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.user = model.Users.filter(x => x.StatusActual !== 2);
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
  modelCancelError: NameSysBlock = new NameSysBlock();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSysBlock)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<NameSysBlock>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameSysBlock(this.model).toPromise().then((model: ModelReturn<NameSysBlock>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  public displayedColumns = ['IdModelMonitor', 'NameManufacturer', 'ActionsColumn'];
  public dataSource: MatTableDataSource<NameMonitor> = new MatTableDataSource<NameMonitor>();


  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: NameMonitor = new NameMonitor();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelMonitor)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<NameMonitor>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameMonitor(this.model).toPromise().then((model: ModelReturn<NameMonitor>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: ModelBlockPower = new ModelBlockPower();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelBP);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ModelBlockPower>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameModelBlokPower(this.model).toPromise().then((model: ModelReturn<ModelBlockPower>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: ProizvoditelBlockPower = new ProizvoditelBlockPower();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditelBP)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ProizvoditelBlockPower>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameProizvoditelBlockPower(this.model).toPromise().then((model: ModelReturn<ProizvoditelBlockPower>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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

  public displayedColumns = ['IdModel', 'NameModel', 'UrlModel', 'AutoSupport', 'TypeToner', 'IdClasificationName', 'ActionsColumn'];
  public dataSource: MatTableDataSource<FullModel> = new MatTableDataSource<FullModel>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: FullModel = new FullModel();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<FullModel>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameFullModel(this.model).toPromise().then((model: ModelReturn<FullModel>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: FullProizvoditel = new FullProizvoditel();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<FullProizvoditel>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameFullProizvoditel(this.model).toPromise().then((model: ModelReturn<FullProizvoditel>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: Classification = new Classification();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdClasification)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<Classification>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameClassification(this.model).toPromise().then((model: ModelReturn<Classification>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: CopySave = new CopySave();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdCopySave)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<CopySave>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameCopySave(this.model).toPromise().then((model: ModelReturn<CopySave>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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

  public displayedColumns = ['Logic', 'IdNumberKabinet', 'NumberKabinet', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Kabinet> = new MatTableDataSource<Kabinet>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: Kabinet = new Kabinet();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdNumberKabinet)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<Kabinet>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameKabinet(this.model).toPromise().then((model: ModelReturn<Kabinet>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: Supply = new Supply();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    console.log(model.DatePostavki);
    model.DatePostavki.match(/T/g) !== null ? this.date = new FormControl(new Date(model.DatePostavki.split("T")[0])) : this.date = new FormControl(new Date(model.DatePostavki.split("-").reverse().join("-")))
    this.addtemplate(model.IdSupply)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<Supply>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameSupplys(this.modelToServer).toPromise().then((model: ModelReturn<Supply>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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

  public displayedColumns = ['IdStatus', 'NameStatus', 'Color', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Statusing> = new MatTableDataSource<Statusing>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: Statusing = new Statusing();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdStatus)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<Statusing>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditNameStatus(this.model).toPromise().then((model: ModelReturn<Statusing>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: ModelSwithes = new ModelSwithes();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSwithes)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ModelSwithes>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditModelSwitch(this.model).toPromise().then((model: ModelReturn<ModelSwithes>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: ModelSeverEquipment = new ModelSeverEquipment();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSeverEquipment)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ModelSeverEquipment>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditModelSeverEquipment(this.model).toPromise().then((model: ModelReturn<ModelSeverEquipment>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: ManufacturerSeverEquipment = new ManufacturerSeverEquipment();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdManufacturerSeverEquipment)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ManufacturerSeverEquipment>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditManufacturerSeverEquipment(this.model).toPromise().then((model: ModelReturn<ManufacturerSeverEquipment>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: TypeServer = new TypeServer();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdTypeServer)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<TypeServer>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditTypeServer(this.model).toPromise().then((model: ModelReturn<TypeServer>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  displayedColumns: any[] = ['IdUser', 'User.NameUser', 'User.TabelNumber', 'IdentifierUser', 'MailGroup.NameGroup', 'MailGroup.IdOtdelNumber', 'ActionsColumn'];
  public dataSource: MatTableDataSource<MailIdentifier> = new MatTableDataSource<MailIdentifier>();
  public modelvalid: ModelValidation = new ModelValidation()
  public group: MailGroup[];

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: MailIdentifier = new MailIdentifier();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdUser)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<MailIdentifier>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.editModelMailIdentifier(this.modelToServer).toPromise().then((model: ModelReturn<MailIdentifier>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  modelCancelError: MailGroup = new MailGroup();
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
      this.index = 0;
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
    this.modelCancelError = JSON.parse(JSON.stringify(model));
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
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
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
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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

export class AllTechnicsLkModel implements INewLogicaTable<AllTechnics>{

  constructor(public editandadd: EditAndAdd) { }


  createSTO(model: AllTechnics, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    var modelDialog = new ModelDialog();
    modelDialog.discription = template.Description;
    modelDialog.info = template.InfoTemplate;
    modelDialog.name = template.Name;
    modelDialog.idTemplate = template.IdTemplate;
    modelDialog.rowModel = model;
    modelDialog.isItDepartmen = false;
    const dialogRef = dialog.open(DialogDiscription, {
      width: "800px",
      height: "500px",
      data: modelDialog
    })
    dialogRef.afterClosed().subscribe((result: ModelDialog) => {
      console.log(result);
      if (result) {
        var IdUser = authService.autorizationLk.idUserField;
        var IdMfu = model.Item === "МФУ" ? model.Id : 0;
        var IdMonitor = model.Item === "Монитор" ? model.Id : 0;
        var IdPrinter = model.Item === "Принтер" ? model.Id : 0;
        var IdSysBlock = model.Item === "СБ" ? model.Id : 0;
        var IdScanner = model.Item === "Сканер/Камера" ? model.Id : 0;
        var IdTelephon = model.Item === "Телефон" ? model.Id : 0;
        this.editandadd.createSupport(new ModelParametrSupport(
          authService.autorizationLk.loginField,
          authService.autorizationLk.passwordField,
          template.IdTemplate, result.discription, IdUser, IdMfu, IdMonitor, IdPrinter, IdSysBlock, IdScanner, IdTelephon)).toPromise().then((model: ModelParametrSupport) => {
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

  public displayedColumns: any[] = ['Logic', 'Item', 'Users', 'NameManufacturer', 'NameModel', 'SerNum', 'ServiceNum', 'NameServer', 'IpAdress', 'NumberKabinet', 'NameStatus'];
  public dataSource: MatTableDataSource<AllTechnics> = new MatTableDataSource<AllTechnics>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: AllTechnics;
  model: AllTechnics;
  index: number;
  modeltable: AllTechnics[];
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  delay(ms: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addtemplate(index: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removetemplate(): void {
    throw new Error("Method not implemented.");
  }
  add(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  edit(model: AllTechnics): void {
    throw new Error("Method not implemented.");
  }
  save(): void {
    throw new Error("Method not implemented.");
  }
  delete(model: AllTechnics): void {
    throw new Error("Method not implemented.");
  }
  cancel(model: AllTechnics): void {
    throw new Error("Method not implemented.");
  }
  newmodel(): AllTechnics {
    throw new Error("Method not implemented.");
  }
  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }
  modifimethod(): void {
    throw new Error("Method not implemented.");
  }
  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.AllTechnics));
    this.dataSource.data = model.AllTechnics;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модель Техники ЛК заполнена";
  }
  isEditAndAddTrue(): void {
    throw new Error("Method not implemented.");
  }
  isEditAndAddFalse(): void {
    throw new Error("Method not implemented.");
  }

}

export class SettingDepartmentCaseTableModel implements INewLogicaTable<SettingDepartmentCaseGetServer>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: SettingDepartmentCaseGetServer, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error('Method not implemented.');
  }

  public displayedColumns = ['IdOtdel', 'NameOtdel', 'InameOtdel', 'RnameOtdel', 'DnameOtdel', 'VnameOtdel', 'PnameOtdel', 'TnameOtdel', 'ActionsColumn'];;
  public dataSource: MatTableDataSource<SettingDepartmentCaseGetServer> = new MatTableDataSource<SettingDepartmentCaseGetServer>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: SettingDepartmentCaseGetServer = new SettingDepartmentCaseGetServer();
  model: SettingDepartmentCaseGetServer = new SettingDepartmentCaseGetServer();
  index: number;
  modeltable: SettingDepartmentCaseGetServer[];

  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<SettingDepartmentCaseGetServer>('SubscribeDepartmentCase');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((model: SettingDepartmentCaseGetServer) => {
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = model;
      }
      var index = this.dataSource.data.find(x => x.IdOtdel === model.IdOtdel);
      var indexzero = this.dataSource.data.find(x => x.IdOtdel === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdOtdel === 0).IdOtdel = model.IdOtdel;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = model;
            this.modeltable[this.modeltable.indexOf(index)] = model;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(model);
            this.modeltable.push(model);
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
    throw new Error('Method not implemented.');
  }

  edit(model: SettingDepartmentCaseGetServer): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdOtdel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var modelServer = new SettingDepartmentCaseToServer(this.model)
    this.editandadd.addandeditsettingdepartmentcase(modelServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<SettingDepartmentCaseGetServer>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: SettingDepartmentCaseGetServer): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdOtdel === this.model.IdOtdel);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): SettingDepartmentCaseGetServer {
    throw new Error('Method not implemented.');
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.SettingDepartmentCaseGetServer));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.dataSource.data = model.SettingDepartmentCaseGetServer;
    return "Таблица с падежами отделов загружена";
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

export class SettingDepartmentRegulations implements INewLogicaTable<RegulationsDepartment>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: RegulationsDepartment, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error('Method not implemented.');
  }

  public displayedColumns = ['IdOtdel', 'NameOtdel', 'Regulations', 'ActionsColumn'];
  public dataSource: MatTableDataSource<RegulationsDepartment> = new MatTableDataSource<RegulationsDepartment>();
  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: RegulationsDepartment = new RegulationsDepartment();
  model: RegulationsDepartment = new RegulationsDepartment();
  index: number;
  modeltable: RegulationsDepartment[];

  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<RegulationsDepartment>('SubscribeDepartmentRegulations');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((model: RegulationsDepartment) => {
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = model;
      }
      var index = this.dataSource.data.find(x => x.IdOtdel === model.IdOtdel);
      var indexzero = this.dataSource.data.find(x => x.IdOtdel === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdOtdel === 0).IdOtdel = model.IdOtdel;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = model;
            this.modeltable[this.modeltable.indexOf(index)] = model;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(model);
            this.modeltable.push(model);
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
    throw new Error('Method not implemented.');
  }

  edit(model: RegulationsDepartment): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdOtdel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var modelServer = new RegulationsDepartmentToServer(this.model)
    this.editandadd.addandeditRegulationsDepartment(modelServer, this.SignalR.iduser).toPromise().then((model: ModelReturn<RegulationsDepartment>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: RegulationsDepartment): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdOtdel === this.model.IdOtdel);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): RegulationsDepartment {
    throw new Error('Method not implemented.');
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.RegulationsDepartment));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.dataSource.data = model.RegulationsDepartment;
    return "Таблица с регламентами отделов загружена";
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

export class HolidayTableModel implements INewLogicaTable<Rb_Holiday>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: SettingDepartmentCaseGetServer, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error('Method not implemented.');
  }


  public displayedColumns = ['Id', 'DateTime_Holiday', 'IS_HOLIDAY', 'ActionsColumn'];
  public dataSource: MatTableDataSource<Rb_Holiday> = new MatTableDataSource<Rb_Holiday>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: Rb_Holiday = new Rb_Holiday();
  model: Rb_Holiday = new Rb_Holiday();
  index: number;
  modeltable: Rb_Holiday[];

  public modelIsHoliday: any[] = [{ HolidayText: "Праздничный день", HolidayBoolean: true, },
  { HolidayText: "Рабочий праздничный день", HolidayBoolean: false, }];

  public filteredHoliday: any;
  models: any = this.modelIsHoliday[1];

  date = new FormControl(new Date());


  public subscribeAddAndUpdate: any = null;
  public subscribeDelete: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<Rb_Holiday>('SubscribeRbHoliday');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeDelete = new BroadcastEventListener<ModeleReturn<Rb_Holiday>>('SubscribeDeleteHoliday');
    this.SignalR.conect.listen(this.subscribeDelete);

    this.subscribeDelete.subscribe((model: ModeleReturn<Rb_Holiday>) => {
      if (model.Index === 0) {
        console.log(model);
        let index: number = this.dataSource.data.findIndex(item => item.Id === model.Model.Id);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })

    this.subscribeAddAndUpdate.subscribe((model: string) => {
      this.index = 0;
      var submodel = deserialize<Rb_Holiday>(Rb_Holiday, model);
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
          this.dataSource.data.find(x => x.Id === 0).DateTime_Holiday = submodel.DateTime_Holiday;
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

  calbackfiltersAll(): void {
    this.filteredHoliday = this.modelIsHoliday.slice();
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
    this.addtemplate(newmodel.Id)

  }

  edit(model: Rb_Holiday): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    model.DateTime_Holiday.match(/T/g) !== null ? this.date = new FormControl(new Date(model.DateTime_Holiday.split("T")[0])) : this.date = new FormControl(new Date(model.DateTime_Holiday.split("-").reverse().join("-")));
    this.models = this.modelIsHoliday.find(x => x.HolidayBoolean === this.model.IS_HOLIDAY);
    this.addtemplate(model.Id);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addandeditHolyday(this.model, this.SignalR.iduser).toPromise().then((model: ModelReturn<Rb_Holiday>) => {
      if (model.Model === null) {
        alert(model.Message);
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(model: Rb_Holiday): void {
    var converter = new ConvertDate();
    this.editandadd.deleteErrorHoliday(converter.convertDateToServer<Rb_Holiday>(JSON.parse(JSON.stringify(model))), this.SignalR.iduser).toPromise().then((model: ModeleReturn<Rb_Holiday>) => {
      alert(model.Message);
    });
  }

  ///Отмена
  cancel(model: Rb_Holiday): void {
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

  newmodel(): Rb_Holiday {
    var newmodel: Rb_Holiday = new Rb_Holiday()
    newmodel.IS_HOLIDAY = true;
    newmodel.DateTime_Holiday = new Date();
    newmodel.ModelIsEdit = true;
    newmodel.Id = 0;
    return newmodel;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.model.IS_HOLIDAY = this.models.HolidayBoolean;
    this.model.DateTime_Holiday = `/Date(${moment(this.date.value, 'DD-MM-YYYY').local().valueOf()})/`
    this.model.ModelIsEdit = false;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.Rb_Holiday));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.dataSource.data = model.Rb_Holiday;
    this.filteredHoliday = this.modelIsHoliday.slice();
    return "Таблица с праздничными днями загружена!";
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

export class ResourceItTableModel implements INewLogicaTable<ResourceIt> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: ResourceIt, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdResource', 'NameResource', 'Otdel.NameOtdel', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ResourceIt> = new MatTableDataSource<ResourceIt>();

  isAdd: boolean;
  isEdit: boolean;
  public otdels: Otdel[];
  modelCancelError: ResourceIt = new ResourceIt();
  model: ResourceIt = new ResourceIt();

  index: number;
  modeltable: ResourceIt[];

  //Класс замены обратно
  public filteredOtdel: any;
  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ResourceIt>('SubscribeResourceIt');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ResourceIt>(ResourceIt, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdResource === submodel.IdResource);
      var indexzero = this.dataSource.data.find(x => x.IdResource === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdResource === 0).IdResource = submodel.IdResource;
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
    this.filteredOtdel = this.otdels.slice();
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
    this.addtemplate(newmodel.IdResource);
  }

  public edit(model: ResourceIt): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdResource);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.editandadd.addAndEditResourceIt(converter.convertDateToServer<ResourceIt>(this.model)).toPromise().then((model: ModelReturn<ResourceIt>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  public cancel(model: ResourceIt): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdResource === this.model.IdResource);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ResourceIt {
    var newuser: ResourceIt = new ResourceIt()
    newuser.ModelIsEdit = true;
    newuser.IdResource = 0;
    return newuser;
  }

  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.model.Otdel ? this.model.IdOtdel = this.model.Otdel.IdOtdel : this.model.IdOtdel = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ResourceIt));
    this.dataSource.data = model.ResourceIt;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.otdels = model.Otdels;
    this.filteredOtdel = this.otdels.slice();
    return "Модель ресурсов для заявки заполнена";
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

export class TaskAis3TableModel implements INewLogicaTable<TaskAis3> {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: TaskAis3, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdTask', 'NameTask', 'ActionsColumn'];
  public dataSource: MatTableDataSource<TaskAis3> = new MatTableDataSource<TaskAis3>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: TaskAis3 = new TaskAis3();
  model: TaskAis3 = new TaskAis3();

  index: number;
  modeltable: TaskAis3[];

  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<TaskAis3>('SubscribeTaskAis3');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<TaskAis3>(TaskAis3, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdTask === submodel.IdTask);
      var indexzero = this.dataSource.data.find(x => x.IdTask === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdTask === 0).IdTask = submodel.IdTask;
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
    this.addtemplate(newmodel.IdTask);
  }

  public edit(model: TaskAis3): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdTask);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditTaskAis3(this.model).toPromise().then((model: ModelReturn<ResourceIt>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  public cancel(model: TaskAis3): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdTask === this.model.IdTask);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): TaskAis3 {
    var newuser: TaskAis3 = new TaskAis3()
    newuser.ModelIsEdit = true;
    newuser.IdTask = 0;
    return newuser;
  }

  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.TaskAis3));
    this.dataSource.data = model.TaskAis3;
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

export class JournalAis3TableModel implements INewLogicaTable<JournalAis3>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: JournalAis3, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdJournal', 'TaskAis3.NameTask', 'ResourceIt.NameResource', 'User.Otdel.NameOtdel', 'User.NameUser', 'NameTarget', 'TaskUser', 'DateTask', 'ActionsColumn'];
  public dataSource: MatTableDataSource<JournalAis3> = new MatTableDataSource<JournalAis3>();

  public modelvalid: ModelValidation = new ModelValidation()

  public modelCancelError: JournalAis3 = new JournalAis3();
  public model: JournalAis3 = new JournalAis3();

  public modeltable: JournalAis3[];
  public users: Users[];
  public taskAis3: TaskAis3[];
  public resourceIt: ResourceIt[];

  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public index: number = 0;

  //Фильтры
  public filteredUsers: any;
  public filteredTaskAis3: any;
  public filteredResourceIt: any;

  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<JournalAis3>('SubscribeJournalAis3');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<JournalAis3>(JournalAis3, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdJournal === submodel.IdJournal);
      var indexzero = this.dataSource.data.find(x => x.IdJournal === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdJournal === 0).DateTask = submodel.DateTask;
          this.dataSource.data.find(x => x.IdJournal === 0).IdJournal = submodel.IdJournal;
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
      try {
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
      }
      catch {
      }
      return tot;
    }
  }

  //Метод для выноса всех костылей на модель
  public modifimethod(): void {
    this.model.TaskAis3 ? this.model.IdTask = this.model.TaskAis3.IdTask : this.model.IdTask = null;
    this.model.ResourceIt ? this.model.IdResource = this.model.ResourceIt.IdResource : this.model.IdResource = null;
    this.model.User ? this.model.IdUser = this.model.User.IdUser : this.model.IdUser = null;
    this.model.DateTask = `/Date(${moment(this.modelvalid.getRowValidatorModel[12].get('DateTask').value, 'DD-MM-YYYY').local().valueOf()})/`
    this.isEdit = true;
    this.model.ModelIsEdit = false;
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll(): void {
    this.filteredUsers = this.users.slice();
    this.filteredTaskAis3 = this.taskAis3.slice();
    this.filteredResourceIt = this.resourceIt.slice();
  }

  newmodel(): JournalAis3 {
    var newuser: JournalAis3 = new JournalAis3()
    newuser.ModelIsEdit = true;
    newuser.DateTask = new Date();
    newuser.IdJournal = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  public edit(model: JournalAis3): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
    this.addtemplate(model.IdJournal)
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<JournalAis3>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditJournalAis3(this.model).toPromise().then((model: ModelReturn<JournalAis3>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  public cancel(model: JournalAis3): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdJournal === this.model.IdJournal);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
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
    this.addtemplate(newmodel.IdJournal);
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string> {
    this.modeltable = JSON.parse(JSON.stringify(model.JournalAis3));
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.JournalAis3;
    this.resourceIt = model.ResourceIt;
    this.users = model.Users;
    this.taskAis3 = model.TaskAis3;
    this.filteredUsers = this.users.slice();
    this.filteredTaskAis3 = this.taskAis3.slice();
    this.filteredResourceIt = this.resourceIt.slice();
    return "Модель заявок заполнена";
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


export class TypeOtherTableModel implements INewLogicaTable<TypeOther>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: TypeOther, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdTypeOther', 'Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<TypeOther> = new MatTableDataSource<TypeOther>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: TypeOther = new TypeOther();
  model: TypeOther = new TypeOther();
  index: number;
  modeltable: TypeOther[];

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<TypeOther>('SubscribeTypeOther');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<TypeOther>(TypeOther, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdTypeOther === submodel.IdTypeOther);
      var indexzero = this.dataSource.data.find(x => x.IdTypeOther === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdTypeOther === 0).IdTypeOther = submodel.IdTypeOther;
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
    this.addtemplate(newmodel.IdTypeOther);
  }

  edit(model: TypeOther): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdTypeOther)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<TypeOther>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditTypeOther(this.model).toPromise().then((model: ModelReturn<TypeOther>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: TypeOther): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdTypeOther === this.model.IdTypeOther);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): TypeOther {
    var newuser: TypeOther = new TypeOther();
    newuser.ModelIsEdit = true;
    newuser.IdTypeOther = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.TypeOther));
    this.dataSource.data = model.TypeOther;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Типы разного оборудования заполнены";
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

export class ProizvoditelOtherTableModel implements INewLogicaTable<ProizvoditelOther>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: ProizvoditelOther, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdProizvoditelOther', 'Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ProizvoditelOther> = new MatTableDataSource<ProizvoditelOther>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: ProizvoditelOther = new ProizvoditelOther();
  model: ProizvoditelOther = new ProizvoditelOther();
  index: number;
  modeltable: ProizvoditelOther[];

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ProizvoditelOther>('SubscribeProizvoditelOther');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ProizvoditelOther>(ProizvoditelOther, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdProizvoditelOther === submodel.IdProizvoditelOther);
      var indexzero = this.dataSource.data.find(x => x.IdProizvoditelOther === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdProizvoditelOther === 0).IdProizvoditelOther = submodel.IdProizvoditelOther;
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
    this.addtemplate(newmodel.IdProizvoditelOther);
  }

  edit(model: ProizvoditelOther): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditelOther)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ProizvoditelOther>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditProizvoditelOther(this.model).toPromise().then((model: ModelReturn<ProizvoditelOther>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: ProizvoditelOther): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdProizvoditelOther === this.model.IdProizvoditelOther);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ProizvoditelOther {
    var newuser: ProizvoditelOther = new ProizvoditelOther();
    newuser.ModelIsEdit = true;
    newuser.IdProizvoditelOther = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ProizvoditelOther));
    this.dataSource.data = model.ProizvoditelOther;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Производители разного оборудования заполнены";
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

export class ModelOtherTableModel implements INewLogicaTable<ModelOther>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }
  createSTO(model: ModelOther, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdModelOther', 'Name', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ModelOther> = new MatTableDataSource<ModelOther>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: ModelOther = new ModelOther();
  model: ModelOther = new ModelOther();
  index: number;
  modeltable: ModelOther[];

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ModelOther>('SubscribeModelOther');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ModelOther>(ModelOther, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdModelOther === submodel.IdModelOther);
      var indexzero = this.dataSource.data.find(x => x.IdModelOther === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdModelOther === 0).IdModelOther = submodel.IdModelOther;
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
    this.addtemplate(newmodel.IdModelOther);
  }

  edit(model: ModelOther): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelOther)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.model = converter.convertDateToServer<ModelOther>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditModelOther(this.model).toPromise().then((model: ModelReturn<ModelOther>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: ModelOther): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdModelOther === this.model.IdModelOther);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ModelOther {
    var newuser: ModelOther = new ModelOther();
    newuser.ModelIsEdit = true;
    newuser.IdModelOther = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ModelOther));
    this.dataSource.data = model.ModelOther;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Модели разного оборудования заполнены";
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
export class EventProcessTableModel implements INewLogicaTable<EventProcess>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: EventProcess, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public selectDayOfTheWeek: SelectDayOfTheWeek[];
  public modelvalid: ModelValidation = new ModelValidation()
  public displayedColumns = ['Logic', 'IdProcess', 'InfoEvent', 'SelectDayOfTheWeek.RuTextDayOfTheWeek', 'HoursX', 'MinutesX', 'IsTimeEventProcess', 'IsExistsParameters', 'IsComplete', 'DataStart', 'DataFinish', 'ActionsColumn'];
  public dataSource: MatTableDataSource<EventProcess> = new MatTableDataSource<EventProcess>();


  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: EventProcess = new EventProcess();
  model: EventProcess = new EventProcess();

  index: number;
  modeltable: EventProcess[];
  modelToServer: EventProcess;

  public filteredSelectDayOfTheWeek: any;

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<EventProcess>('SubscribeEventProcess');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<EventProcess>(EventProcess, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdProcess === submodel.IdProcess);
      var indexzero = this.dataSource.data.find(x => x.IdProcess === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdProcess === 0).IdProcess = submodel.IdProcess;
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
    this.filteredSelectDayOfTheWeek = this.selectDayOfTheWeek.slice();
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
    this.addtemplate(newmodel.IdProcess);
  }

  edit(model: EventProcess): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProcess)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<EventProcess>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.addAndEditEventProcess(this.modelToServer).toPromise().then((model: ModelReturn<EventProcess>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: EventProcess): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdProcess === this.model.IdProcess);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): EventProcess {
    var newuser: EventProcess = new EventProcess();
    newuser.ModelIsEdit = true;
    newuser.IdProcess = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
    this.model.SelectDayOfTheWeek ? this.model.IdDayOfTheWeek = this.model.SelectDayOfTheWeek.IdDayOfTheWeek : this.model.IdDayOfTheWeek = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    console.log(model.SelectDayOfTheWeek);
    console.log(model.EventProcess);
    this.fulltemplate = template; //Заложенный шаблон 
    this.modeltable = JSON.parse(JSON.stringify(model.EventProcess));
    this.dataSource.data = model.EventProcess;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.selectDayOfTheWeek = model.SelectDayOfTheWeek;
    this.filteredSelectDayOfTheWeek = this.selectDayOfTheWeek.slice();
    return "Процессы заполнены";
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

export class ParameterEventProcessTableModel implements INewLogicaTable<ParameterEventProcess>{

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: ParameterEventProcess, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error("Method not implemented.");
  }

  public displayedColumns = ['IdParameters', 'NameParameters', 'InfoParameters', 'Parameters', 'ActionsColumn'];
  public dataSource: MatTableDataSource<ParameterEventProcess> = new MatTableDataSource<ParameterEventProcess>();

  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: ParameterEventProcess = new ParameterEventProcess();
  model: ParameterEventProcess = new ParameterEventProcess();

  index: number;
  modeltable: ParameterEventProcess[];
  modelToServer: ParameterEventProcess;
  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<ParameterEventProcess>('SubscribeParameterEventProcess');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<ParameterEventProcess>(ParameterEventProcess, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }

      var index = this.dataSource.data.find(x => x.IdParameters === submodel.IdParameters);
      var indexzero = this.dataSource.data.find(x => x.IdParameters === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdParameters === 0).IdParameters = submodel.IdParameters;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
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
    alert("В данной модели функция не будет реализована!!!");
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add(): Promise<void> {
    alert("В данной модели функция не будет реализована!!!");
    throw new Error("Method not implemented.");
  }

  edit(model: ParameterEventProcess): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdParameters)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    var converter = new ConvertDate();
    this.modelToServer = converter.convertDateToServer<ParameterEventProcess>(JSON.parse(JSON.stringify(this.model)));
    this.editandadd.editParameterEventProcess(this.modelToServer).toPromise().then((model: ModelReturn<ParameterEventProcess>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    alert("В данной модели функция не будет реализована!!!");
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: ParameterEventProcess): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdParameters === this.model.IdParameters);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ParameterEventProcess {
    var newuser: ParameterEventProcess = new ParameterEventProcess();
    newuser.ModelIsEdit = true;
    newuser.IdParameters = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    console.log(this.dataSource)
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.ParameterEventProcess));
    this.dataSource.data = model.ParameterEventProcess;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Параметры для процессов заполнены";
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




export class SettingCategoryPhoneHeader implements INewLogicaTable<CategoryPhoneHeader>  {

  constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  createSTO(model: CategoryPhoneHeader, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void {
    throw new Error('Method not implemented.');
  }

  public displayedColumns = ['IdCategoryHeaders', 'NameHeaders', 'ActionsColumn'];
  public dataSource: MatTableDataSource<CategoryPhoneHeader> = new MatTableDataSource<CategoryPhoneHeader>();
  isAdd: boolean;
  isEdit: boolean;
  modelCancelError: CategoryPhoneHeader = new CategoryPhoneHeader();
  model: CategoryPhoneHeader = new CategoryPhoneHeader();
  index: number;
  modeltable: CategoryPhoneHeader[];

  //Подписка
  public subscribeAddAndUpdate: any = null;

  //Шаблоны для манипулирования DOM
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<CategoryPhoneHeader>('SubscribeCategoryPhoneHeader');
    this.SignalR.conect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<CategoryPhoneHeader>(CategoryPhoneHeader, substring);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.IdCategoryHeaders === submodel.IdCategoryHeaders);
      var indexzero = this.dataSource.data.find(x => x.IdCategoryHeaders === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.IdCategoryHeaders === 0).IdCategoryHeaders = submodel.IdCategoryHeaders;
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
    this.addtemplate(newmodel.IdCategoryHeaders);
  }


  edit(model: CategoryPhoneHeader): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdCategoryHeaders)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.editandadd.addAndEditCategoryPhoneHeader(this.model).toPromise().then((model: ModelReturn<CategoryPhoneHeader>) => {
      if (model.Model === null) {
        alert(model.Message)
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  ///Удаление
  delete(): void {
    throw new Error("Method not implemented.");
  }

  ///Отмена
  cancel(model: CategoryPhoneHeader): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.IdCategoryHeaders === this.model.IdCategoryHeaders);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): CategoryPhoneHeader {
    var newuser: CategoryPhoneHeader = new CategoryPhoneHeader();
    newuser.ModelIsEdit = true;
    newuser.IdCategoryHeaders = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
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
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.CategoryPhoneHeader));
    this.dataSource.data = model.CategoryPhoneHeader;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    return "Справочник категорий телефонов заполнен";
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