import { Users, ILogicaTable, FullSelectedModel, Otdels, Position, Printer, Mfu, ScanerAndCamer, SysBlock, CopySave,
   Monitor,NameSysBlock,
  Kabinet,FullModel,Statusing,FullProizvoditel, ModelReturn, NameMonitor } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator,MatSort } from '@angular/material';
import { ModelValidation } from '../ValidationModel/UserValidation';
import { EditAndAdd } from '../../../Post RequestService/PostRequest';


export class UserTableModel implements ILogicaTable<Users>  {
  constructor(public editandadd:EditAndAdd){

  }
  public displayedColumns = ['IdUser','Name','TabelNumber','Telephon','TelephonUndeground','IpTelephon','NamePosition','NameOtdel','ActionsColumn'];
  public dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  public modelvalid:ModelValidation = new ModelValidation()
  public otdels: Otdels[];
  public position: Position[];
  public modeltable: Users[];
  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public model: Users;
  public index: number = 0;

  public filteredOtdel:any;
  public filteredPosition:any;

  //Метод для выноса всех костылей на модель
  public modifimethod():void{
    if(this.model.Otdel){this.model.IdOtdel = this.model.Otdel.IdOtdel;}
    if(this.model.Position){this.model.IdPosition = this.model.Position.IdPosition;}
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdUser ===this.model.IdUser);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  calbackfiltersAll(){
    this.filteredOtdel = this.otdels.slice();
    this.filteredPosition = this.position.slice();
  }
  
 public newmodel(): Users {
    var newuser: Users = new Users()
    newuser.ModelIsEdit = true;
    newuser.IdUser = this.dataSource.data.length +1;
    newuser.StatusActual = true;
    return newuser;
  }

  public edit(user: Users): void {
        user.ModelIsEdit = true;
        this.model =JSON.parse(JSON.stringify(user));
        this.isEditAndAddTrue();
    }

    public save(): void {
      this.modifimethod();
      this.isEditAndAddFalse();
       this.editandadd.addandedituser(this.model).subscribe((model:ModelReturn)=>{
        if(model.Guid)
        {
           this.dataSource.data.find(x=>x.IdUser===this.model.IdUser).IdHistory = model.Guid;
        }
        console.log(model.Message);
         this.dataSource._updateChangeSubscription();
       });
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
    }

  public add(): void {
        this.isEditAndAddTrue();
        var newmodel = this.newmodel();
        this.dataSource.paginator.lastPage();
        this.dataSource.data.push(newmodel); 
        this.modeltable.push(newmodel); 
        this.index = this.dataSource.data.length;
        this.model = newmodel;
        this.dataSource._updateChangeSubscription();
    }

    public addtableModel(model:FullSelectedModel,paginator:MatPaginator,sort:MatSort):void {
        this.modeltable =JSON.parse(JSON.stringify(model.Users));
        this.model = JSON.parse(JSON.stringify(model.Users[0]));
        this.dataSource.paginator = paginator;
        this.dataSource.sort = sort
        this.dataSource.data = model.Users;
        this.otdels = model.Otdels;
        this.position = model.Position;
        this.filteredOtdel = this.otdels.slice()
        this.filteredPosition = this.position.slice()
    }

    
  public isEditAndAddTrue():void{
    this.isEdit = true;
    this.isAdd = true;
   }
   public isEditAndAddFalse():void{
    this.isAdd = false;
    this.isEdit = false;
   }
}
export class PrinterTableModel implements ILogicaTable<Printer> {
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','Proizvoditel','Model','ZavNum','ServiceNum','InventarNum','IzmInventar','Ip','Coment','Kabinet','Status','ActionsColumn'];
  public dataSource: MatTableDataSource<Printer> = new MatTableDataSource<Printer>();
  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:FullModel[];
  public statusing:Statusing[];
  public proizvoditel:FullProizvoditel[];

  isAdd: boolean;
  isEdit: boolean;
  model: Printer;
  index: number;
  modeltable: Printer[];

  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredProizvoditel:any;

