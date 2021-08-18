///Модель служебных записок

export class Template {

    private modelMemoReport: ModelMemoReport = new ModelMemoReport();
    public modelMemo: ModelMemo[] = [{ idNumberMemo: 1, nameMemo: "Служебка на создание учетной записи", typeMemo: 1 },
    { idNumberMemo: 2, nameMemo: "Служебка на PC и телефонный аппарат", typeMemo: 2 },
    { idNumberMemo: 3, nameMemo: "Служебка на перевод сотрудника", typeMemo: 1 },
    { idNumberMemo: 4, nameMemo: "Заявка на доступ к ЭОД, ГП-3", typeMemo: 1 },
    ];

    ///Создание модели для отправки на сервер
    public createModelSend(iduser: number, tabelNumber: string, modelMemo: ModelMemo): ModelMemoReport {
        this.modelMemoReport.selectParameterDocumentField.idUserField = iduser;
        this.modelMemoReport.selectParameterDocumentField.numberDocumentField = modelMemo.idNumberMemo;
        this.modelMemoReport.selectParameterDocumentField.nameDocumentField = modelMemo.nameMemo;
        this.modelMemoReport.selectParameterDocumentField.typeDocumentField = modelMemo.typeMemo;
        this.modelMemoReport.selectParameterDocumentField.tabelNumberField = tabelNumber;
        return this.modelMemoReport;
    }

}

export class ModelMemo {
    public idNumberMemo: number;
    public nameMemo: string;
    public typeMemo: number;
}

export class ModelMemoReport {
    public selectParameterDocumentField: SelectParameterDocument = new SelectParameterDocument();
    public userDepartmentField: UserDepartment = null;
    public bossDepartmentField: BossDepartment = null;
    public bossAgreedField: BossAgreed = null;
    public executorField: Executor = null;
    public leaderOrganizationField: LeaderOrganization = null;
}

export class SelectParameterDocument {
    public numberDocumentField: number;
    public nameDocumentField: string;
    public typeDocumentField: number;
    public idUserField: number;
    public tabelNumberField: string;
}

export class UserDepartment {
    public ordersField: Orders;
    public nameField: string;
    public nameOtdelField: string;
    public rnameOtdelField: string;
    public positionField: string;
    public regulationsField: string;
    public tabelNumberField: string;
    public ipAdressField: string;
    public numberKabinetField: string;
    public telephoneField: string;
    public smallTabelNumberField: string;
}

export class Orders {
    public orders_ReestrField: Orders_Reestr;
}

export class Orders_Reestr {
    public lastOrderField: string;
}

export class BossDepartment {
    public nameDepartmentField: string;
    public smallNameField: string;
}

export class BossAgreed {
    public positionAgreedField: string;
    public nameAgreedField: string;
}

export class Executor {
    public nameField: string;
    public phoneField: string;
}

export class LeaderOrganization {
    public nameFaceLeaderField: string;
    public rnameOrganizationField: string;
}