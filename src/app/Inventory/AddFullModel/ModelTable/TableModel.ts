import { Users, FullSelectedModel, Otdel, Position, Printer, Mfu, ScanerAndCamer, SysBlock, CopySave,
   Monitor,NameSysBlock,Supply,Classification,Swithe,
  Kabinet,FullModel,Statusing,FullProizvoditel, ModelReturn, NameMonitor, Telephon,BlockPower,ModelBlockPower,ProizvoditelBlockPower, INewLogicaTable,ModelSwithe  } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator,MatSort } from '@angular/material';
import { ModelValidation } from '../ValidationModel/UserValidation';
import { EditAndAdd } from '../../../Post RequestService/PostRequest';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ElementRef } from '@angular/core';
const moment = _rollupMoment || _moment;

export class OtdelTableModel implements INewLogicaTable<Otdel>{
 
  constructor(public editandadd:EditAndAdd){}

  public displayedColumns = ['IdOtdel','NameOtdel','NameRuk','ActionsColumn'];
  public dataSource: MatTableDataSource<Otdel> = new MatTableDataSource<Otdel>();

  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public model: Otdel = new Otdel();
  public index: number;
  public modeltable: Otdel[];
  public user:Users[];

  public filteredUser:any;

  //Шаблоны для манипулирования DOM
    temlateList:any //Заложенный шаблон Массив
    rowList:any    //Строка по номеру из БД Массив 
    fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
    table:ElementRef<any>  //Полный шаблон для манипуляции
 
 public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll():void{
    this.filteredUser = this.user.slice();
  }

  public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdOtdel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addandeditotdel(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdOtdel===0).IdOtdel = model.Index;
      }
       console.log(model.Message);
       this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: Otdel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var otdeldefault = this.modeltable.find(x=>x.IdOtdel ===this.model.IdOtdel);
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
  async delay(ms: number):Promise<void> {
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
}

///Добавить шаблон в строку это просто жесть
 async addtemplate(index:number):Promise<void>{
  var i = 0;
  await this.delay(10);
  this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
  this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
  for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
   }
}

