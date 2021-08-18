import { MatTableDataSource } from "@angular/material";

export class DynamicTableColumnModel {
  //Накладные и Книги учета материальных ценностей
  public documentModel: SelectTableModel[] = [
    { text: "Накладные", indexsevr: 4, indexcolumnmodel: 0 },
    { text: "Книги учета материальных ценностей", indexsevr: 11, indexcolumnmodel: 1 },
  ]
  //Выбор накладных и книг учета материальных ценностей
  //public mainselectdocumentModel: SelectTableModel = this.documentModel[0];

  //Модель для книг учета и материальных ценностей
  public columnsdocumentModel: Table[] = [{ Type: "DocumentModel", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "BookModels", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ]

  //Ошибки
  public selectserver: SelectTableModel[] = [
    { text: "Выбор не актуальных пользователей", indexsevr: 6, indexcolumnmodel: 0 },
    { text: "Ошибки по инвенторизации", indexsevr: 7, indexcolumnmodel: 1 },
    { text: "Не совпадения имен с Инвентарным номером", indexsevr: 16, indexcolumnmodel: 2 },
    { text: "Дубли имен компьютеров в БД", indexsevr: 17, indexcolumnmodel: 3 },
    { text: "Несоответствие имен по Ip Адресам", indexsevr: 20, indexcolumnmodel: 4 },
    { text: "Ошибки привязки Токенов", indexsevr: 35, indexcolumnmodel: 5 }
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
  public selectserverstatistic: SelectTableModel[] = [{ text: "Аналитика мониторы и Системные блоки", indexsevr: 8, indexcolumnmodel: 0 },
  { text: "Отсутствие техники у пользователя", indexsevr: 9, indexcolumnmodel: 1 },

  ];
  //Аналитика
  public mainselectstatistic: SelectTableModel = this.selectserverstatistic[0];
  //Аналитика
  public columnsanalitics: Table[] = [{ Type: "AnaliticaSysBlokAndMonitors", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UsersNotTechnical", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },

  ];

  //Синхронизация
  public selectsynhronization: SelectTableModel[] = [
    { text: "Аналитика процесов протекающих в системе", indexsevr: 14, indexcolumnmodel: 0 },
    { text: "Данные домена:", indexsevr: 15, indexcolumnmodel: 1 },
    { text: "Синхронизированные Ip Адреса", indexsevr: 18, indexcolumnmodel: 2 },
  ]
  //Синхронизация
  // public mainsynhronization:SelectTableModel = this.selectsynhronization[0];
  //Синхронизация
  public columnssynhronization: Table[] = [{ Type: "IsProcessComplete", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "ComputerIpAdressSynhronization", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "SynhronizationIp", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Журнал логирования
  public log: SelectTableModel[] = [{ text: "Журнал логов редактирования", indexsevr: 21, indexcolumnmodel: 0 },
  { text: "Вся техника на отдел", indexsevr: 22, indexcolumnmodel: 1 },
  { text: "Вся техника в БД", indexsevr: 29, indexcolumnmodel: 2 },
  { text: "Списанная техника в БД", indexsevr: 30, indexcolumnmodel: 3 },
  ]

  //Журнал таблицы с логом
  public columnslog: Table[] = [{ Type: "HistoryLog", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "TecnicalOtdel", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "AllTechnics", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "AllTechnics", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  /////Почта письма
  //Журнал логирования
  public mailView: SelectTableModel[] = [{ text: "Входящие письма", indexsevr: 25, indexcolumnmodel: 0 },
  { text: "Исходящие письма", indexsevr: 27, indexcolumnmodel: 1 },
  { text: "Календарь ВКС", indexsevr: 32, indexcolumnmodel: 2 }]

  ///Переключение между режимами Исходящие и входящие письма
  public mainselectmail: SelectTableModel = this.mailView[0];

  ///Почта и письма
  public mail: Table[] = [{ Type: "MailInView", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "MailOutView", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "CalendarVksStpView", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }]


  ///Анализ шаблонов ролей 
  public mainTemplateAndRule: SelectTableModel[] = [{ text: "Не отозванные роли и шаблоны уволенных сотрудников.", indexsevr: 39, indexcolumnmodel: 0 },
  { text: "Устаревшие роли сотрудников АИС 3?", indexsevr: 40, indexcolumnmodel: 1 },
  { text: "Дубликаты ролей по наличию шаблона АИС 3", indexsevr: 41, indexcolumnmodel: 2 },
  { text: "Шаблоны или роли в них преднозначены для начальников кураторов и руководителей", indexsevr: 42, indexcolumnmodel: 3 },
  { text: "Роли которые даны отдельно от шаблона", indexsevr: 43, indexcolumnmodel: 4 },
  { text: "Избыточные роли у пользователя", indexsevr: 46, indexcolumnmodel: 5 },]

  ///Переключение между шаблонами и ролями
  public mainselectTemplateAndRule: SelectTableModel = this.mainTemplateAndRule[0];
  ///
  public ruleAndTemplate: Table[] = [{ Type: "UsersIsBloking", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UsersRuleOld", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UsersDoubleRulesTemplate", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UserRulesRuk", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "RuleNotTemplateUser", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "RuleUserReplace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }]
}
///Класс селектора
export class SelectTableModel {
  text: string;
  indexsevr: number;
  indexcolumnmodel: number;
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