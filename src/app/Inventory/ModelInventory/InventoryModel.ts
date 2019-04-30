export interface ILogicaUser<T> {
    //Добавление
    add(): void;
    //Редактирование
    edit(user: T): void;
    //Сохранение
    save():void;
    //Отмена
    cancel():void;
    //Добавляем
    isAdd:boolean;
    //Редактируем
    isEdit:boolean;
}


export class FullSelectedModel{
   Otdels: Otdels[];
   AllUserSelected:AllUserSelected = null;
}

// export class AllOtdelsResult {
//     Otdels: Otdels[];
// }

export class AllUserSelected {
    Users: Users[];
}




export class Autorization {
    Users: Users;
}

export class Users{
    public IdUser?: number;
    public Name?: string;
    public IdOtdel?: number;
    public IdPosition?: number;
    public IdNumberKabinet?: number;
    public IdRule?: number;
    public TabelNumber?: string;
    public Telephon?: string;
    public TelephonUndeground?: string;
    public IpTelephon?: string;
    public MacTelephon?: string;
    public NameUser?: string;
    public Passwords?: string;
    public StatusActual?: boolean;
    public IdHistory?: string;
    public DataCreate?: Date;
    public FullInventarizations?: FullInventarization[];
    public Rules?: Rules = new Rules();
    public Position?: Position;
    public Otdel?: Otdels = new Otdels();
    public Kabinet?:Kabinet;
    public ModelIsEdit?: boolean = false;
}
export class SysBlock {
    public IdSysBlock: number;
    public IdModelSysBlock: number;
    public ServiceNum: string;
    public SerNum: string;
    public InventarNumSysBlok: string;
    public NameComputer: string;
    public IpAdress: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: number;
    public DataCreate: string;
    public Statusing: Statusing;
    public NameSysBlock: NameSysBlock;

}
export class Rules {
    public IdRule?: number;
    public NameRules?: string;
    public DataCreate?: string;
}

export class Statusing {
    public IdStatus: number;
    public Name: string;
    public Color: string;
    public DataCreate: string;
}

export class Scaner {
    public IdScaner: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: number;
    public DataCreate: string;
    public Statusing: Statusing;
    public History: History;
    public FullProizvoditel: FullProizvoditel;
    public FullModel:FullModel;

}

export class Printer {
    public IdPrinter: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: number;
    public DataCreate: string;
    public Statusing: Statusing;
    public History: History;
    public FullProizvoditel: FullProizvoditel;
    public FullModel:FullModel;
}

export class Position {
    public IdPosition: number;
    public NamePosition: string;
    public DataCreate: string;
}

export class Otdels {
    public IdOtdel?: number;
    public NameOtdel?: string;
    public DataCreate?: string;
}
export class NameSysBlock {
    public IdModelSysBlock: number;
    public NameComputer: string;
    public DataCreate: string;
}
export class NameMonitor {
    public IdModelMonitor: number;
    public NameMonitor_: string;
    public DataCreate: string;
}
export class Monitor {
    public IdMonitor: number;
    public IdModelMonitor: number;
    public SerNum: string;
    public InventarNumMonitor: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: number;
    public DataCreate: string;
    public Statusing: Statusing;
    public NameMonitor: NameMonitor;
    public History: History;


}
export class Mfu {
    public IdMfu: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public IdCopySave: number;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: number;
    public DataCreate: string;
    public Statusing: Statusing;
    public History: History;
    public FullProizvoditel: FullProizvoditel;
    public FullModel: FullModel;
    public CopySave:CopySave;
}
export class Kabinet {
    public IdNumberKabinet: number;
    public NumberKabinet: number;
    public DataCreate: string;
}
export class InfoTable {
    public Id: number;
    public NameTable: string;
    public NameColumns: string;
    public InfoColumn: string;
    public DataCreate: string;
}

export class InfoLogic {
    public Id: number;
    public InfoProcedure: string;
    public ParamProcedure: string;
    public NameProcedure: string;
    public DataCreate: string;
}
export class History {
    public Id: number;
    public IdHistory: string;
    public IdUser: number;
    public UserProcess: string;
    public DataCreate: string;
}
export class FullProizvoditel {
    public IdProizvoditel: number;
    public NameProizvoditel: string;
    public DataCreate: string;
}
export class FullMonitorSysBlok {
    public Id: number;
    public InventarNumSysBlok: string;
    public InventarNumMonitor: string;
    public DataCreate: string;
}
export class FullModel {
    public IdModel: number;
    public NameModel: string;
    public IdClasification: number;
    public DataCreate: string;
}
export class FullInventarization {
    public Id: number;
    public IdUser: number;
    public IdMonitor: number;
    public IdSysBlock: number;
    public IdScaner: number;
    public IdPrinter: number;
    public IdMfu: number;
    public StatusActual: boolean;
    public Coment: string;
    public DataCreate: string;
    public User: Users;
    public SysBlock: SysBlock;
    public Scaner: Scaner;
    public Printer: Printer;
    public Monitor: Monitor;
    public Mfu:Mfu;
}
export class CopySave {
    public IdCopySave: number;
    public NameCopySave: string;
    public SerNum: string;
    public InventarNum: string;
    public DataCreate: string;
}

export class Classification {
    public IdClasification: number;
    public NameClass: string;
    public DataCreate: string;
}