///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
  var i = 0;
  for (var row of this.rowList){
     row.removeChild(this.temlateList[i]);
     this.fulltemplate.nativeElement.append(this.temlateList[i])
    i++;
  }
}



 modifimethod(): void {
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var otdeldefault = this.modeltable.find(x=>x.IdOtdel ===this.model.IdOtdel);
    var indexold = this.modeltable.indexOf(otdeldefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.modeltable =JSON.parse(JSON.stringify(model.Otdels));
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
  constructor(public editandadd:EditAndAdd){}

  public displayedColumns = ['IdUser','Name','TabelNumber','Telephon.Telephon_','Telephon.TelephonUndeground','Position.NamePosition','Otdel.NameOtdel','StatusActual','ActionsColumn'];
  public dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  public modelvalid:ModelValidation = new ModelValidation()
  public otdels: Otdel[];
  public model: Users = new Users();


  public position: Position[];
  public modeltable: Users[];
  public telephone:Telephon[];
  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public index: number = 0;

  ///Класс замены обратно
  public anyclassdiv:any;
  public filteredOtdel:any;
  public filteredPosition:any;
  public filteredTelephone:any;

//Шаблоны для манипулирования DOM
 temlateList:any //Заложенный шаблон Массив
 rowList:any    //Строка по номеру из БД Массив 
 fulltemplate:ElementRef  //Полный шаблон для манипуляции
 table:ElementRef  //Полный шаблон для манипуляции

 castomefiltermodel() {
  this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
          if(typeof data[column]!=='undefined'){
            if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
              tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
            } else {
 
               var date = new Date(data[column].toString());
               var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
               tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
              }
          }
          else{
            if(data[column.split('.')[0]]!==null){
              if( typeof(data[column.split('.')[0]]) ==='object'){
                if(data[column.split('.')[0]][column.split('.')[1]]){
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
  public modifimethod():void{
    this.model.Otdel?this.model.IdOtdel = this.model.Otdel.IdOtdel:this.model.IdOtdel=null;
    this.model.Position?this.model.IdPosition = this.model.Position.IdPosition:this.model.IdPosition=null;
    this.model.Telephon?this.model.IdTelephon = this.model.Telephon.IdTelephon:this.model.IdTelephon=null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdUser ===this.model.IdUser);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll():void{
    this.filteredOtdel = this.otdels.slice();
    this.filteredPosition = this.position.slice();
    this.filteredTelephone = this.telephone.slice();
  }
  
  newmodel(): Users {
    var newuser: Users = new Users()
    newuser.ModelIsEdit = true;
    newuser.IdUser = 0;
    newuser.StatusActual = true;
    return newuser;
  }
//Костыль дожидаемся обновление DOM
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
        row.append(this.temlateList[i])
        i++;
     }
   }

///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
       this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  ///Редактирование 
  public edit(user: Users): void {
        user.ModelIsEdit = true;
        this.model =JSON.parse(JSON.stringify(user));
        this.isEditAndAddTrue();
        this.addtemplate(user.IdUser)
    }

  public save(): void {
      this.modifimethod();
      this.isEditAndAddFalse();
      this.editandadd.addandedituser(this.model).subscribe((model:ModelReturn)=>{
        if(model.Guid)
        {
           this.dataSource.data.find(x=>x.IdUser===0).IdHistory = model.Guid;
           this.dataSource.data.find(x=>x.IdUser===0).IdUser = model.Index;
        }
        console.log(model.Message);
         this.dataSource._updateChangeSubscription();
       });
       this.removetemplate();
      //Запрос на сохранение и обновление данных
    }

  public cancel(user: Users): void {
      user.ModelIsEdit = false;
      this.isEditAndAddFalse(); 
      if(this.index>0)
      {
        this.dataSource.data.pop();
        this.index = 0;
        
      }
      else{
        var userdefault = this.modeltable.find(x=>x.IdUser ===this.model.IdUser);
        this.dataSource.data[this.modeltable.indexOf(userdefault)] = user;
        this.index = 0;
      }
      this.dataSource._updateChangeSubscription();
      this.removetemplate();
    }

  public async add():Promise<void> {
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

    public async addtableModel(model:FullSelectedModel,paginator:MatPaginator,sort:MatSort,table:ElementRef,template:ElementRef):Promise<string> {
        this.modeltable =JSON.parse(JSON.stringify(model.Users));
        this.table = table;  //Таблица
        this.fulltemplate = template; //Заложенный шаблон
        this.dataSource.paginator = paginator;
        this.dataSource.sort = sort
        this.castomefiltermodel();
        this.dataSource.data = model.Users
        this.otdels = model.Otdels;
        this.telephone = model.Telephon;
        this.position = model.Position;
        this.filteredOtdel = this.otdels.slice();
        this.filteredPosition = this.position.slice();
        this.filteredTelephone = this.telephone.slice();
        return "Модель пользователей заполнена";
    }

  isEditAndAddTrue():void{
    this.isEdit = true;
    this.isAdd = true;
   }

  isEditAndAddFalse():void{
    this.isAdd = false;
    this.isEdit = false;
   }
}

export class SwitchTableModel implements INewLogicaTable<Swithe>{
  constructor(public editandadd:EditAndAdd){ }

  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:ModelSwithe[];
  public statusing:Statusing[];
  public supples:Supply[]
  public user:Users[];

  displayedColumns = ['IdSwithes','User.Name','Supply.DatePostavki','ModelSwithes.NameModel','ModelSwithes.CountPort','ServiceNum','SerNum','InventarNum','Coment','Kabinet.NumberKabinet','Statusing.Name','ActionsColumn'];
  dataSource: MatTableDataSource<Swithe> = new MatTableDataSource<Swithe>();
  isAdd: boolean;  
  isEdit: boolean;
  model: Swithe = new Swithe();
  modelToServer: Swithe;
  index: number;
  modeltable: Swithe[];

  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredUser:any;
  public filteredSupples:any;

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdSwithes)
    this.isEditAndAddTrue();
  }

  save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditswitch(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdSwithes===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdSwithes===0).IdSwithes = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  cancel(model: Swithe): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdSwithes ===this.model.IdSwithes);
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
     async delay(ms: number):Promise<void> {
       await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
     }

     async addtemplate(index: number): Promise<void> {
       var i = 0;
       await this.delay(10);
       this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
       this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
       for (var row of this.rowList){
           row.append(this.temlateList[i])
           i++;
        }
     }

      removetemplate(): void {
        var i = 0;
        for (var row of this.rowList){
           row.removeChild(this.temlateList[i]);
           this.fulltemplate.nativeElement.append(this.temlateList[i])
           i++;
        }
      }

  modifimethod(): void {
    this.model.ModelSwithe?this.model.IdModelSwithes = this.model.ModelSwithe.IdModelSwithes:this.model.IdModelSwithes=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    if(this.model.Supply){
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdSwithes ===this.model.IdSwithes);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Swithes));
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

  isEditAndAddTrue():void{
    this.isEdit = true;
    this.isAdd = true;
   }
  isEditAndAddFalse():void{
    this.isAdd = false;
    this.isEdit = false;
   }
}