  calbackfiltersAll(){
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
  }


  add(): void {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.paginator.lastPage();
    this.dataSource.data.push(newmodel); 
    this.modeltable.push(newmodel); 
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    this.dataSource._updateChangeSubscription();
  }  

  edit(model: Printer): void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
  }
  save(model: Printer): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addandeditprinter(this.model).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdPrinter===this.model.IdPrinter).IdHistory = model.Guid;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
    //Запрос на сохранение и обновление данных
  }
  
  cancel(model: Printer): void {
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
  }

  newmodel(): Printer {
    var newuser: Printer = new Printer()
    newuser.ModelIsEdit = true;
    newuser.IdPrinter = this.dataSource.data.length +1;
    return newuser;
  }
  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  modifimethod(): void {
    if(this.model.FullProizvoditel) {this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel};
    if(this.model.FullModel) { this.model.IdModel = this.model.FullModel.IdModel};
    if(this.model.Statusing) { this.model.IdStatus = this.model.Statusing.IdStatus};
    if(this.model.Kabinet) {this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet};
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdPrinter ===this.model.IdPrinter);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }
  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort): void {
    this.modeltable =JSON.parse(JSON.stringify(model.Printer));
    this.model = JSON.parse(JSON.stringify(model.Printer[0]));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort
    this.dataSource.data = model.Printer;
    this.kabinet = model.Kabinet;
    this.models = model.Model;
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
  }

  public isEditAndAddTrue():void{
    this.isEdit = true;
    this.isAdd = true;
   }
   public isEditAndAddFalse():void{
    this.isAdd = false;
    this.isEdit = false;
   }
}

export class ScanerAndCamerTableModel implements ILogicaTable<ScanerAndCamer> {
  
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','Proizvoditel','Model','ZavNum','ServiceNum','InventarNum','IzmInventar','Ip','Coment','Kabinet','Status','ActionsColumn'];
  public dataSource: MatTableDataSource<ScanerAndCamer> = new MatTableDataSource<ScanerAndCamer>();
  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:FullModel[];
  public statusing:Statusing[];
  public proizvoditel:FullProizvoditel[];

  isAdd: boolean;
  isEdit: boolean;
  model: ScanerAndCamer;
  index: number;
  modeltable: ScanerAndCamer[];

  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredProizvoditel:any;

  calbackfiltersAll(){
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
  }

