import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { User } from '../User/View/User';
import { ElementRef } from '@angular/core';
import { Book } from './ViewInventory';
import { AuthIdentification } from '../../Post RequestService/PostRequest';
import { Expose } from 'class-transformer';
import { moment } from '../AllSelectModel/GenerateParametrFront';




export interface INewLogicaTable<T> {

    //Создание заявки на СТО
    createSTO(model: T, template: FullTemplateSupport, authService: AuthIdentification, dialog: MatDialog): void;
    //В связи с неоправдано низкой скоростью обработки таблиц выносим шаблоны редактирования отдельно отсюда 3 новых приватных метода
    //Задержка является костылем надо думать как исправить
    //Колонки массив названий
    displayedColumns: any[]

    dataSource: MatTableDataSource<T>
    //Добавление новой записи
    isAdd: boolean;
    //Редактируем
    isEdit: boolean;
    //Модель CallBack в случае ошибке обновления на сервере
    modelCancelError: T;
    //Модель расширения
    model: T;
    //Индекс
    index: number;
    //Модели расширения
    modeltable: T[];
    //ListNode кусочков шаблона подстановки
    temlateList: any
    //ListNode кусочков ячеек в строке для подстановки
    rowList: any    //Строка по номеру из БД Массив 
    //Полный шаблон для манипуляции
    fulltemplate: ElementRef
    //Таблица для манипуляции
    table: ElementRef
    //Костыль с задержкой 
    delay(ms: number): Promise<void>
    //Добавление шаблона подстановки
    addtemplate(index: number): Promise<void>
    //Удаление шаблона подстановки
    removetemplate(): void

    //Добавление
    add(): Promise<void>;
    //Редактирование
    edit(model: T): void;
    //Сохранение
    save(): void;
    //Удаление
    delete(model: T): void;
    //Отмена
    cancel(model: T): void;
    //Создание новой модели
    newmodel(): T;
    //Фильтрация данных
    filterstable(filterValue: string): void;
    //Возврат из фильтра
    calbackfiltersAll(): void;
    //Метод переноса модификаций моделей
    modifimethod(): void;
    //Метод входа в модель
    addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string>

    isEditAndAddTrue(): void;
    isEditAndAddFalse(): void;
}

///Десериализация json ответов
export class DesirilizeXml {
    Documents: Documents = new Documents();
    Book: Book = new Book();
}

export class TehnicalSqlAndTreeAis3 {
    Users: Users[] = null;
    Otdel: Otdel[] = null;
    AllTemplateAndTree: AllTemplateAndTree[] = null;
    TemplateAllIfns: TemplateAllIfns[] = null;
    EquipmentType: EquipmentType[] = null;
}

export class Documents {
    Document: Document[] = null;
}

///Очень важный класс для приемка DTO ответов
export class FullSelectedModel {
    Organization: Organization;
    SettingDepartmentCaseGetServer: SettingDepartmentCaseGetServer[];
    RegulationsDepartment: RegulationsDepartment[];
    Rb_Holiday: Rb_Holiday[];
    StatusHolyday: StatusHolyday[];
    CategoryPhoneHeader: CategoryPhoneHeader[];
    Otdels: Otdel[];
    Users: Users[];
    Position: Position[];
    Printer: Printer[];
    Scaner: ScanerAndCamer[];
    Mfu: Mfu[];
    Swithes: Swithe[];
    SysBlok: SysBlock[];
    Token: Token[];
    Monitors: Monitor[];
    NameMonitors: NameMonitor[];
    CopySave: CopySave[];
    Kabinet: Kabinet[];
    Model: FullModel[];
    Statusing: Statusing[];
    Proizvoditel: FullProizvoditel[];
    ModelSysBlok: NameSysBlock[];
    Telephon: Telephon[];
    BlockPower: BlockPower[];
    Supply: Supply[];
    ModelPhone: ModelPhone[];
    ServerEquipment: ServerEquipment[];
    ModelSeverEquipment: ModelSeverEquipment[];
    ManufacturerSeverEquipment: ManufacturerSeverEquipment[];
    TypeServer: TypeServer[];
    ModelBlockPower: ModelBlockPower[];
    ProizvoditelBlockPower: ProizvoditelBlockPower[];
    UsersIsActualsStats: UsersIsActualsStats[];
    Classification: Classification[];
    ModelSwithe: ModelSwithes[];
    Rule: Rules[];
    RuleUsers: RuleUsers[];
    MailIdentifier: MailIdentifier[];
    MailGroup: MailGroup[];
    FullTemplateSupport: FullTemplateSupport[]; //Модель шаблонов для СТО
    AllTechnics: AllTechnics[]; //Модель для ЛК
    JournalAis3: JournalAis3[]; //Журнал для АИС 3
    ResourceIt: ResourceIt[]; //Ресурс для заявки
    TaskAis3: TaskAis3[];  //Задача заявки
    OtherAll: OtherAll[]; //Разное
    TypeOther: TypeOther[]; //Тип разного
    ProizvoditelOther: ProizvoditelOther[]; //Производитель разного
    ModelOther: ModelOther[]; //Модель разного
    EventProcess: EventProcess[]; //Модель параметров для процесса и процессы
    ParameterEventProcess: ParameterEventProcess[]; //Параметры для выбранного процесса
    SelectDayOfTheWeek: SelectDayOfTheWeek[];
}

