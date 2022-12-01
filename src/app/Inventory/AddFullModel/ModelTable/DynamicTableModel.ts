import { MatTableDataSource } from "@angular/material";

export class DynamicTableColumnModel {
  //Накладные и Книги учета материальных ценностей
  public documentModel: SelectTableModel[] = [
    { text: "Накладные", indexsevr: 4, indexcolumnmodel: 0, table: null },
    { text: "Книги учета материальных ценностей", indexsevr: 11, indexcolumnmodel: 1, table: null },
  ]
  //Выбор накладных и книг учета материальных ценностей
  //public mainselectdocumentModel: SelectTableModel = this.documentModel[0];

  //Модель для книг учета и материальных ценностей
  public columnsdocumentModel: Table[] = [{ Type: "DocumentModel", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "BookModels", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ]

  //Ошибки
  public selectserver: SelectTableModel[] = [
    { text: "Выбор не актуальных пользователей", indexsevr: 6, indexcolumnmodel: 0, table: null },
    { text: "Ошибки по инвентаризации", indexsevr: 7, indexcolumnmodel: 1, table: null },
    { text: "Не совпадения имен с Инвентарным номером", indexsevr: 16, indexcolumnmodel: 2, table: null },
    { text: "Дубли имен компьютеров в БД", indexsevr: 17, indexcolumnmodel: 3, table: null },
    { text: "Несоответствие имен по Ip Адресам", indexsevr: 20, indexcolumnmodel: 4, table: null },
    { text: "Ошибки привязки Токенов", indexsevr: 35, indexcolumnmodel: 5, table: null}
  ]
  //Ошибки
  public mainselect: SelectTableModel = this.selectserver[0];
  //Ошибки
  public columns: Table[] = [{ Type: "ErrorUsersNotActual", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "Error", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "InventarNotHostName", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "DoubleComputersName", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "NameHostIpAdress", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "ErrorTokenUser", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];
  //Аналитика
  public selectserverstatistic: SelectTableModel[] = [{ text: "Аналитика мониторы и Системные блоки", indexsevr: 8, indexcolumnmodel: 0, table: null },
  { text: "Отсутствие техники у пользователя", indexsevr: 9, indexcolumnmodel: 1, table: null },

  ];
  //Аналитика
  public mainselectstatistic: SelectTableModel = this.selectserverstatistic[0];
  //Аналитика
  public columnsanalitics: Table[] = [{ Type: "AnaliticaSysBlokAndMonitors", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UsersNotTechnical", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },

  ];

  //Синхронизация
  public selectsynhronization: SelectTableModel[] = [
    { text: "Данные домена:", indexsevr: 15, indexcolumnmodel: 0, table: null },
    { text: "Синхронизированные Ip Адреса", indexsevr: 18, indexcolumnmodel: 1, table: null },
    { text: "Синхронизация с PrintServer", indexsevr: 51, indexcolumnmodel: 2, table: null }
  ]
  //Синхронизация

  //Синхронизация
  public columnssynhronization: Table[] = [
    { Type: "ComputerIpAdressSynhronization", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "SynhronizationIp", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "SynchronizationPrintServerToDataBase", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }
  ];

  //Журнал логирования
  public log: SelectTableModel[] = [
    { text: "Журнал логов редактирования", indexsevr: 21, indexcolumnmodel: 0, table: null },
    { text: "Вся техника на отдел", indexsevr: 22, indexcolumnmodel: 1, table: null },
    { text: "Вся техника в БД", indexsevr: 29, indexcolumnmodel: 2, table: null },
    { text: "Списанная техника в БД", indexsevr: 30, indexcolumnmodel: 3, table: null },
  ]

  //Журнал таблицы с логом
  public columnslog: Table[] = [
    { Type: "HistoryLog", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "TecnicalOtdel", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "AllTechnics", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "AllTechnics", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  /////Почта письма
  //Журнал логирования
  public mailView: SelectTableModel[] = [{ text: "Входящие письма", indexsevr: 25, indexcolumnmodel: 0, table: null },
  { text: "Исходящие письма", indexsevr: 27, indexcolumnmodel: 1, table: null },
  { text: "Календарь ВКС", indexsevr: 32, indexcolumnmodel: 2, table: null }]

  ///Переключение между режимами Исходящие и входящие письма
  public mainselectmail: SelectTableModel = this.mailView[0];

  ///Почта и письма
  public mail: Table[] = [{ Type: "MailInView", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "MailOutView", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "CalendarVksStpView", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }]


  ///Анализ шаблонов ролей 
  public mainTemplateAndRule: SelectTableModel[] = [{ text: "Не отозванные роли и шаблоны уволенных сотрудников.", indexsevr: 39, indexcolumnmodel: 0, table: null },
  { text: "Устаревшие роли сотрудников АИС 3?", indexsevr: 40, indexcolumnmodel: 1, table: null },
  { text: "Дубликаты ролей по наличию шаблона АИС 3", indexsevr: 41, indexcolumnmodel: 2, table: null },
  { text: "Шаблоны или роли в них предназначены для начальников кураторов и руководителей", indexsevr: 42, indexcolumnmodel: 3, table: null },
  { text: "Роли которые даны отдельно от шаблона", indexsevr: 43, indexcolumnmodel: 4, table: null },
  { text: "Избыточные роли у пользователя", indexsevr: 46, indexcolumnmodel: 5, table: null },]

  ///Переключение между шаблонами и ролями
  public mainselectTemplateAndRule: SelectTableModel = this.mainTemplateAndRule[0];
  ///
  public ruleAndTemplate: Table[] = [{ Type: "UsersIsBloking", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UsersRuleOld", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UsersDoubleRulesTemplate", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UserRulesRuk", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "RuleNotTemplateUser", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "RuleUserReplace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }]

  ///Модель техники ЭПО
  public mainEquipmentSto: SelectTableModel[] = [{ text: "Выгруженные данные с ЭПО", indexsevr: 50, indexcolumnmodel: 0, table: null},
  { text: "Выгруженные данные  Аксиок", indexsevr: 55, indexcolumnmodel: 1, table: null }
  ]

  ///Модель техники ЭПО
  public equipmentStoAll: Table[] = [{ Type: "EquipmentSto", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "AksiokAllModel", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }]
  ////////

  //Сравнение данных из разных БД систем
  public selectComparableUser: SelectTableModel[] = [
    { text: "Полный анализ разночтений пользовательских данных: Lotus, AD, DKS, Inventory", indexsevr: 61, indexcolumnmodel: 0, table: null },
    { text: "Полный анализ разночтений техники: AD, АКСИОК, Inventory", indexsevr: 64, indexcolumnmodel: 1, table: null },

  ]
  //Сравнение данных из разных БД систем
  public mainselectComparableUser: SelectTableModel = this.selectComparableUser[0];
  //Сравнение данных из разных БД систем
  public columnsComparableUser: Table[] = [{ Type: "ComparableUserResult", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "ModelComparableAllSystemInventory", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }];

}

export class NewModelDynamicTableColumnModel{

    //Файловый сервер (Разработка шаблона)
    public selectFileServerNewModel: SelectTableModel[] = [
      { text: "Все файлы на сервере", indexsevr: 65, indexcolumnmodel: 0, table: { Type: "AllFileServerSelect", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 } },
      { text: "Дубликаты файлов на сервере", indexsevr: 66, indexcolumnmodel: 1, table: { Type: "DublicatteFileServerSelect", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 } },
      { text: "Большые размеры файлов на сервере", indexsevr: 67, indexcolumnmodel: 2, table: { Type: "SizeMaxFileServerSelect", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 } },
      { text: "Ошибочные файлы на сервере", indexsevr: 68, indexcolumnmodel: 3, table: { Type: "ErrorFileServerSelect", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 } },
      { text: "ДСП файлы на сервере", indexsevr: 69, indexcolumnmodel: 4, table: { Type: "DspFileServer", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 } },
    ]
}


///Класс селектора
export class SelectTableModel {
  text: string;
  indexsevr: number;
  indexcolumnmodel: number;
  table: Table = null;
}

export class Table {
  public Type: string;
  public Colums: Colums[] = null;
  public Model: MatTableDataSource<any> = null;
  public displayedColumns: any = null
  public allCountRow: number = 0
}

export class Colums {
  public columnDef: string;
  public header: string;
  public cell: any;
  public color: string;
}