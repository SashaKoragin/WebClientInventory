import { Users, Otdels, Rules } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { UserValidation } from '../ValidationModel/UserValidation';



export class UserTableModel {
    
   displayedColumns = ['IdUser','Name','TabelNumber','Telephon','TelephonUndeground','IpTelephon','NameOtdel','NameRules','ActionsColumn'];
   dataSource: MatTableDataSource<Users>;
   uservalidation:UserValidation = new UserValidation()
   users:Users = new Users()
   usertable:Users[];
    edit(user: Users): void {
      user.ModelIsEdit = true;
      this.users = user;
     
     //this.userValidation = new UserValidation()
      //  user.ModelIsEdit = true;
    }
    save(): void {
      alert("Сохранили");
        this.users.ModelIsEdit = false;
   //     this.isEdit = false;
    }
    cancel(user: Users): void {
      user.ModelIsEdit = false;
   ;
    // this.users.ModelIsEdit = false;
     // var t = this.usertable.find(x=>x.IdUser ===this.users.IdUser);
      var indexold = this.dataSource.data.indexOf(user);
      this.dataSource.data[indexold] = this.usertable[indexold];
      user = this.usertable[indexold];
      this.users = this.usertable[indexold];
      this.dataSource._updateChangeSubscription();
      //  this.dataSource = new MatTableDataSource<Users>(this.dataSource.data);
      // this.users = this.usertable.find(x=>x.IdUser ===this.users.IdUser);
     // user = t;
    }
    isAdd: boolean = false;
  //  isEdit: boolean = false;

    add(): void {
        
    }

    public addtableModel(usertablemodel:Users[],paginator:MatPaginator) {
       // this.usertable = usertablemodel.slice();
        this.usertable = JSON.parse(JSON.stringify(usertablemodel));
        this.dataSource = new MatTableDataSource<Users>(usertablemodel);
        this.dataSource.paginator = paginator;
    }
}
