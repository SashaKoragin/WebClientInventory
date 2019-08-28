import {MatPaginator, MatSort } from '@angular/material';
import { User } from '../User/View/User';
import { DataSource } from '@angular/cdk/table';
import { async } from 'rxjs/internal/scheduler/async';
import { DatePipe } from '@angular/common';








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

    addtableModel(model:FullSelectedModel,paginator:MatPaginator,sort:MatSort):Promise<string>

    isEditAndAddTrue():void;
    isEditAndAddFalse():void;
    //Добавление новой записи
    isAdd:boolean;
    //Редактируем
    isEdit:boolean;
    //Модель расширения
   // model:T;
    //Индекс
    index:number;
    //Модели расширения
    modeltable:T[];
}
///Десериализация json ответов
export class DesirilizeXml{
    Tehnical:TehnicalSql = new TehnicalSql();
    Documents:Documents = new Documents();
}
export class TehnicalSql{
    Users:Users[] = null;
    Otdel:Otdel[] =null;
}
export class Documents{
    Document:Document[] = null;
}

///Очень важный класс для приемка DTO ответов
export class FullSelectedModel{
   Otdels: Otdel[];
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
   Telephon:Telephon[];
   BlockPower:BlockPower[];
   Supply:Supply[];
   ModelBlockPower:ModelBlockPower[];
   ProizvoditelBlockPower:ProizvoditelBlockPower[];
   UsersIsActualsStats:UsersIsActualsStats[];
   Classification:Classification[];

}
///Модель отвертов с сервера
export class ModelReturn{
    public Guid:string;
    public Index:number;
    public Message:string;
}

export class Autorization {
    Users: Users;
}

export class Users{
    public IdUser?: number;
    public Name?: string;
    public SmallName?: string;
    public IdOtdel?: number;
    public IdPosition?: number;
    public IdRule?: number;
    public TabelNumber?: string;
    public IdTelephon?: number;
    public NameUser?: string;
    public Passwords?: string;
    public StatusActual?: boolean;
    public IdHistory?: string;
    public Mfu?:Mfu[];
    public Monitors?:Monitor[];
    public SysBlock?:SysBlock[];
    public Printer?:Printer[];
    public ScanerAndCamer?:ScanerAndCamer[];
    public BlockPower?:BlockPower[];
    public Document?:Document;
    public Telephon?:Telephon;
    public Rules?: Rules;
    public Position?: Position;
    public Otdel?: Otdel;
    public ModelIsEdit?: boolean = false;
}
export class SysBlock {
    public IdSysBlock: number;
    public IdUser?: number;
    public IdModelSysBlock?: number;
    public IdNumberKabinet?: number;
    public IdSupply?:number;
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
    public Supply?:Supply;
    public User?:Users;
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
    public ModelIsEdit?: boolean = false;
}

export class ScanerAndCamer {
    public IdScaner: number;
    public IdUser?: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public IdNumberKabinet?: number;
    public IdSupply?:number;
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
    public Supply?:Supply;
    public User?:Users;
    public ModelIsEdit?: boolean = false;
}

export class Printer {
    public IdPrinter?: number;
    public IdUser?: number;
    public IdProizvoditel?: number;
    public IdModel?: number;
    public IdNumberKabinet?: number;
    public IdSupply?:number;
    public ZavNumber?: string;
    public ServiceNumber?: string;
    public InventarNumber?: string;
    public IzmInventarNumber?:string;
    public IpAdress?:string;
    public Coment?: string;
    public IdStatus?: number;
    public IdHistory?: string;
    public FullModel?:FullModel;
    public FullProizvoditel?: FullProizvoditel;
    public Kabinet?:Kabinet;
    public Statusing?: Statusing;
    public Supply?:Supply;
    public User?:Users;
    public ModelIsEdit?: boolean = false;
}

export class Position {
    public IdPosition: number;
    public NamePosition: string;
}

export class Otdel {
    public IdOtdel?: number;
    public IdUser?: number;
    public NameOtdel?: string;
    public Users:Users[];
    public User:Users;
    public ModelIsEdit?: boolean = false;
}


