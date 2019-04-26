import { Users, ILogicaUser } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator } from '@angular/material';

export class UserTableModel implements ILogicaUser<Users> {
    edit(user: Users): void {
        this.isEdit = true;
    }
    save(): void {
        this.isEdit = false;
    }
    cancel(): void {
        this.isEdit = false;
    }
    isAdd: boolean = false;
    isEdit: boolean = false;

    add(): void {
        
    }
    dataSource: MatTableDataSource<Users>;
    displayedColumns = ['IdUser', 'Name', 'TabelNumber', 'Telephon', 'TelephonUndeground', 'IpTelephon', 'NameRules', 'NameOtdel', 'ActionsColumn'];

    public addtableModel(user: Users[], paginator:MatPaginator) {
        this.dataSource = new MatTableDataSource<Users>(user);
        this.dataSource.paginator = paginator;
    }
}