
export class DynamicTableColumnModel{



    public selectserver:SelectTableModel[]=[
        {text:"Выбор не актуальных пользователей", indexsevr:6,indexcolumnmodel:0},
        {text:"Ошибки по инвенторизации", indexsevr:7,indexcolumnmodel:1}
    ]

    public mainselect:SelectTableModel = this.selectserver[0];





    columns = [{Type:"ErrorUSerNotActul", Colums:[
                { columnDef: 'IdUser', header: 'Ун пользователя',    cell: (element:  any) => `${element.IdUser}`, color: 'null' },
                { columnDef: 'Name', header: 'Пользователь',    cell: (element:  any) => `${element.Name}`, color: 'null' },
                { columnDef: 'StatusActual', header: 'Статус',    cell: (element:  any) => `${element.StatusActual}`,color:'null' },
                { columnDef: 'NameCategory', header: 'Имя Категории',    cell: (element:  any) => `${element.NameCategory}`,color:'null' },
                { columnDef: 'Model', header: 'Модель',    cell: (element:  any) => `${element.Model}`,color:'null' },
                { columnDef: 'Category', header: 'Категория',    cell: (element:  any) => `${element.Category}`,color:'null' },
                { columnDef: 'SerNum', header: 'Серийнвый №',    cell: (element:  any) => `${element.SerNum}`,color:'null' },
                { columnDef: 'ServiceNum', header: 'Сервисный №',    cell: (element:  any) => `${element.ServiceNum}`,color:'null' },
                { columnDef: 'InventarNumSysBlok', header: 'Инвентарный №',    cell: (element:  any) => `${element.InventarNumSysBlok}`,color:'null' },
                { columnDef: 'NumberKabinet', header: 'Кабинет',    cell: (element:  any) => `${element.NumberKabinet}`,color:'null' },
                { columnDef: 'NameComputer', header: 'Имя компьютера',    cell: (element:  any) => `${element.NameComputer}`,color:'null' },
                { columnDef: 'IpAdress', header: 'Ip Адресс',    cell: (element:  any) => `${element.IpAdress}`,color:'null' }
             ]},
              { Type:"Error", Colums:[
                { columnDef: 'SmallName', header: 'Пользователь',    cell: (element:  any) => `${element.SmallName}`,color:'null'  },
                { columnDef: 'NameCategory', header: 'Имя Категории',    cell: (element:  any) => `${element.NameCategory}`,color:'null'  },
                { columnDef: 'Error1', header: 'Ошибка',    cell: (element:  any) => `${element.Error1}`,color:'red'  },
                { columnDef: 'Model', header: 'Модель',    cell: (element:  any) => `${element.Model}`,color:'null'  },
                { columnDef: 'Category', header: 'Категория',    cell: (element:  any) => `${element.Category}`,color:'null'  },
                { columnDef: 'SerNum', header: 'Серийнвый №',    cell: (element:  any) => `${element.SerNum}`,color:'null'  },
                { columnDef: 'InventarNumSysBlok', header: 'Инвентарный №',    cell: (element:  any) => `${element.InventarNumSysBlok}`,color:'null'  },
                { columnDef: 'NumberKabinet', header: 'Кабинет',    cell: (element:  any) => `${element.NumberKabinet}`,color:'null'  },
                { columnDef: 'NameComputer', header: 'Имя компьютера',    cell: (element:  any) => `${element.NameComputer}`,color:'null'  },
                { columnDef: 'IpAdress', header: 'Ip Адресс',    cell: (element:  any) => `${element.IpAdress}`,color:'null'  }
             ]}
            
        ];
}
///Класс селектора
export class SelectTableModel{
  text:string;
  indexsevr:number;
  indexcolumnmodel:number;
}