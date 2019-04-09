import { Users, ILogicaUser } from '../../ModelInventory/InventoryModel';
import { MatTableDataSource } from '@angular/material';


export class UserTableModel implements ILogicaUser<Users> {

    add(user: Users): void {
        alert(user.Otdel.NameOtdel);
    }

    dataSource: MatTableDataSource<Users>;
    displayedColumns = ['IdUser', 'Name', 'TabelNumber', 'Telephon', 'TelephonUndeground', 'IpTelephon', 'NameRules', 'NameOtdel', 'ActionsColumn'];

    public addtableModel(user: Users[]) {
        this.dataSource = new MatTableDataSource<Users>(user);

    }
}