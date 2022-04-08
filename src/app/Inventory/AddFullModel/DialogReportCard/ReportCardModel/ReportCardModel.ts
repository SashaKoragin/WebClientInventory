import { Otdel } from '../../../ModelInventory/InventoryModel';
export class GenerateModelReportCard {

    constructor(department: Otdel[]) {
        this.AddYears();
        this.otdels = department;
    }

    public yearsModel: number[] = [];

    public mouthModel: Mouth[] = [{ numberMouthField: 1, numberMouthStringField: "01", nameMouthField: "Январь" },
    { numberMouthField: 2, numberMouthStringField: "02", nameMouthField: "Февраль" },
    { numberMouthField: 3, numberMouthStringField: "03", nameMouthField: "Март" },
    { numberMouthField: 4, numberMouthStringField: "04", nameMouthField: "Апрель" },
    { numberMouthField: 5, numberMouthStringField: "05", nameMouthField: "Май" },
    { numberMouthField: 6, numberMouthStringField: "06", nameMouthField: "Июнь" },
    { numberMouthField: 7, numberMouthStringField: "07", nameMouthField: "Июль" },
    { numberMouthField: 8, numberMouthStringField: "08", nameMouthField: "Август" },
    { numberMouthField: 9, numberMouthStringField: "09", nameMouthField: "Сентябрь" },
    { numberMouthField: 10, numberMouthStringField: "10", nameMouthField: "Октябрь" },
    { numberMouthField: 11, numberMouthStringField: "11", nameMouthField: "Ноябрь" },
    { numberMouthField: 12, numberMouthStringField: "12", nameMouthField: "Декабрь" }
    ];
    public viewModel: View[] = [{ idViewField: 0, nameViewField: "Первичный" },
    { idViewField: 1, nameViewField: "Корректирующий" }
    ];
    public typeModel: Type[] = [{ idTypeField: 0, nameTypeField: "Аванс" },
    { idTypeField: 1, nameTypeField: "Полный" }
    ];
    public otdels: Otdel[];

    public selectedYears: number;
    public selectedMouth: Mouth;
    public selectedView: View;
    public selectedType: Type;
    public selectedDepartmentIndex: Otdel;

    public AddYears() {
        var todayYear = new Date().getFullYear();
        for (var year = 2021; year <= todayYear; year++) {
            this.yearsModel.push(year);
        }
    }
}




export class ReportCardModel {

    constructor(department: Otdel[]) {
        this.department = department;
    }

    public department: Otdel[] = null
    public settingParametersField: SettingParameters = new SettingParameters();
}

export class SettingParameters {
    public yearField: number;
    public mouthField: Mouth;
    public viewField: View;
    public typeField: Type;
    public leaderNField: LeaderN = null;
    public leaderDField: LeaderD = null;
    public leaderKadrField: LeaderKadr = null;
    public holidaysField: Holidays[] = null;
    public usersReportCardField: UsersReportCard[] = null
    public tabelNumberField: string;
    public idDepartmentField: number = 0;
}

export class Mouth {
    public numberMouthField: number;
    public numberMouthStringField: string;
    public nameMouthField: string;
}

export class View {
    public idViewField: number;
    public nameViewField: string;
}

export class Type {
    public idTypeField: number;
    public nameTypeField: string;
}

export class LeaderN {
    public nameFaceLeaderField: string;
    public nameFullOrganizationField: string;
}

export class LeaderD {
    public codeDepartmentField: string;
    public nameDepartmentField: string;
    public nameLeaderDepartmentField: string;
    public doljLeaderDepartmentField: string;
    public doljIspDepartmentField: string;
    public nameIspDepartmentField: string;
}

export class LeaderKadr {
    public doljKadrField: string;
    public nameKadrField: string;
}

export class Holidays {
    public dateTime_HolidayField: any;
    public iS_HOLIDAYField: boolean;
}

export class UsersReportCard {
    public fioField: string;
    public tab_numField: string;
    public new_postField: string;
    public status_linkField: string;
    public date_inField: any;
    public date_outField: any;
    public linkField: number;
    public link_GrField: number;
    public nameGrField: string;
}