  add(): void {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.paginator.lastPage();
    this.dataSource.data.push(newmodel); 
    this.modeltable.push(newmodel); 
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    this.dataSource._updateChangeSubscription();
  } 
  edit(model: ScanerAndCamer): void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
  }
  save(model: ScanerAndCamer): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addandeditscaner(this.model).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdScaner===this.model.IdScaner).IdHistory = model.Guid;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
    //Запрос на сохранение и обновление данных
  }
  cancel(model: ScanerAndCamer): void {
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
  }
  newmodel(): ScanerAndCamer {
    var newuser: ScanerAndCamer = new ScanerAndCamer()
    newuser.ModelIsEdit = true;
    newuser.IdScaner = this.dataSource.data.length +1;
    return newuser;
  }
  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  modifimethod(): void {
    if(this.model.FullProizvoditel) {this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel};
    if(this.model.FullModel) { this.model.IdModel = this.model.FullModel.IdModel};
    if(this.model.Statusing) { this.model.IdStatus = this.model.Statusing.IdStatus};
    if(this.model.Kabinet) {this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet};
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdScaner ===this.model.IdScaner);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }
  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort): void {
    this.modeltable =JSON.parse(JSON.stringify(model.Scaner));
    this.model = JSON.parse(JSON.stringify(model.Scaner[0]));
   this.dataSource.paginator = paginator;
   this.dataSource.sort = sort
    this.dataSource.data = model.Scaner;
    this.kabinet = model.Kabinet;
    this.models = model.Model;
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
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

export class MfuTableModel implements ILogicaTable<Mfu> {
 
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','Proizvoditel','Model','ZavNum','ServiceNum','InventarNum','IzmInventar','Ip','CopySave','Coment','Kabinet','Status','ActionsColumn'];
  public dataSource: MatTableDataSource<Mfu> = new MatTableDataSource<Mfu>();
  public modelvalid:ModelValidation = new ModelValidation()
  public kabinet:Kabinet[];
  public models:FullModel[];
  public statusing:Statusing[];
  public proizvoditel:FullProizvoditel[];
  public copySave:CopySave[];

  isAdd: boolean;
  isEdit: boolean;
  model: Mfu;
  index: number;
  modeltable: Mfu[];
 
  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;
  public filteredProizvoditel:any;
  public filteredCopySave:any;

  calbackfiltersAll(){
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredCopySave = this.copySave.slice();
  }

  add(): void {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.paginator.lastPage();
    this.dataSource.data.push(newmodel); 
    this.modeltable.push(newmodel); 
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    this.dataSource._updateChangeSubscription();
  }  

  edit(model: Mfu): void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
  }

  save(model: Mfu): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addandeditmfu(this.model).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdMfu===this.model.IdMfu).IdHistory = model.Guid;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
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
  }

  newmodel(): Mfu {
    var newuser: Mfu = new Mfu()
    newuser.ModelIsEdit = true;
    newuser.IdMfu = this.dataSource.data.length +1;
    return newuser;
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  modifimethod(): void {
    if(this.model.FullProizvoditel) {this.model.IdProizvoditel = this.model.FullProizvoditel.IdProizvoditel};
    if(this.model.FullModel) { this.model.IdModel = this.model.FullModel.IdModel};
    if(this.model.Statusing) { this.model.IdStatus = this.model.Statusing.IdStatus};
    if(this.model.Kabinet) {this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet};
    if(this.model.CopySave) {this.model.IdCopySave = this.model.CopySave.IdCopySave};
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdMfu ===this.model.IdMfu);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort): void {
    this.modeltable =JSON.parse(JSON.stringify(model.Mfu));
    this.model = JSON.parse(JSON.stringify(model.Mfu[0]));
   this.dataSource.paginator = paginator;
   this.dataSource.sort = sort
    this.dataSource.data = model.Mfu;
    this.kabinet = model.Kabinet;
    this.models = model.Model;
    this.statusing = model.Statusing;
    this.proizvoditel = model.Proizvoditel;
    this.copySave = model.CopySave;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
    this.filteredProizvoditel = this.proizvoditel.slice();
    this.filteredCopySave = this.copySave.slice()
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

export class SysBlockTableModel implements ILogicaTable<SysBlock> {
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','Model','ServiceNum','SerNum','InventarNum','NameComputer','Ip','Kabinet','Coment','Status','ActionsColumn'];
  public dataSource: MatTableDataSource<SysBlock> = new MatTableDataSource<SysBlock>();
  public modelvalid:ModelValidation = new ModelValidation()
  public models:NameSysBlock[];
  public kabinet:Kabinet[];
  public statusing:Statusing[];

  isAdd: boolean;
  isEdit: boolean;
  model: SysBlock;
  index: number;
  modeltable: SysBlock[];
 
  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;

  calbackfiltersAll(){
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
  }

  add(): void {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.paginator.lastPage();
    this.dataSource.data.push(newmodel); 
    this.modeltable.push(newmodel); 
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    this.dataSource._updateChangeSubscription();
  }  

  edit(model: SysBlock): void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
  }

  save(model: SysBlock): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addandeditsysblok(this.model).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdSysBlock===this.model.IdSysBlock).IdHistory = model.Guid;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
    //Запрос на сохранение и обновление данных
  }
  
  cancel(model: SysBlock): void {
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
  }

  newmodel(): SysBlock {
    var newuser: SysBlock = new SysBlock()
    newuser.ModelIsEdit = true;
    newuser.IdSysBlock = this.dataSource.data.length +1;
    return newuser;
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  modifimethod(): void {
    if(this.model.NameSysBlock) {this.model.IdModelSysBlock = this.model.NameSysBlock.IdModelSysBlock};
    if(this.model.Statusing) { this.model.IdStatus = this.model.Statusing.IdStatus};
    if(this.model.Kabinet) {this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet};
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdSysBlock ===this.model.IdSysBlock);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort): void {
    this.modeltable =JSON.parse(JSON.stringify(model.SysBlok));
    this.model = JSON.parse(JSON.stringify(model.SysBlok[0]));
   this.dataSource.paginator = paginator;
   this.dataSource.sort = sort
    this.dataSource.data = model.SysBlok;
    this.kabinet = model.Kabinet;
    this.models = model.ModelSysBlok;
    this.statusing = model.Statusing;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
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

export class MonitorsTableModel implements ILogicaTable<Monitor> {
  constructor(public editandadd:EditAndAdd){ }

  public displayedColumns = ['IdModel','Model','SerNum','InventarNum','Kabinet','Coment','Status','ActionsColumn'];
  public dataSource: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();
  public modelvalid:ModelValidation = new ModelValidation()
  public models:NameMonitor[];
  public kabinet:Kabinet[];
  public statusing:Statusing[];

  isAdd: boolean;
  isEdit: boolean;
  model: Monitor;
  index: number;
  modeltable: Monitor[];
  
  public filteredKabinet:any;
  public filteredModels:any;
  public filteredStatusing:any;

  calbackfiltersAll(){
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
  }
  
  add(): void {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.paginator.lastPage();
    this.dataSource.data.push(newmodel); 
    this.modeltable.push(newmodel); 
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    this.dataSource._updateChangeSubscription();
  } 
  
  edit(model: Monitor): void {
    model.ModelIsEdit = true;
    this.model =JSON.parse(JSON.stringify(model));
    this.isEditAndAddTrue();
  }

  save(model: Monitor): void {
    this.modifimethod();
    this.isEditAndAddFalse();
     this.editandadd.addandeditmonitor(this.model).subscribe((model:ModelReturn)=>{
      if(model.Guid)
      {
        this.dataSource.data.find(x=>x.IdMonitor===this.model.IdMonitor).IdHistory = model.Guid;
      }
      console.log(model.Message);
      this.dataSource._updateChangeSubscription();
     });
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
  }

  newmodel(): Monitor {
    var newuser: Monitor = new Monitor()
    newuser.ModelIsEdit = true;
    newuser.IdMonitor = this.dataSource.data.length +1;
    return newuser;
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  modifimethod(): void {
    if(this.model.NameMonitor) {this.model.IdModelMonitor = this.model.NameMonitor.IdModelMonitor};
    if(this.model.Statusing) { this.model.IdStatus = this.model.Statusing.IdStatus};
    if(this.model.Kabinet) {this.model.IdNumberKabinet = this.model.Kabinet.IdNumberKabinet};
    this.isEdit = true;
    this.model.ModelIsEdit = false;
    //Поиск индекса и замена модели по индексу в таблице
    var userdefault = this.modeltable.find(x=>x.IdMonitor ===this.model.IdMonitor);
    var indexold = this.modeltable.indexOf(userdefault);
    this.dataSource.data[indexold] = this.model;
    this.index = 0;
  }

  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort): void {
    this.modeltable =JSON.parse(JSON.stringify(model.Monitors));
    this.model = JSON.parse(JSON.stringify(model.Monitors[0]));
   this.dataSource.paginator = paginator;
   this.dataSource.sort = sort
    this.dataSource.data = model.Monitors;
    this.kabinet = model.Kabinet;
    this.models = model.NameMonitors;
    this.statusing = model.Statusing;
    this.filteredKabinet = this.kabinet.slice();
    this.filteredModels = this.models.slice();
    this.filteredStatusing = this.statusing.slice();
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