export class ModelSelect {
    constructor(public idselect: number) { }
    public parametrsSelectField: ParametrsSelect = new ParametrsSelect(this.idselect)
    public logicaSelectField: LogicaSelect = null
    public parametrsField: Parametrs[] = null
    public parametrsActField: ParametrsAct = null;
}

class ParametrsSelect {
    constructor(public idselect: number) {
        this.idField = idselect;
    }
    public idField: number;
}

export class LogicaSelect {
    public idField: number;
    public selectInfoField: string;
    public nameDllField: string;
    public findNameSpaceField: string;
    public isResultXmlField: boolean;
    public nameReportListField: string;
    public nameReportFileField: string;
    public selectedParametrField: string;
    public selectUserField: string;
}

export class Parametrs {
    public valueField: string;
    public nameTableField: string;
    public nameColumnField: string;
    public infoField: string;
    public typeColumnField: string;
    public isVisibleField: boolean;
}

export class ParametrsAct {
    public idClasificationActField: number;
    public idModelTemplateField: number;
}