///Модель отвертов с сервера
export class ModelReturn<T>{
    public Guid: string;
    public Index: number;
    public Message: string;
    public Model: T
}

export class Autorization {

    public idUserField: number = 0;
    public nameField: string = null;
    public ruleField: string[] = null;
    public tabelNumberField: string = null;
    public errorAutorizationField: string = null;
    public loginField: string = null;
    public passwordField: string = null;
}

export class Organization {
    public Id?: number;
    public NumberIfns: number = 0;
    public CodeIfns?: string;
    public AddressOrganization?: string;
    public NameOrganization?: string;
    public NameFullOrganization?: string;
    public NameFaceLeader?: string;
    public InameOrganization?: string;
    public RnameOrganization?: string;
    public DnameOrganization?: string;
    public VnameOrganization?: string;
    public TnameOrganization?: string;
    public PnameOrganization?: string;
    public NameFace?: string;
    public NameDepartament?: string;
    public CodeRegion: number = 0;
    public CodeCyti: number = 0;
    public Room?: string;
    public Mail?: string;
    public CodeObject?: string;
    public ScenarioEntrance?: string;
    public IdUserDks: number = 0;
    public DataCreate?: any;

}


export class Users {
    public IdUser?: number;
    public NameUser?: string;
    public SmallName?: string;
    public DateInWork?: any;
    public IdOtdel?: number;
    public IdPosition?: number;
    public TabelNumber?: string;
    public IdTelephon?: number;
    public StatusActual: number;
    public IdHistory?: string;
    public Mfu?: Mfu[];
    public Swithe?: Swithe[];
    public Monitors?: Monitor[];
    public SysBlock?: SysBlock[];
    public Printer?: Printer[];
    public Token?: Token[];
    public ScanerAndCamer?: ScanerAndCamer[];
    public BlockPower?: BlockPower[];
    public OtherAll?: OtherAll[];
    public Document?: Document;
    public Telephon?: Telephon;
    public RuleAndUsers?: RuleAndUsers;
    public StatusUser?: StatusUser;
    public Position?: Position;
    public Otdel?: Otdel;
    public ModelIsEdit?: boolean = false;
}

export class JournalAis3 {
    public IdJournal: number;
    public IdTask: number;
    public IdResource: number;
    public IdUser?: number;
    public NameTarget: string;
    public TaskUser: string;
    public DateTask: any;
    public ResourceIt?: ResourceIt;
    public TaskAis3?: TaskAis3
    public User?: Users
    public ModelIsEdit?: boolean = false;
}

export class ResourceIt {
    public IdResource: number;
    public NameResource: string;
    public IdOtdel?: number;
    public Otdel?: Otdel;
    public ModelIsEdit?: boolean = false;
}

export class TaskAis3 {
    public IdTask: number;
    public NameTask: string;
    public ModelIsEdit?: boolean = false;
}


