import { Users, ILogicaTable, FullSelectedModel, Otdels, Position } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator,MatSort } from '@angular/material';
import { ModelValidation } from '../ValidationModel/UserValidation';
import { EditAndAdd } from '../../../Post RequestService/PostRequest';


export class UserTableModel implements ILogicaTable<Users>  {
  constructor(public editandadd:EditAndAdd){

  }
  public displayedColumns = ['IdUser','Name','TabelNumber','Telephon','TelephonUndeground','IpTelephon','NamePosition','NameOtdel','ActionsColumn'];
  public dataSource: MatTableDataSource<Users>;
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
    this.model.IdOtdel = this.model.Otdel.IdOtdel;
    this.model.IdPosition = this.model.Position.IdPosition;
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
    newuser.MacTelephon = '';
    newuser.Name = '';
    newuser.NameUser = '';
    newuser.TabelNumber = '';
    newuser.Telephon = '';
    newuser.TelephonUndeground = '';
    newuser.IdUser = this.dataSource.data.length +1;
    newuser.Otdel = new Otdels();
    newuser.Position = new Position();
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
       this.editandadd.addandedituser(this.model).subscribe((model)=>{
         console.log(model.toString());
         this.dataSource._updateChangeSubscription();
       });
      //Запрос на сохранение и обновление данных
    }

    public cancel(user: Users): void {
      user.ModelIsEdit = false;
      console.log(this.modelvalid.getRowValidatorModel[0].get('NameOtdel').value)
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
        this.dataSource = new MatTableDataSource<Users>(model.Users);
        this.dataSource.paginator = paginator;
        this.dataSource.sort = sort
        this.otdels = model.Otdels;
        this.position = model.Position;
        this.filteredOtdel = this.otdels.slice()
        this.filteredPosition = this.position.slice()
    }

    
  private isEditAndAddTrue(){
    this.isEdit = true;
    this.isAdd = true;
   }
   private isEditAndAddFalse(){
    this.isAdd = false;
    this.isEdit = false;
   }
}
