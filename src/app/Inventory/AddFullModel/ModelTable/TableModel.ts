import { Users, Otdels, Rules, ILogicaUser } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { ModelValidation } from '../ValidationModel/UserValidation';



export class UserTableModel implements ILogicaUser<Users>  {
  public displayedColumns = ['IdUser','Name','TabelNumber','Telephon','TelephonUndeground','IpTelephon','NameOtdel','NameRules','ActionsColumn'];
  public dataSource: MatTableDataSource<Users>;
  public modelvalid:ModelValidation = new ModelValidation()

  public isEdit: boolean = false;
  public isAdd: boolean = false;
  public model: Users;
  public index: number = 0;
  public modeltable: Users[];

 public newmodel(): Users {
    var newuser: Users = new Users()
    newuser.ModelIsEdit = true;
    newuser.MacTelephon = '';
    
    newuser.Name = '';
    newuser.NameUser = '';
    newuser.TabelNumber = '';
    newuser.Telephon = '';
    newuser.TelephonUndeground = '';
    newuser.IdUser = this.dataSource.data.length+1;
    return newuser;
  }

  public edit(user: Users): void {
        user.ModelIsEdit = true;
        this.model = JSON.parse(JSON.stringify(user));
        this.isEditAndAddTrue();
    }

    public save(): void {
      console.log("Сохранили");
      this.isEdit = true;
      this.model.ModelIsEdit = false;
      var userdefault = this.modeltable.find(x=>x.IdUser ===this.model.IdUser);
      var indexold = this.modeltable.indexOf(userdefault);
      this.dataSource.data[indexold] = this.model;
      this.index = 0;
      this.isEditAndAddFalse();
      //Запрос на сохранение и обновление данных

      this.dataSource._updateChangeSubscription();
    }

    public cancel(user: Users): void {
      user.ModelIsEdit = false;
      this.isEditAndAddFalse();  
      if(this.index>0)
      {
        this.dataSource.data.pop();
        this.index = 0;
        this.dataSource._updateChangeSubscription();
      }
    }

  public add(): void {
       
        this.isEditAndAddTrue();
        var newmodel = this.newmodel();
        this.dataSource.paginator.lastPage();
        this.dataSource.data.push(newmodel); 
        this.modeltable.push(newmodel); 
        this.index = this.dataSource.data.length+1;
        this.model = newmodel;
        this.dataSource._updateChangeSubscription();
    }

    public addtableModel(usertablemodel:Users[],paginator:MatPaginator) {
        this.modeltable = JSON.parse(JSON.stringify(usertablemodel));
        this.model = JSON.parse(JSON.stringify(usertablemodel[0]));
        this.dataSource = new MatTableDataSource<Users>(usertablemodel);
        this.dataSource.paginator = paginator;
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
