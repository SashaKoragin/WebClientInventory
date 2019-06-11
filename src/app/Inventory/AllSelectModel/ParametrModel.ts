export class ModelSelect{
    constructor( public idselect:number){

    }
    ParametrsSelect:ParametrsSelect = new ParametrsSelect(this.idselect);
    LogicaSelect:LogicaSelect = null;
    Parametrs:Parametrs[] = null;
}

class ParametrsSelect{
    constructor(public idselect:number){
     this.Id = idselect;
    }
  Id?:number;
}

class LogicaSelect{
    Id?:number;
    SelectInfo?:string;
    SelectedParametr?:string;
    SelectUser?:string;
    DataCreate?:Date;
}

class Parametrs{
    Value?:string;
    NameTable?:string;
    NameColumn?:string;
    Info?:string;
    Type?:string;
}
