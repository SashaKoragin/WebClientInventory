import { MatTableDataSource } from "@angular/material";

export class DynamicTableColumnModel{
    //Ошибки
    public selectserver:SelectTableModel[]=[
        {text:"Выбор не актуальных пользователей", indexsevr:6,indexcolumnmodel:0},
        {text:"Ошибки по инвенторизации", indexsevr:7,indexcolumnmodel:1},
        {text:"Не совпадения имен с Инвентарным номером", indexsevr:16,indexcolumnmodel:2},
        {text:"Дубли имен компьютеров в БД", indexsevr:17,indexcolumnmodel:3},
        {text:"Несоответствие имен по Ip Адресам", indexsevr:20,indexcolumnmodel:4},
    ]
    //Ошибки
    public mainselect:SelectTableModel = this.selectserver[0];
    //Ошибки
    public columns:Table[] = [{Type:"ErrorUSerNotActul", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                              {Type:"Error", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                              {Type:"InventarNotHostName", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                              {Type:"DoubleComputersName", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                              {Type:"NameHostIpAdress", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                             ];
    //Аналитика
    public selectserverstatistic:SelectTableModel[]=[{text:"Аналитика мониторы и Системные блоки", indexsevr:8,indexcolumnmodel:0},
                                                     {text:"Отсутствие техники у пользователя", indexsevr:9,indexcolumnmodel:1},
                                                    
                                                    ];
    //Аналитика
    public mainselectstatistic:SelectTableModel = this.selectserverstatistic[0];
    //Аналитика
    public columnsanalitics:Table[] = [{Type:"AnaliticaSysBlokAndMonitors", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                       {Type:"UsersNotTechnical", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                       
                                      ];

    //Синхронизация
  public selectsynhronization:SelectTableModel[]=[
                                                  {text:"Аналитика процесов протекающих в системе", indexsevr:14,indexcolumnmodel:0},
                                                  {text:"Данные домена:", indexsevr:15,indexcolumnmodel:1},
                                                  {text:"Синхронизированные Ip Адреса", indexsevr:18,indexcolumnmodel:2},
                                                 ]
  //Синхронизация
 // public mainsynhronization:SelectTableModel = this.selectsynhronization[0];
  //Синхронизация
  public columnssynhronization:Table[] = [ {Type:"IsProcessComplete",Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                           {Type:"ComputerIpAdressSynhronization", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                           {Type:"SynhronizationIp", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                         ];

  //Журнал логирования
  public log:SelectTableModel[]=[{text:"Журнал логов редактирования", indexsevr:21,indexcolumnmodel:0},
                                 {text:"Вся техника на отдел", indexsevr:22,indexcolumnmodel:1},
                                ]

  //Журнал таблицы с логом
  public columnslog:Table[] = [  {Type:"HistoryLog",Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                 {Type:"TecnicalOtdel",Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0}
                              ];

  /////Почта письма
  //Журнал логирования
  public mailView:SelectTableModel[]=[{text:"Почтовые письма", indexsevr:25,indexcolumnmodel:0}]

  ///Почта и письма
  public mail:Table[] = [ {Type:"Mail",Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0}]
  
}
///Класс селектора
export class SelectTableModel{
  text:string;
  indexsevr:number;
  indexcolumnmodel:number;
}

export class Table{
 public Type:string;
 public Colums:Colums[] = null;
 public Model:MatTableDataSource<any> = null;
 public displayedColumns:any = null
 public allCountRow:number = 0
}

export class Colums{
 public columnDef:string;
 public header:string;
 public cell :any;
 public color:string;
}