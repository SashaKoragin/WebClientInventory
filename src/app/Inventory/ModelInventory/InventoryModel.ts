import {MatPaginator, MatSort } from '@angular/material';

export interface ILogicaTable<T> {
    //Добавление
    add(): void;
    //Редактирование
    edit(model: T): void;
    //Сохранение
    save(model: T):void;
    //Отмена
    cancel(model: T):void;
    //Создание новой модели
    newmodel():T;
    //Фильтрация данных
    filterstable(filterValue:string):void;
    //Метод переноса модификаций моделей
    modifimethod():void;

    addtableModel(model:FullSelectedModel,paginator:MatPaginator,sort:MatSort):void

    isEditAndAddTrue():void;
    isEditAndAddFalse():void;
    //Добавление новой записи
    isAdd:boolean;
    //Редактируем
    isEdit:boolean;
    //Модель расширения
    model:T;
    //Индекс
    index:number;
    //Модели расширения
    modeltable:T[];
}

///Очень важный класс для приемка DTO ответов
export class FullSelectedModel{
   Otdels: Otdels[];
   Users: Users[];
   Position:Position[];
   Printer:Printer[];
   Scaner:ScanerAndCamer[];
   Mfu:Mfu[];
   SysBlok:SysBlock[];
   Monitors:Monitor[];
   NameMonitors:NameMonitor[];
   CopySave:CopySave[];
   Kabinet:Kabinet[];
   Model:FullModel[];
   Statusing:Statusing[];
   Proizvoditel:FullProizvoditel[];
   ModelSysBlok:NameSysBlock[];
}
///Модель отвертов с сервера
export class ModelReturn{
    public Guid:string;
    public Message:string;
}




export class Autorization {
    Users: Users;
}

export class Users{
    public IdUser?: number;
    public Name?: string;
    public IdOtdel?: number;
    public IdPosition?: number;
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
    public FullInventarizations?: FullInventarization[];
    public Rules?: Rules;
    public Position?: Position;
    public Otdel?: Otdels;
    public ModelIsEdit?: boolean = false;
}
export class SysBlock {
    public IdSysBlock: number;
    public IdModelSysBlock: number;
    public IdNumberKabinet?: number;
    public ServiceNum: string;
    public SerNum: string;
    public InventarNumSysBlok: string;
    public NameComputer: string;
    public IpAdress: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: string;
    public Statusing: Statusing;
    public NameSysBlock: NameSysBlock;
    public Kabinet?:Kabinet;
    public ModelIsEdit?: boolean = false;
}
export class Rules {
    public IdRule?: number;
    public NameRules?: string;
}

export class Statusing {
    public IdStatus: number;
    public Name: string;
    public Color: string;
}

export class ScanerAndCamer {
    public IdScaner: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public IdNumberKabinet?: number;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public IzmInventarNumber:string;
    public IpAdress:string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: string;
    public Statusing: Statusing;
    public FullProizvoditel: FullProizvoditel;
    public FullModel:FullModel;
    public Kabinet?:Kabinet;
    public ModelIsEdit?: boolean = false;
}

export class Printer {
    public IdPrinter?: number;
    public IdProizvoditel?: number;
    public IdModel?: number;
    public IdNumberKabinet?: number;
    public ZavNumber?: string;
    public ServiceNumber?: string;
    public InventarNumber?: string;
    public IzmInventarNumber?:string;
    public IpAdress?:string;
    public Coment?: string;
    public IdStatus?: number;
    public IdHistory?: string;
    public FullInventarizations?: FullInventarization[];
    public FullModel?:FullModel;
    public FullProizvoditel?: FullProizvoditel;
    public Kabinet?:Kabinet;
    public Statusing?: Statusing;
    public ModelIsEdit?: boolean = false;
}

export class Position {
    public IdPosition: number;
    public NamePosition: string;
}

export class Otdels {
    public IdOtdel?: number;
    public NameOtdel?: string;
}
export class NameSysBlock {
    public IdModelSysBlock: number;
    public NameComputer: string;
}
export class NameMonitor {
    public IdModelMonitor: number;
    public NameMonitor_: string;
}
export class Monitor {
    public IdMonitor: number;
    public IdModelMonitor: number;
    public IdNumberKabinet?: number;
    public SerNum: string;
    public InventarNumMonitor: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: string;
    public Statusing: Statusing;
    public NameMonitor: NameMonitor;
    public Kabinet?:Kabinet;
    public ModelIsEdit?: boolean = false;
}
export class Mfu {
    public IdMfu: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public IdNumberKabinet?: number;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public IzmInventarNumber:string;
    public IpAdress:string;
    public IdCopySave: number;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: string;
    public Statusing: Statusing;
    public FullProizvoditel: FullProizvoditel;
    public FullModel: FullModel;
    public CopySave:CopySave;
    public Kabinet?:Kabinet;
    public ModelIsEdit?: boolean = false;
}
export class Kabinet {
    public IdNumberKabinet: number;
    public NumberKabinet: string;
}
export class InfoTable {
    public Id: number;
    public NameTable: string;
    public NameColumns: string;
    public InfoColumn: string;
}

export class InfoLogic {
    public Id: number;
    public InfoProcedure: string;
    public ParamProcedure: string;
    public NameProcedure: string;
}
export class History {
    public Id: number;
    public IdHistory: string;
    public IdUser: number;
    public UserProcess: string;
}
export class FullProizvoditel {
    public IdProizvoditel: number;
    public NameProizvoditel: string;
}
export class FullMonitorSysBlok {
    public Id: number;
    public InventarNumSysBlok: string;
    public InventarNumMonitor: string;
}
export class FullModel {
    public IdModel?: number;
    public NameModel?: string;
    public IdClasification?: number;
}
export class FullInventarization {
    public Id: number;
    public IdUser: number;
    public IdMonitor: number;
    public IdSysBlock: number;
    public IdScaner: number;
    public IdPrinter: number;
    public IdMfu: number;
    public IdIBP: number;
    public IdStrih:number;
    public StatusActual: boolean;
    public Coment: string;
    public User: Users;
    public SysBlock: SysBlock;
    public Scaner: ScanerAndCamer;
    public Printer: Printer;
    public Monitor: Monitor;
    public Mfu:Mfu;
}
export class CopySave {
    public IdCopySave: number;
    public NameCopySave: string;
    public SerNum: string;
    public InventarNum: string;
}

export class Classification {
    public IdClasification: number;
    public NameClass: string;
}