export class PrinterTableModel implements INewLogicaTable<Printer> {
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','User.Name','Supply.DatePostavki','FullProizvoditel.NameProizvoditel','FullModel.NameModel','ZavNumber','ServiceNumber','InventarNumber','IpAdress','Coment','Kabinet.NumberKabinet','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<Printer> = new MatTableDataSource<Printer>();
  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:FullModel[];
  public statusing:Statusing[];
  public supples:Supply[]
  public proizvoditel:FullProizvoditel[];
  public user:Users[];

  isAdd: boolean;
  isEdit: boolean;
  model: Printer = new Printer();
  modelToServer: Printer;
  index: number;
  modeltable: Printer[];

  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredProizvoditel:any;
  public filteredUser:any;
  public filteredSupples:any;
  
  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
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

  public calbackfiltersAll():void{
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

  public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdPrinter)
    this.isEditAndAddTrue();
  }

 public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditprinter(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdPrinter===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdPrinter===0).IdPrinter = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: Printer): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdPrinter ===this.model.IdPrinter);
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
    async delay(ms: number):Promise<void> {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
    }
    
    ///Добавить шаблон в строку это просто жесть
     async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
          row.append(this.temlateList[i])
          i++;
       }
    }
    
    ///Удалить шаблон из строки и востановить текущий шаблон
      removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
         row.removeChild(this.temlateList[i]);
         this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
    }

  modifimethod(): void {
    this.model.FullProizvoditel?this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel:this.model.IdProizvoditel=null;
    this.model.FullModel?this.model.IdModel = this.model.FullModel.IdModel:this.model.IdModel=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    if(this.model.Supply){
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdPrinter ===this.model.IdPrinter);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Printer));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.castomefiltermodel();
    this.dataSource.data = model.Printer;
    this.kabinet = model.Kabinet;
    this.models = model.Model.filter(x=>x.IdClasification===1);
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

  isEditAndAddTrue():void{
    this.isEdit = true;
    this.isAdd = true;
   }
  isEditAndAddFalse():void{
    this.isAdd = false;
    this.isEdit = false;
   }
}

export class ScanerAndCamerTableModel implements INewLogicaTable<ScanerAndCamer> {
  
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','User.Name','Supply.DatePostavki','FullProizvoditel.NameProizvoditel','FullModel.NameModel',
  'ZavNumber','ServiceNumber','InventarNumber','IpAdress','Coment','Kabinet.NumberKabinet','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<ScanerAndCamer> = new MatTableDataSource<ScanerAndCamer>();
  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:FullModel[];
  public statusing:Statusing[];
  public proizvoditel:FullProizvoditel[];
  public user:Users[];
  public supples:Supply[]

  isAdd: boolean;
  isEdit: boolean;
  model: ScanerAndCamer = new ScanerAndCamer();
  modelToServer: ScanerAndCamer;
  index: number;
  modeltable: ScanerAndCamer[];

  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredProizvoditel:any;
  public filteredUser:any;
  public filteredSupples:any;

