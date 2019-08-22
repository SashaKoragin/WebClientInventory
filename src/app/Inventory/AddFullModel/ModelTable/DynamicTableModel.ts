
export class DynamicTableColumnModel{
    //Ошибки
    public selectserver:SelectTableModel[]=[
        {text:"Выбор не актуальных пользователей", indexsevr:6,indexcolumnmodel:0},
        {text:"Ошибки по инвенторизации", indexsevr:7,indexcolumnmodel:1}
    ]
    //Ошибки
    public mainselect:SelectTableModel = this.selectserver[0];
    //Ошибки
    public columns:Table[] = [{Type:"ErrorUSerNotActul", Colums:[]},
                       {Type:"Error", Colums:[]}
                      ];
    //Аналитика
    public selectserverstatistic:SelectTableModel[]=[{text:"Аналитика мониторы и Системные блоки", indexsevr:8,indexcolumnmodel:0}
                                                    ];
    //Аналитика
    public mainselectstatistic:SelectTableModel = this.selectserverstatistic[0];
    //Аналитика
    public columnsanalitics:Table[] = [{Type:"AnaliticaSysBlokAndMonitors", Colums:[]}];
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