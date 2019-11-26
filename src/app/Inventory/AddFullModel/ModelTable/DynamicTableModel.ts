
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
    public columns:Table[] = [{Type:"ErrorUSerNotActul", Colums:[]},
                              {Type:"Error", Colums:[]},
                              {Type:"InventarNotHostName", Colums:[]},
                              {Type:"DoubleComputersName", Colums:[]},
                              {Type:"NameHostIpAdress", Colums:[]},
                             ];
    //Аналитика
    public selectserverstatistic:SelectTableModel[]=[{text:"Аналитика мониторы и Системные блоки", indexsevr:8,indexcolumnmodel:0},
                                                     {text:"Отсутствие техники у пользователя", indexsevr:9,indexcolumnmodel:1},
                                                    
                                                    ];
    //Аналитика
    public mainselectstatistic:SelectTableModel = this.selectserverstatistic[0];
    //Аналитика
    public columnsanalitics:Table[] = [{Type:"AnaliticaSysBlokAndMonitors", Colums:[]},
                                       {Type:"UsersNotTechnical", Colums:[]},
                                       
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
  public columnssynhronization:Table[] = [ {Type:"IsProcessComplete",Colums:[]},
                                           {Type:"ComputerIpAdressSynhronization", Colums:[]},
                                           {Type:"SynhronizationIp", Colums:[]},
                                         ];

  //Журнал логирования
  public log:SelectTableModel[]=[
                                 {text:"Журнал логов редактирования", indexsevr:21,indexcolumnmodel:0},
                                 {text:"Вся техника на отдел", indexsevr:22,indexcolumnmodel:1},
                                ]

//Журнал таблицы с логом
public columnslog:Table[] = [  {Type:"HistoryLog",Colums:[]},
                               {Type:"TecnicalOtdel",Colums:[]}
];

  

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
}

export class Colums{
 public columnDef:string;
 public header:string;
 public cell :any;
 public color:string;
}