    //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции


  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
                    tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                  }
                }
              }
              }
            }
      return tot;
    }
  }

  public filterstable(filterValue: string):void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll():void{
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

 public async add():Promise<void> {
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
 public edit(model: ScanerAndCamer):void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdScaner)
    this.isEditAndAddTrue();
  }
 public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditscaner(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdScaner===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdScaner===0).IdScaner = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

 public cancel(model: ScanerAndCamer):void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdScaner ===this.model.IdScaner);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel():ScanerAndCamer {
    var newuser: ScanerAndCamer = new ScanerAndCamer()
    newuser.ModelIsEdit = true;
    newuser.IdScaner = 0;
    return newuser;
  }
  //Костыль дожидаемся обновление DOM
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }
      
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
       row.append(this.temlateList[i])
       i++;
    }
  }
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
     row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.FullProizvoditel?this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel:this.model.IdProizvoditel=null;
    this.model.FullModel?this.model.IdModel = this.model.FullModel.IdModel:this.model.IdModel=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    if(this.model.Supply){ 
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdScaner ===this.model.IdScaner);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Scaner));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.Scaner;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.models = model.Model.filter(x=>[2,4].includes(x.IdClasification));;
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
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','User.Name','Supply.DatePostavki','FullProizvoditel.NameProizvoditel','FullModel.NameModel','ZavNumber','ServiceNumber','InventarNumber','IpAdress','CopySave.SerNum','Coment','Kabinet.NumberKabinet','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<Mfu> = new MatTableDataSource<Mfu>();
  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:FullModel[];
  public statusing:Statusing[];
  public proizvoditel:FullProizvoditel[];
  public copySave:CopySave[];
  public user:Users[];
  public supples:Supply[]

  isAdd: boolean;
  isEdit: boolean;
  model: Mfu = new Mfu();
  modelToServer:Mfu;
  index: number;
  modeltable: Mfu[];
 
  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredProizvoditel:any;
  public filteredCopySave:any;
  public filteredUser:any;
  public filteredSupples:any;

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции


  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
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

  public calbackfiltersAll():void{
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredCopySave = this.copySave.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

 public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdMfu)
    this.isEditAndAddTrue();
  }

 public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditmfu(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdMfu===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdMfu===0).IdMfu = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  cancel(model: Mfu): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdMfu ===this.model.IdMfu);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }
      
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.model.FullProizvoditel?this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel:this.model.IdProizvoditel=null;
    this.model.FullModel?this.model.IdModel = this.model.FullModel.IdModel:this.model.IdModel=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.CopySave?this.model.IdCopySave = this.model.CopySave.IdCopySave:this.model.IdCopySave=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    if(this.model.Supply){ 
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdMfu ===this.model.IdMfu);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Mfu));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.Mfu;
    this.castomefiltermodel();
    this.kabinet = model.Kabinet;
    this.models = model.Model.filter(x=>x.IdClasification===3);;
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
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','User.Name','Supply.DatePostavki','NameSysBlock.NameComputer','ServiceNum','SerNum','InventarNumSysBlok','NameComputer','IpAdress','Kabinet.NumberKabinet','Coment','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<SysBlock> = new MatTableDataSource<SysBlock>();
  public modelvalid:ModelValidation = new ModelValidation()
  public models:NameSysBlock[];
  public kabinet:Kabinet[];
  public statusing:Statusing[];
  public user:Users[];
  public supples:Supply[]

  isAdd: boolean;
  isEdit: boolean;
  model: SysBlock = new SysBlock();
  modelToServer:SysBlock;
  index: number;
  modeltable: SysBlock[];
 
  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredUser:any;
  public filteredSupples:any;

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции


  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
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


  public calbackfiltersAll():void{
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }

 public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdSysBlock)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditsysblok(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdSysBlock===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdSysBlock===0).IdSysBlock = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }
  
  public cancel(model: SysBlock): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdSysBlock ===this.model.IdSysBlock);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }
      
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }
      
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }


  modifimethod(): void {
    this.model.NameSysBlock?this.model.IdModelSysBlock = this.model.NameSysBlock.IdModelSysBlock:this.model.IdModelSysBlock=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    if(this.model.Supply){ 
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdSysBlock ===this.model.IdSysBlock);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.SysBlok));
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
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','User.Name','Supply.DatePostavki','NameMonitor.Name','SerNum','InventarNumMonitor','Kabinet.NumberKabinet','Coment','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();
  public modelvalid:ModelValidation = new ModelValidation()
  public models:NameMonitor[];
  public kabinet:Kabinet[];
  public statusing:Statusing[];
  public user:Users[];
  public supples:Supply[]
  

  isAdd: boolean;
  isEdit: boolean;
  model: Monitor = new Monitor();
  modelToServer:Monitor;
  index: number;
  modeltable: Monitor[];
  
  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredUser:any;
  public filteredSupples:any;

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции


  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
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

  public calbackfiltersAll():void{
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredUser = this.user.slice();
    this.filteredSupples = this.supples.slice();
  }
  
  public async add():Promise<void>{
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdMonitor)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditmonitor(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdMonitor===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdMonitor===0).IdMonitor = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  cancel(model: Monitor): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdMonitor ===this.model.IdMonitor);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }
        
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }
  
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }



  modifimethod(): void {
    this.model.NameMonitor?this.model.IdModelMonitor = this.model.NameMonitor.IdModelMonitor:this.model.IdModelMonitor=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    if(this.model.Supply){ 
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdMonitor ===this.model.IdMonitor);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
   this.table = table;  //Таблица
   this.fulltemplate = template; //Заложенный шаблон
   this.modeltable =JSON.parse(JSON.stringify(model.Monitors));
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
 
  constructor(public editandadd:EditAndAdd){ }
  public displayedColumns = ['IdTelephone','Supply.DatePostavki','NameTelephone','Telephon_','TelephonUndeground','SerNumber','IpTelephon','MacTelephon','Kabinet.NumberKabinet','Coment','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<Telephon> = new MatTableDataSource<Telephon>();
  public modelvalid:ModelValidation = new ModelValidation()
  public supples:Supply[]
  public kabinet:Kabinet[];
  public statusing:Statusing[];


  isAdd: boolean;
  isEdit: boolean;
  model: Telephon = new Telephon();
  index: number;
  modeltable: Telephon[];
  modelToServer: Telephon;
  public filteredKabinet:any;
  public filteredSupples:any;
  public filteredStatusing:any;

  //Шаблоны для манипулирования DOM
   temlateList:any //Заложенный шаблон Массив
   rowList:any    //Строка по номеру из БД Массив 
   fulltemplate:ElementRef  //Полный шаблон для манипуляции
   table:ElementRef  //Полный шаблон для манипуляции


   castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
                    tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                  }
                }
              }
              }
            }
      return tot;
    }
  }

 public calbackfiltersAll(){
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
   async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

///Добавить шаблон в строку это просто жесть
   async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
       this.fulltemplate.nativeElement.append(this.temlateList[i])
     i++;
   }
  }
 
