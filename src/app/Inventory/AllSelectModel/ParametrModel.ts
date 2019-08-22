export class ModelSelect{
    constructor( public idselect:number){}
    public parametrsSelectField:ParametrsSelect = new ParametrsSelect(this.idselect)
    public logicaSelectField:LogicaSelect = null
    public parametrsField:Parametrs[] = null
}

class ParametrsSelect{
    constructor(public idselect:number){
     this.idField = idselect;
    }
    public idField:number;
}

export class LogicaSelect{
    public idField:number;  
    public selectInfoField:string;
    public selectedParametrField:string;
    public selectUserField:string;
}

class Parametrs{
    public valueField:string;  
    public nameTableField:string;
    public nameColumnField:string;
    public infoField:string;
    public typeColumnField:string;
    public isVisibleField:boolean;
}