export class SysBlock {
    public IdSysBlock: number;
    public IdUser?: number;
    public IdModelSysBlock?: number;
    public IdNumberKabinet?: number;
    public IdSupply?: number;
    public ServiceNum: string;
    public SerNum: string;
    public InventarNumSysBlok: string;
    public NameComputer: string;
    public IpAdress: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory: string;
    public Token?: Token[];
    public Statusing: Statusing;
    public NameSysBlock: NameSysBlock;
    public Kabinet?: Kabinet;
    public Supply?: Supply;
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class Token {
    public IdToken: number;
    public IdUser: number;
    public IdSupply: number;
    public IdSysBlock: number;
    public ProizvoditelName: string;
    public SerNum: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory: string;
    public Statusing?: Statusing;
    public Supply: Supply;
    public SysBlock: SysBlock;
    public Kabinet?: Kabinet; ///В БД ЭТОЙ МОДЕЛИ НЕТ ТЯНЕТ ИЗ СИСТЕСМНЫХ БЛОКОВ ИСПОЛЬЗУЕТСЯ ДЛЯ СТАТИСТИКИ
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class RuleAndUsers {
    public Id: number;
    public IdUser: number;
    public IdRule: number;
    public Rule: Rules;
    public User: Users;

}

export class Rules {
    public IdRule?: number;
    public NameRules?: string;
}

export class StatusUser {
    public IdStatusUser: number;
    public StatusText: string;
    public ColorStatus: string;
}

export class Statusing {
    public IdStatus: number;
    public NameStatus: string;
    public Color: string;
    public ModelIsEdit?: boolean = false;
}

export class ScanerAndCamer {
    public IdScaner: number;
    public IdUser?: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public IdNumberKabinet?: number;
    public IdSupply?: number;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public IzmInventarNumber: string;
    public IpAdress: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory: string;
    public Statusing: Statusing;
    public FullProizvoditel: FullProizvoditel;
    public FullModel: FullModel;
    public Kabinet?: Kabinet;
    public Supply?: Supply;
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class Printer {
    public IdPrinter?: number;
    public IdUser?: number;
    public IdProizvoditel?: number;
    public IdModel?: number;
    public IdSupply?: number;
    public IdNumberKabinet?: number;
    public Name: string;
    public ZavNumber?: string;
    public ServiceNumber?: string;
    public InventarNumber?: string;
    public IzmInventarNumber?: string;
    public IpAdress?: string;
    public Coment?: string;
    public IdStatus?: number;
    public WriteOffSign: boolean;
    public IdHistory?: string;
    public FullModel?: FullModel;
    public FullProizvoditel?: FullProizvoditel;
    public Kabinet?: Kabinet;
    public Statusing?: Statusing;
    public Supply?: Supply;
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class Position {
    public IdPosition: number;
    public NamePosition: string;
}

export class Otdel {
    public IdOtdel?: number;
    public IdUser?: number;
    public CodeOtdel?: string;
    public NameOtdel?: string;
    public Users: Users[];
    public User: Users;
    public ModelIsEdit?: boolean = false;
}
//Модель DTO для настроек падежей
export class SettingDepartmentCaseGetServer {
    public IdOtdel?: number;
    public NameOtdel?: string;
    public InameOtdel?: string;
    public RnameOtdel?: string;
    public DnameOtdel?: string;
    public VnameOtdel?: string;
    public PnameOtdel?: string;
    public TnameOtdel?: string;
    public ModelIsEdit?: boolean = false;
}

export class RegulationsDepartment {
    public IdOtdel?: number;
    public NameOtdel?: string;
    public Regulations?: string;
    public ModelIsEdit?: boolean = false;
}

export class RegulationsDepartmentToServer {
    constructor(SettingRegulationsDepartment: RegulationsDepartment) {
        SettingRegulationsDepartment.IdOtdel ? this.idOtdelField = SettingRegulationsDepartment.IdOtdel : this.idOtdelField = null;
        SettingRegulationsDepartment.NameOtdel ? this.nameOtdelField = SettingRegulationsDepartment.NameOtdel : this.nameOtdelField = null;
        SettingRegulationsDepartment.Regulations ? this.regulationsField = SettingRegulationsDepartment.Regulations : this.regulationsField = null;
    }
    public idOtdelField?: number;
    public nameOtdelField?: string;
    public regulationsField?: string;
}


export class SettingDepartmentCaseToServer {
    constructor(SettingDepartmentCaseGetServer: SettingDepartmentCaseGetServer) {
        SettingDepartmentCaseGetServer.IdOtdel ? this.idOtdelField = SettingDepartmentCaseGetServer.IdOtdel : this.idOtdelField = null;
        SettingDepartmentCaseGetServer.NameOtdel ? this.nameOtdelField = SettingDepartmentCaseGetServer.NameOtdel : this.nameOtdelField = null;
        SettingDepartmentCaseGetServer.InameOtdel ? this.inameOtdelField = SettingDepartmentCaseGetServer.InameOtdel : this.inameOtdelField = null;
        SettingDepartmentCaseGetServer.RnameOtdel ? this.rnameOtdelField = SettingDepartmentCaseGetServer.RnameOtdel : this.rnameOtdelField = null;
        SettingDepartmentCaseGetServer.DnameOtdel ? this.dnameOtdelField = SettingDepartmentCaseGetServer.DnameOtdel : this.dnameOtdelField = null;
        SettingDepartmentCaseGetServer.VnameOtdel ? this.vnameOtdelField = SettingDepartmentCaseGetServer.VnameOtdel : this.vnameOtdelField = null;
        SettingDepartmentCaseGetServer.PnameOtdel ? this.pnameOtdelField = SettingDepartmentCaseGetServer.PnameOtdel : this.pnameOtdelField = null;
        SettingDepartmentCaseGetServer.TnameOtdel ? this.tnameOtdelField = SettingDepartmentCaseGetServer.TnameOtdel : this.tnameOtdelField = null;
    }
    public idOtdelField?: number;
    public nameOtdelField?: string;
    public inameOtdelField?: string;
    public rnameOtdelField?: string;
    public dnameOtdelField?: string;
    public vnameOtdelField?: string;
    public pnameOtdelField?: string;
    public tnameOtdelField?: string;
}

export class NameSysBlock {
    public IdModelSysBlock: number;
    public NameComputer: string;
    public IdFullCategoria: number;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;
}

export class NameMonitor {
    public IdModelMonitor: number;
    public NameManufacturer: string;
    public IdFullCategoria: number;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;
}

export class Monitor {
    public IdMonitor: number;
    public IdUser?: number;
    public IdModelMonitor: number;
    public IdNumberKabinet?: number;
    public IdSupply?: number;
    public ServiceNum: string;
    public SerNum: string;
    public InventarNumMonitor: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory: string;
    public Statusing?: Statusing;
    public NameMonitor: NameMonitor;
    public Kabinet?: Kabinet;
    public Supply?: Supply;
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class Swithe {
    public IdSwithes: number;
    public IdUser?: number;
    public IdModelSwithes?: number;
    public IdSupply?: number;
    public IdNumberKabinet?: number;
    public ServiceNum: string;
    public SerNum: string;
    public InventarNum: string;
    public NameSwithes: string;
    public IpAdress: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory: string;
    public Statusing?: Statusing;
    public ModelSwithe?: ModelSwithes;
    public Kabinet?: Kabinet;
    public Supply?: Supply;
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class ModelSwithes {
    public IdModelSwithes: number;
    public NameModel: string;
    public CountPort: string;
    public IdFullCategoria: number;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;

}

export class Mfu {
    public IdMfu: number;
    public IdUser?: number;
    public IdProizvoditel: number;
    public IdModel: number;
    public IdSupply?: number;
    public IdNumberKabinet?: number;
    public Name: string;
    public ZavNumber: string;
    public ServiceNumber: string;
    public InventarNumber: string;
    public IzmInventarNumber: string;
    public IpAdress: string;
    public IdCopySave: number;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory: string;
    public Statusing: Statusing;
    public FullProizvoditel: FullProizvoditel;
    public FullModel: FullModel;
    public CopySave: CopySave;
    public Kabinet?: Kabinet;
    public Supply?: Supply;
    public User?: Users;
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
    public IdModel: number;
    public NameModelClass: string;
    public IdUser: number;
    public OldModelColums: string;
    public NewModelColums: string;
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
    public UrlModel?: string;
    public AutoSupport?: boolean;
    public TypeToner?: string;
    public IdClasification: number;
    public IdFullCategoria: number;
    public Classification?: Classification;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;

}

export class CopySave {
    public IdCopySave: number;
    public NameCopySave: string;
    public SerNumCopySave: string;
    public InventarNumCopySave: string;
    public ModelIsEdit?: boolean = false;
}

export class Classification {
    public IdClasification: number;
    public NameClass: string;
    public ModelIsEdit?: boolean = false;
}

export class Document {
    public Id: number;
    public IdNamedocument?: number;
    public IdUser?: number;
    public InfoUserFile: string;
    public IsFileExists: boolean;
    public Namefile: string;
    public TypeFile: string;
    public IsActual: boolean;
    public Namedocument: Namedocument;
    public User: User;
}
export class Namedocument {
    public IdNamedocument: number;
    public NameDocument: string;
}

export class BlockPower {
    public IdBlockPowers: number;
    public IdUser?: number;
    public IdProizvoditelBP?: number;
    public IdModelBP?: number;
    public IdSupply?: number;
    public IdNumberKabinet?: number;
    public ZavNumber?: string;
    public ServiceNumber?: string;
    public InventarNumber?: string;
    public NameBlockPowers?: string;
    public IpAdress?: string;
    public Coment?: string;
    public IdStatus?: number;
    public WriteOffSign: boolean;
    public IdHistory?: string;
    public Kabinet?: Kabinet;
    public ModelBlockPower?: ModelBlockPower;
    public ProizvoditelBlockPower?: ProizvoditelBlockPower;
    public Statusing?: Statusing;
    public Supply?: Supply;
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class ModelBlockPower {
    public IdModelBP: number;
    public Name: string;
    public IdFullCategoria: number;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;

}

export class ProizvoditelBlockPower {
    public IdProizvoditelBP: number;
    public Name: string;
    public ModelIsEdit?: boolean = false;
}

export class Supply {
    public IdSupply: number;
    public NameSupply: string;
    public NameKontract: string;
    public DatePostavki: any;
    public DataCreate: string;
    public ModelIsEdit?: boolean = false;
}

export class Telephon {
    public IdTelephon: number;
    public IdUser?: number;
    public IdModelPhone?: number;
    public IdSupply?: number;
    public IdNumberKabinet?: number;
    public Telephon_: string;
    public TelephonUndeground: string;
    public ServiceNum: string;
    public SerNumber: string;
    public InventarNumberTelephone: string;
    public IpTelephon: string;
    public MacTelephon: string;
    public Coment: string;
    public IdStatus: number;
    public IdCategoryHeaders: number;
    public WriteOffSign: boolean;
    public IdHistory?: string;
    public User?: Users;
    public CategoryPhoneHeader?: CategoryPhoneHeader;
    public Statusing?: Statusing;
    public Supply: Supply;
    public Kabinet?: Kabinet;
    public ModelPhone?: ModelPhone;
    public ModelIsEdit?: boolean = false;
}

export class ModelPhone {
    public IdModelPhone: number;
    public NameModel: string;
    public IdFullCategoria: number;
    public ModelIsEdit?: boolean = false;
}

export class CategoryPhoneHeader {
    public IdCategoryHeaders: number;
    public NameHeaders: string;
    public ModelIsEdit?: boolean = false;
}


export class ServerEquipment {
    public Id: number;
    public IdManufacturerSeverEquipment?: number;
    public IdModelSeverEquipment?: number;
    public IdSupply?: number;
    public IdTypeServer?: number;
    public IdNumberKabinet?: number;
    public ServiceNum: string;
    public SerNum: string;
    public InventarNum: string;
    public NameServer: string;
    public IpAdress: string;
    public IpIlo: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory?: string;
    public ModelSeverEquipment?: ModelSeverEquipment;
    public ManufacturerSeverEquipment?: ManufacturerSeverEquipment;
    public TypeServer?: TypeServer;
    public Statusing?: Statusing;
    public Supply: Supply;
    public Kabinet?: Kabinet;
    public ModelIsEdit?: boolean = false;
}

export class OtherAll {
    public IdOtherAll: number;
    public IdUser?: number;
    public IdSupply?: number;
    public IdTypeOther?: number;
    public IdModelOther?: number;
    public IdProizvoditelOther?: number;
    public IdNumberKabinet?: number;
    public ServiceNumber: string;
    public SerNum: string;
    public InventarNum: string;
    public NameOther: string;
    public IpOther: string;
    public Coment: string;
    public IdStatus: number;
    public WriteOffSign: boolean;
    public IdHistory?: string;
    public Kabinet?: Kabinet;
    public ModelOther?: ModelOther;
    public ProizvoditelOther?: ProizvoditelOther;
    public Statusing?: Statusing;
    public Supply?: Supply;
    public TypeOther?: TypeOther
    public User?: Users;
    public ModelIsEdit?: boolean = false;
}

export class TypeOther {
    public IdTypeOther: number;
    public Name: string;
    public ModelIsEdit?: boolean = false;
}

export class ProizvoditelOther {
    public IdProizvoditelOther: number;
    public Name: string;
    public ModelIsEdit?: boolean = false;
}

export class ModelOther {
    public IdModelOther: number;
    public Name: string;
    public IdFullCategoria: number;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;
}

export class ModelSeverEquipment {
    public IdModelSeverEquipment: number;
    public NameModel: string;
    public IdFullCategoria: number;
    public FullCategoria?: FullCategoria;
    public ModelIsEdit?: boolean = false;
}

export class ManufacturerSeverEquipment {
    public IdManufacturerSeverEquipment: number;
    public NameManufacturer: string;
    public ModelIsEdit?: boolean = false;
}

export class TypeServer {
    public IdTypeServer: number;
    public NameType: string;
    public ModelIsEdit?: boolean = false;
}

export class UsersIsActualsStats {
    public Id: number;
    public ChangeType: string;
    public IdUser: number;
    public NameUsers: string;
    public SmallNameUsers: string;
    public IdOtdel: number;
    public IdPosition: number;
    public TabelNumber: string;
    public StatusActual: boolean;
}

///Модель возврата данных по SignalR
export class ModeleReturn<T>{
    public Guid: string;
    public Index: number;
    public Message: string;
    public Model: T;
}

//Идентификатор
export class MailIdentifier {
    public IdUser: number;
    public IdGroupMail?: number;
    public IdentifierUser: string;
    public MailGroup?: MailGroup;
    public User?: User;
    public ModelIsEdit?: boolean = false;
}

//Группы абонентов
export class MailGroup {
    public IdGroupMail: number;
    public IdOtdelNumber?: number;
    public NameGroup?: string;
    public ModelIsEdit?: boolean = false;
}

//Модель манипуляции с почтой
export class WebMailModel {
    public idMailField: string;
    public nameGroupModelField: string
}
//Шаблоны СТО
export class FullTemplateSupport {
    public IdTemplate: number;
    public Name: string;
    public InfoTemplate: string;
    public IdCategiria: number;
    public Description: string;
    public IsVisibleUserLk: boolean;
    public CategoriaTemplate: CategoriaTemplate[];
}
//Категория шаблона СТО
export class CategoriaTemplate {
    public IdCategiria: number;
    public NameEngCategoria: string;
    public NameRusCategoria: string;
}

///Модель для СТО support.tax.nalog.ru
export class ModelParametrSupport {

    constructor(
        Login: string,
        Password: string,
        IdTemplate: number = 0,
        Discription: string = null,
        IdUser: number = 0,
        IdMfu: number = 0,
        IdMonitor: number = 0,
        IdPrinter: number = 0,
        IdSysBlock: number = 0,
        IdScanner: number = 0,
        IdTelephon: number = 0,
        IdCalendarVks: number = 0,
        IdAnalisysEpo: number = 0,
        AksiokAddAndEdit: AksiokAddAndEdit = null) {
        this.loginField = Login;
        this.passwordField = Password;
        this.idTemplateField = IdTemplate;
        this.discriptionField = Discription;
        this.idUserField = IdUser;
        this.idMfuField = IdMfu;
        this.idMonitorField = IdMonitor;
        this.idPrinterField = IdPrinter;
        this.idSysBlockField = IdSysBlock;
        this.idScannerField = IdScanner;
        this.idTelephonField = IdTelephon;
        this.idCalendarVksField = IdCalendarVks;
        this.idAnalisysEpoField = IdAnalisysEpo;
        this.aksiokAddAndEditField = AksiokAddAndEdit;
    }
    public loginField: string;
    public passwordField: string;
    public idTemplateField: number;
    public discriptionField: string;
    public idUserField: number;
    public idMfuField: number;
    public idMonitorField: number;
    public idPrinterField: number;
    public idSysBlockField: number;
    public idScannerField: number;
    public idTelephonField: number;
    public idCalendarVksField: number;
    public idAnalisysEpoField: number;
    public errorField: string = null;
    public step3ResponseSupportField: string = null;
    public templateSupportField: TemplateSupport[] = null;
    public aksiokAddAndEditField: AksiokAddAndEdit = null
}
//Шаблон параметров заглушка
export class TemplateSupport {
    public nameField: string;
    public infoTemplateField: string;
    public nameStepSupportField: string;
    public helpParameterField: string;
    public nameGuidParametrField: string;
    public parametrField: string;
    public parameterStep3Field: any;
    public typeParametrField: string;
    public nameParametrTypeField: string;
    public selectParametrField: string;
    public templateParametrTypeField: string;
    public isImportantField: boolean;
}

///Класс\Модель для личного кабинета
export class AllTechnics {
    public Id: number;
    public IdCategoriaSupport: number;
    public Item: string;
    public Name: string;
    public NameType: string;
    public NameManufacturer: string;
    public NameModel: string;
    public SerNum: string;
    public InventarNum: string;
    public ServiceNum: string;
    public NameServer: string;
    public IpAdress: string;
    public Mac: string;
    public NumberKabinet: string;
    public Coment: string;
    public IdStatus?: number;
    public NameStatus: string;
    public Color: string;
    public IdUser?: number;
    public IdOtdel?: number;
    public Telephon: string;
}
//Роли пользователя
export class RuleAllAndUsers {
    public RuleUsers: RuleUsers[];
}

export class RuleUsers {
    public idField: number;
    public idUserField: number;
    public idRuleField: number;
    public nameRulesField: string;
}




export class AllTemplateAndTree {
    public TableTemplate: TableTemplate;
}

export class TableTemplate {
    public TableTasks: TableTasks[];
    public Names: string;
    public Category: string;
}

export class TableTasks {
    public Path: string;
    public Type: string;
}


export class TemplateAllIfns {
    public IdTemplateIfns: number;
    public Name: string;
    public Category: string;
    public TemplateIfnsAndRuleIfns: TemplateIfnsAndRuleIfns[]
}

export class TemplateIfnsAndRuleIfns {
    public IdRuleIfns: number;
    public Rules: string;
}

export class Rb_Holiday {
    public Id: number;
    public DateTime_Holiday: any;
    public IdStatusHolidays: number;
    public StatusHolyday: StatusHolyday;
    public ModelIsEdit?: boolean = false;
}

export class StatusHolyday {
    public IdStatusHolidays: number;
    public NameStatus: string;
}

export class AnalysisEpoAndInventarka {
    public Id: number;
    public IsPrint: boolean;
    public NameInfoReport: string;
    public NameListXlsx: string = null;
    public NameFileXlsx: string = null;
    public ViewReport: string = null;
}
///Процессы
export class EventProcess {
    public IdProcess: number;
    public InfoEvent: string;
    public IdDayOfTheWeek?: number;
    public HoursX?: number;
    public MinutesX?: number;
    public IsTimeEventProcess: boolean;
    public IsExistsParameters: boolean;
    public IsComplete?: boolean;
    public DataStart?: any;
    public DataFinish?: any;
    public FindNameSpace: string;
    public NameDll: string;
    public NameMethodProcess: string;
    public SelectDayOfTheWeek?: SelectDayOfTheWeek;
    public ModelIsEdit?: boolean = false;
}
///Параметры для процесса
export class ParameterEventProcess {
    public IdParameters: number;
    public NameParameters: string;
    public InfoParameters: string;
    public Parameters: string;
    public ModelIsEdit?: boolean = false;
}

///Расписание запуска процесса
export class SelectDayOfTheWeek {
    public IdDayOfTheWeek: number;
    public RuTextDayOfTheWeek: string;
    public EngTextDayOfTheWeek: string;
    public EnumDay: number;
}

export class FullCategoria {
    public Id: number;
    public IdEquipmentType: number;
    public IdProducer: number;
    public IdEquipmentModel: number;
    public IsSignOfRelevance: boolean;
}

///Фильтр коллекций
export class AllUsersFilters {

    public filterActualField: FilterActual = new FilterActual();
}

export class FilterActual {

    public isFilterField: boolean = false
}

export class EquipmentType {
    public Id: number;
    @Expose({ name: "Name" })
    public NameType: string;
    @Expose({ name: "Code" })
    public CodeType: string;
    public Producer: Producer[] = null;
}

export class Producer {
    public Id: number;
    @Expose({ name: "Name" })
    public NameProducer: string;
    @Expose({ name: "Code" })
    public CodeProducer: string;
    public EquipmentModel: EquipmentModel[] = null;
}

export class EquipmentModel {
    public Id: number;
    @Expose({ name: "Name" })
    public NameModel: string;
    @Expose({ name: "Code" })
    public CodeModel: string;
}

export class FullCategories {
    public Id: number;
    public IdEquipmentType: number;
    public IdProducer: number;
    public IdEquipmentModel: number;
    public IsSignOfRelevance: boolean;
}
///Модель выбора
export class AksiokAllModel {
    public Id: number;
    public KindEquipmentName: string;
    public NameType: string;
    public NameProducer: string;
    public NameModel: string;
    public NumberContractDelivery: string;
    public NumberContractSto: string;
    public ComputerName: string;
    public SerialNumber: string;
    public InventoryNumber: string;
    public ServiceNumber: string;
    public IndividualServiceNumber: string;
    public YearOfIssue: number;
}

export class AllCharacteristics {
    public AksiokAllModel: AksiokAllModel;
    public ValueCharacteristicJson: ValueCharacteristicJson[] = [];
}

export class ValueCharacteristicJson {
    public Text: string;
    public Index: number;
    public Value: string;
}

export class AksiokAddAndEdit {
    public parametersModelField: ParametersModel = new ParametersModel();
    public kitsEquipmentField: KitsEquipment = new KitsEquipment();
    public parametersRequestAksiokField: ParametersRequestAksiok = null;
    public uploadFileAksiokField: UploadFileAksiok = null;
}

export class ParametersModel {
    public idFullCategoriaField: number = 0;
    public idStateField: number = 0;
    public idStateStoField: number = 0;
    public idExpertiseField: number = 0;
    public modelRequestField: string;
    public nameProducerField: string = null;
    public nameModelField: string = null;
    public serNumberField: string;
    public inventoryNumField: string;
    public codeErrorField: number = 0;
    public errorServerField: string = null;
    public yearOfIssueField: number = 0;
    public exploitationStartYearField: number = 0;
    public guaranteeField: any = `/Date(${moment(new Date(), 'DD-MM-YYYY').valueOf()})/`;
    public isKitField: boolean = false;
    public loginUserField: string = null;
    public passwordField: string = null;
}

export class KitsEquipment {
    public inventoryNumField: string = null;
    public errorServerField: string = null;
    public isCheckedKitsField: boolean = false; //Скомплектовать 
    public isNotCheckedKitsField: boolean = false; //Разукомплектовать
    public kitsEquipmentServerField: KitsEquipmentServer[] = null
}

export class KitsEquipmentServer {
    public idField: number;
    public serialNumberField: string;
    public inventoryNumberField: string;
}

export class ParametersRequestAksiok {
    public fileAktField: FileAkt = null;
    public fileExpertiseField: FileExpertise = null;
    public idTypeField: number;
    public idProducerField: number;
    public idModelField: number;
    public idStateField: number;
    public idStateStoField: number;
    public idExpertiseField: number;
}

export class FileAkt {
    public nameFileField: string;
    public fileField: number[];
    public typeFileField: string;
}

export class FileExpertise {
    public nameFileField: string;
    public fileField: number[];
    public typeFileField: string;
}

export class UploadFileAksiok {
    public nameFileField: string;
    public fileField: number[];
    public typeFileField: string;
}

export class DownloadFileServer {
    public fullPathFileField: string;
    public nameFileField: string;
    public itemTypeTextField: string;
    public typeMimeField: string;
    public fileExtensionField: string;
    public fileByteField: number[];
}

export class ModelFileDetals {
    public allAutorFileField: string[];
    public idFileField: number;
    public idUserField: number;
    public nameUserField: string;
    public smallNameField: string;
    public tabelNumberField: string;
    public nameOtdelField: string;
    public nameSaveField: string;
    public fileOwnerAuthorField: string;
    public lastAuthorField: string;
    public fullPathFileField: string;
    public pathFileField: string;
    public nameFileField: string;
    public itemTypeTextField: string;
    public typeMimeField: string;
    public fileExtensionField: string;
    public sizeFileTextField: string;
    public sizeFileField: number;
    public hashFileField: string;
    public dateCreatedField: Date;
    public dateAccessedField: any;
    public dateModifiedField: any;
    public dateSavedField: any;
}