public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdTelephon)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandedittelephon(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdTelephon===0).IdTelephon = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: Telephon): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdTelephon ===this.model.IdTelephon);
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
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    if(this.model.Supply){
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdTelephon ===this.model.IdTelephon);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Telephon));
    this.dataSource.data = model.Telephon;
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
 
  constructor(public editandadd:EditAndAdd){ }  
  
  public displayedColumns = ['IdBlockPowers','User.Name','Supply.DatePostavki','ProizvoditelBlockPower.Name','ModelBlockPower.Name','ZavNumber','ServiceNumber','InventarNumber','Coment','Kabinet.NumberKabinet','Statusing.Name','ActionsColumn'];
  public dataSource: MatTableDataSource<BlockPower> = new MatTableDataSource<BlockPower>();
  public modelvalid:ModelValidation = new ModelValidation()

  public kabinet:Kabinet[];
  public models:ModelBlockPower[];
  public statusing:Statusing[];
  public proizvoditel:ProizvoditelBlockPower[];
  public user:Users[];
  public supples:Supply[]
 

  isAdd: boolean;
  isEdit: boolean;
  model: BlockPower = new BlockPower();
  modelToServer: BlockPower;
  index: number;
  modeltable: BlockPower[];

  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredUser:any;
  public filteredSupples:any;
  public filteredProizvoditel:any;

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
        var tot = false;
        for (let column of this.displayedColumns) {
            if(typeof data[column]!=='undefined'){
              if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
                tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
              } else {
   
                 var date = new Date(data[column].toString());
                 var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                 tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1); 
                }
            }
            else{
              if(data[column.split('.')[0]]!==null){
                if( typeof(data[column.split('.')[0]]) ==='object'){
                  if(data[column.split('.')[0]][column.split('.')[1]]){
                    tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                  }
                }
              }
              }
            }
      return tot;
    }
  }

  public filterstable(filterValue: string):void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public calbackfiltersAll():void {
    this.filteredUser = this.user.slice();
    this.filteredProizvoditel = this.proizvoditel.slice()
    this.filteredModels = this.models.slice();
    this.filteredKabinet = this.kabinet.slice();
    this.filteredSupples = this.supples.slice();
    this.filteredStatusing = this.statusing.slice();
  }

  public async add():Promise<void>{
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
  
  public edit(model: BlockPower):void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdBlockPowers)
    this.isEditAndAddTrue();
  }

  public save():void {
    this.modifimethod();
    this.isEditAndAddFalse();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    if(this.modelToServer.Supply)
    {
      this.modelToServer.Supply.DatePostavki = null;
    }
     this.editandadd.addandeditblockpower(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdBlockPowers===0).IdHistory = model.Guid;
        this.dataSource.data.find(x=>x.IdBlockPowers===0).IdBlockPowers = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: BlockPower):void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdBlockPowers ===this.model.IdBlockPowers);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }
        
  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }
  
  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }


  modifimethod(): void {
    this.model.Kabinet?this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet:this.model.IdNumberKabinet=null;
    this.model.Statusing?this.model.IdStatus = this.model.Statusing.IdStatus:this.model.IdStatus=null;
    this.model.User?this.model.IdUser = this.model.User.IdUser:this.model.IdUser=null;
    this.model.ProizvoditelBlockPower?this.model.IdProizvoditelBP = this.model.ProizvoditelBlockPower.IdProizvoditelBP:this.model.IdProizvoditelBP=null;
    this.model.ModelBlockPower?this.model.IdModelBP = this.model.ModelBlockPower.IdModelBP:this.model.IdModelBP=null;
    if(this.model.Supply){
      this.model.IdSupply = this.model.Supply.IdSupply
      this.model.Supply.DataCreate = null;
      if(this.model.Supply.DatePostavki.length<=10){
        this.model.Supply.DatePostavki = this.model.Supply.DatePostavki.split("-").reverse().join("-")+"T00:00:00"
      }
    }
    else{
      this.model.IdSupply=null;
    }
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdBlockPowers ===this.model.IdBlockPowers);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