export class NameSysBlock {
    public IdModelSysBlock: number;
    public NameComputer: string;
    public ModelIsEdit?: boolean = false;
}

export class NameMonitor {
    public IdModelMonitor: number;
    public Name: string;
    public ModelIsEdit?: boolean = false;
}

export class Monitor {
    public IdMonitor: number;
    public IdUser?: number;
    public IdModelMonitor: number;
    public IdNumberKabinet?: number;
    public IdSupply?:number;
    public SerNum: string;
    public InventarNumMonitor: string;
    public Coment: string;
    public IdStatus: number;
    public IdHistory: string;
    public Statusing: Statusing;
    public NameMonitor: NameMonitor;
    public Kabinet?:Kabinet;
    public Supply?:Supply;
    public User?:Users;
    public ModelIsEdit?: boolean = false;
}

export class Mfu {
    public IdMfu: number;
    public IdUser?: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public IdNumberKabinet?: number;
    public IdSupply?:number;
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
    public Supply?:Supply;
    public User?:Users;
    public ModelIsEdit?: boolean = false;
}

export class Kabinet {
    public IdNumberKabinet: number;
    public NumberKabinet: string;
    public ModelIsEdit?: boolean = false;
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
    public ModelIsEdit?: boolean = false;
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
    public ModelIsEdit?: boolean = false;
    public Classification?:Classification;
}

export class CopySave {
    public IdCopySave: number;
    public NameCopySave: string;
    public SerNum: string;
    public InventarNum: string;
    public ModelIsEdit?: boolean = false;
}

export class Classification {
    public IdClasification: number;
    public NameClass: string;
    public ModelIsEdit?: boolean = false;
}

export class Document{
    public Id: number;
    public IdNamedocument?:number;
    public IdUser?:number;
    public InfoUserFile:string;
    public IsFileExists:boolean;
    public Namefile:string;
    public TypeFile:string;
    public IsActual:boolean;
    public Namedocument:Namedocument;
    public User:User;
}
export class Namedocument{
   public IdNamedocument:number;
   public NameDocument:string;
}

export class BlockPower{
 public IdBlockPowers:number;
 public IdUser?:number;
 public IdProizvoditelBP?:number;
 public IdModelBP?:number;
 public IdSupply?:number;
 public IdNumberKabinet?: number;
 public ZavNumber?:string;
 public ServiceNumber?:string;
 public InventarNumber?:string;
 public Coment?:string;
 public IdStatus?:number;
 public IdHistory?:string;
 public Kabinet?:Kabinet;
 public ModelBlockPower?:ModelBlockPower;
 public ProizvoditelBlockPower?:ProizvoditelBlockPower;
 public Statusing?:Statusing;
 public Supply?:Supply;
 public User?:Users;
 public ModelIsEdit?: boolean = false;
}

export class ModelBlockPower{
    public IdModelBP:number;
    public Name:string;
    public ModelIsEdit?: boolean = false;
}

export class ProizvoditelBlockPower{
    public IdProizvoditelBP:number;
    public Name:string;
    public ModelIsEdit?: boolean = false;
}

export class Supply{
    public IdSupply:number;
    public NameSupply:string;
    public NameKontract:string;
    public DatePostavki:string;
    public DataCreate:string;
    public ModelIsEdit?: boolean = false;
}

export class Telephon{
    public IdTelephon:number;
    public IdSupply?:number;
    public IdNumberKabinet?:number;
    public NameTelephone:string;
    public Telephon_:string;
    public TelephonUndeground:string;
    public SerNumber:string;
    public IpTelephon:string;
    public MacTelephon:string;
    public Coment:string;
    public IdStatus: number;
    public Statusing?:Statusing;
    public Supply:Supply;
    public Kabinet?:Kabinet;
    public ModelIsEdit?: boolean = false;
}

export class UsersIsActualsStats{
    public Id:number;
    public ChangeType:string;
    public IdUser:number;
    public NameUsers:string;
    public SmallNameUsers:string;
    public IdOtdel:number;
    public IdPosition:number;
    public TabelNumber:string;
    public StatusActual:boolean;
}