public async  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
  this.table = table;  //Таблица
  this.fulltemplate = template; //Заложенный шаблон
  this.modeltable =JSON.parse(JSON.stringify(model.BlockPower));
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
 
 
  constructor(public editandadd:EditAndAdd){ }
  public displayedColumns = ['IdModelSysBlock','NameComputer','ActionsColumn'];
  public dataSource: MatTableDataSource<NameSysBlock> = new MatTableDataSource<NameSysBlock>();

  isAdd: boolean;
  isEdit: boolean;
  model: NameSysBlock = new NameSysBlock();
  index: number;
  modeltable: NameSysBlock[];

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSysBlock)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameSysBlock(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdModelSysBlock===0).IdModelSysBlock = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: NameSysBlock): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdModelSysBlock ===this.model.IdModelSysBlock);
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
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdModelSysBlock ===this.model.IdModelSysBlock);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.ModelSysBlok));
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
  
  constructor(public editandadd:EditAndAdd){ }
  public displayedColumns = ['IdModelMonitor','Name','ActionsColumn'];
  public dataSource: MatTableDataSource<NameMonitor> = new MatTableDataSource<NameMonitor>();


  isAdd: boolean;
  isEdit: boolean;
  model: NameMonitor = new NameMonitor();
  index: number;
  modeltable: NameMonitor[];
  
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelMonitor)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameMonitor(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdModelMonitor===0).IdModelMonitor = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: NameMonitor): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdModelMonitor ===this.model.IdModelMonitor);
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
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }


  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdModelMonitor ===this.model.IdModelMonitor);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.NameMonitors));
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
  
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModelBP','Name','ActionsColumn'];
  public dataSource: MatTableDataSource<ModelBlockPower> = new MatTableDataSource<ModelBlockPower>();

  isAdd: boolean;
  isEdit: boolean;
  model: ModelBlockPower = new ModelBlockPower();
  index: number;
  modeltable: ModelBlockPower[];
  
  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelBP);
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameModelBlokPower(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdModelBP===0).IdModelBP = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: ModelBlockPower): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdModelBP ===this.model.IdModelBP);
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
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdModelBP ===this.model.IdModelBP);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.ModelBlockPower));
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

  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdProizvoditelBP','Name','ActionsColumn'];
  public dataSource: MatTableDataSource<ProizvoditelBlockPower> = new MatTableDataSource<ProizvoditelBlockPower>();

  isAdd: boolean;
  isEdit: boolean;
  model: ProizvoditelBlockPower = new ProizvoditelBlockPower();
  index: number;
  modeltable: ProizvoditelBlockPower[];

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditelBP)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameProizvoditelBlockPower(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdProizvoditelBP===0).IdProizvoditelBP = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: ProizvoditelBlockPower): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdProizvoditelBP ===this.model.IdProizvoditelBP);
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
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList){
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdProizvoditelBP===this.model.IdProizvoditelBP);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.ProizvoditelBlockPower));
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
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','NameModel','IdClasificationName','ActionsColumn'];
  public dataSource: MatTableDataSource<FullModel> = new MatTableDataSource<FullModel>();

  isAdd: boolean;
  isEdit: boolean;
  model: FullModel = new FullModel();
  index: number;
  modeltable: FullModel[];

  public classification:Classification[]
  public filteredClassification:any;

  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  calbackfiltersAll(){
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModel)
    this.isEditAndAddTrue();
  }
  
  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameFullModel(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdModel===0).IdModel = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: FullModel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdModel ===this.model.IdModel);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
    for (var row of this.rowList){
      row.append(this.temlateList[i])
      i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
        row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }

  modifimethod(): void {
    this.model.Classification?this.model.IdClasification = this.model.Classification.IdClasification:this.model.IdClasification=null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdModel===this.model.IdModel);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Model));
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
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdProizvoditel','NameProizvoditel','ActionsColumn'];
  public dataSource: MatTableDataSource<FullProizvoditel> = new MatTableDataSource<FullProizvoditel>();
 
  isAdd: boolean;
  isEdit: boolean;
  model: FullProizvoditel = new FullProizvoditel();
  index: number;
  modeltable: FullProizvoditel[];
 
  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdProizvoditel)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameFullProizvoditel(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdProizvoditel===0).IdProizvoditel = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: FullProizvoditel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdProizvoditel ===this.model.IdProizvoditel);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

    ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
        row.append(this.temlateList[i])
        i++;
      }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
        row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdProizvoditel===this.model.IdProizvoditel);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Proizvoditel));
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
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdClasification','NameClass','ActionsColumn'];
  public dataSource: MatTableDataSource<Classification> = new MatTableDataSource<Classification>();

  isAdd: boolean;
  isEdit: boolean;
  model: Classification = new Classification();
  index: number;
  modeltable: Classification[];
 
  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

  
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdClasification)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameClassification(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdClasification===0).IdClasification = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: Classification): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdClasification ===this.model.IdClasification);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
        row.append(this.temlateList[i])
        i++;
      }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
        row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }


  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdClasification===this.model.IdClasification);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.Classification));
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
  
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdCopySave','NameCopySave','SerNum','InventarNum','ActionsColumn'];
  public dataSource: MatTableDataSource<CopySave> = new MatTableDataSource<CopySave>();
  public modelvalid:ModelValidation = new ModelValidation()

  isAdd: boolean;
  isEdit: boolean;
  model: CopySave = new CopySave();
  index: number;
  modeltable: CopySave[];
  
  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  public async add():Promise<void> {
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdCopySave)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameCopySave(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdCopySave===0).IdCopySave = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: CopySave): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdCopySave===this.model.IdCopySave);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
         row.append(this.temlateList[i])
         i++;
      }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }


  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdCopySave===this.model.IdCopySave);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.CopySave));
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
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdNumberKabinet','NumberKabinet','ActionsColumn'];
  public dataSource: MatTableDataSource<Kabinet> = new MatTableDataSource<Kabinet>();

  isAdd: boolean;
  isEdit: boolean;
  model: Kabinet = new Kabinet();
  index: number;
  modeltable: Kabinet[];
 
  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdNumberKabinet)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameKabinet(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdNumberKabinet===0).IdNumberKabinet = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  cancel(model: Kabinet): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdNumberKabinet===this.model.IdNumberKabinet);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
         row.append(this.temlateList[i])
         i++;
      }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdNumberKabinet===this.model.IdNumberKabinet);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
  this.table = table;  //Таблица
  this.fulltemplate = template; //Заложенный шаблон
  this.modeltable =JSON.parse(JSON.stringify(model.Kabinet));
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
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdSupply','NameSupply','NameKontract','DatePostavki','ActionsColumn'];
  public dataSource: MatTableDataSource<Supply> = new MatTableDataSource<Supply>();

  getTime:string;
  onChangeEventDate(event: MatDatepickerInputEvent<Date>): void {
    this.model.DatePostavki =moment(event.target.value).format('DD-MM-YYYY');
    this.getTime = `/Date(${moment(event.target.value,'DD-MM-YYYY').add(1,'day').valueOf()})/`;
  }

  isAdd: boolean;
  isEdit: boolean;
  model: Supply = new Supply();
  index: number;
  modeltable: Supply[];
  modelToServer: Supply;

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции
  
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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdSupply)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameSupply(this.modelToServer).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdSupply===0).IdSupply = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: Supply): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdSupply===this.model.IdSupply);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
         row.append(this.temlateList[i])
         i++;
    }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
    }
  }

  modifimethod(): void {
    this.modelToServer = JSON.parse(JSON.stringify(this.model)) ;
    this.modelToServer.DatePostavki = this.getTime;
    delete this.modelToServer.DataCreate;
    this.isEdit = true;  
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdSupply===this.model.IdSupply);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
  this.table = table;  //Таблица
  this.fulltemplate = template; //Заложенный шаблон
  this.modeltable =JSON.parse(JSON.stringify(model.Supply));
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

  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdStatus','Name','Color','ActionsColumn'];
  public dataSource: MatTableDataSource<Statusing> = new MatTableDataSource<Statusing>();

  isAdd: boolean;
  isEdit: boolean;
  model: Statusing = new Statusing();
  index: number;
  modeltable: Statusing[];

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

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
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdStatus)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditNameStatus(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdStatus===0).IdStatus = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  public cancel(model: Statusing): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdStatus===this.model.IdStatus);
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
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll(".validation");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
         row.append(this.temlateList[i])
         i++;
      }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdStatus===this.model.IdStatus);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

 public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort,table:ElementRef,template:ElementRef): Promise<string> {
  this.table = table;  //Таблица
  this.fulltemplate = template; //Заложенный шаблон
  this.modeltable =JSON.parse(JSON.stringify(model.Statusing));
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

export class NameModelSwitheTableModel implements INewLogicaTable<ModelSwithe> {
  
  constructor(public editandadd:EditAndAdd){ }
  
  public displayedColumns = ['IdModelSwithes','NameModel','CountPort','ActionsColumn'];  
  public dataSource: MatTableDataSource<ModelSwithe> = new MatTableDataSource<ModelSwithe>();
  
  isAdd: boolean;
  isEdit: boolean;
  model: ModelSwithe = new ModelSwithe();
  index: number;
  modeltable: ModelSwithe[];

  //Шаблоны для манипулирования DOM
  temlateList:any //Заложенный шаблон Массив
  rowList:any    //Строка по номеру из БД Массив 
  fulltemplate:ElementRef<any>  //Полный шаблон для манипуляции
  table:ElementRef<any>  //Полный шаблон для манипуляции

  calbackfiltersAll(): void {
    throw new Error("Method not implemented.");
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public async add():Promise<void> {
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

  edit(model: ModelSwithe): void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.addtemplate(model.IdModelSwithes)
    this.isEditAndAddTrue();
  }

  public save(): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addAndEditModelSwitch(this.model).subscribe((model:ModelReturn)=>{
      if(model.Index!==0)
      {
        this.dataSource.data.find(x=>x.IdModelSwithes===0).IdModelSwithes = model.Index;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
     this.removetemplate();
    //Запрос на сохранение и обновление данных
  }

  cancel(model: ModelSwithe): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse(); 
    if(this.index>0)
    {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else{
      var userdefault = this.modeltable.find(x=>x.IdModelSwithes===this.model.IdModelSwithes);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
  }

  newmodel(): ModelSwithe {
    var newuser: ModelSwithe = new ModelSwithe();
    newuser.ModelIsEdit = true;
    newuser.IdModelSwithes = 0;
    return newuser;
  }

  //Костыль дожидаемся обновление DOM
  async delay(ms: number):Promise<void> {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addtemplate(index:number):Promise<void>{
      var i = 0;
      await this.delay(10);
      this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
      this.rowList = this.table.nativeElement.querySelectorAll("div[class='"+index+"']");
      for (var row of this.rowList){
         row.append(this.temlateList[i])
         i++;
      }
  }

  ///Удалить шаблон из строки и востановить текущий шаблон
  removetemplate():void{
      var i = 0;
      for (var row of this.rowList){
       row.removeChild(this.temlateList[i]);
        this.fulltemplate.nativeElement.append(this.temlateList[i])
        i++;
      }
  }

  modifimethod(): void {
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdModelSwithes===this.model.IdModelSwithes);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  public async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable =JSON.parse(JSON.stringify(model.ModelSwithe));
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