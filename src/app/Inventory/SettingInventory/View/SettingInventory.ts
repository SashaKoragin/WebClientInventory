import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { EditAndAdd, PostInventar, AuthIdentificationSignalR } from '../../../Post RequestService/PostRequest';
import { DatePipe } from '@angular/common';
import { MainSettingOrganization } from '../../AddFullModel/ModelTable/SettingOrganization';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { SettingDepartmentCaseTableModel, HolidayTableModel, SettingDepartmentRegulations, SettingCategoryPhoneHeader } from '../../AddFullModel/ModelTable/TableModel';
import { DateAdapter, MatSort, MAT_DATE_FORMATS } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../AddFunctionConvertDate/ConvertDateModel';
import { RegulationsDepartment } from '../../ModelInventory/InventoryModel';


@Component(({
    selector: 'settingInventory',
    templateUrl: '../Html/SettingInventory.html',
    styleUrls: ['../Html/SettingInventory.css'],
    providers: [
        EditAndAdd,
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ]

}) as any)
export class SettingInventory implements OnInit {

    constructor(
        public editandadd: EditAndAdd,
        public selectAll: PostInventar,
        public SignalR: AuthIdentificationSignalR) { }

    public returnTextHoliday(value: boolean): string {
        return this.holiday.modelIsHoliday.find(x => x.HolidayBoolean === value).HolidayText
    }

    @ViewChild('TEMPLATESETTINGDEPARTMENT', { static: true }) templatesettingDepartment: ElementRef;
    @ViewChild('TEMPLATEHOLIDAY', { static: true }) templateHoliday: ElementRef;
    @ViewChild('TEMPLATEREGULATIONSDEPARTMENT', { static: true }) templateregulationsDepartment: ElementRef;
    @ViewChild('TEMPLATESETTINGCATEGORYPHONEHEADER', { static: true }) templateCategoryPhoneHeader: ElementRef;

    @ViewChild('settingDepartament', { static: true }) paginatorsettingDepartment: MatPaginator;
    @ViewChild('holidays', { static: true }) paginatorHoliday: MatPaginator;
    @ViewChild('regulationsDepartment', { static: true }) paginatorregulationsDepartment: MatPaginator;
    @ViewChild('categoryPhoneHeaders', { static: true }) paginatorCategoryPhoneHeader: MatPaginator;

    @ViewChild(MatSort, { static: true }) sortsettingDepartment: MatSort;
    @ViewChild(MatSort, { static: true }) sortHoliday: MatSort;
    @ViewChild(MatSort, { static: true }) sortRegulationsDepartment: MatSort;
    @ViewChild(MatSort, { static: true }) sortCategoryPhoneHeader: MatSort;

    @ViewChild('TABLESETTINGDEPARTMENT', { static: false }) tablesettingDepartment: ElementRef;
    @ViewChild('TABLEHOLIDAY', { static: false }) tableHoliday: ElementRef;
    @ViewChild('TABLEREGULATIONSDEPARTMENT', { static: false }) tableRegulationsDepartment: ElementRef;
    @ViewChild('TABLESETTINGCATEGORYPHONEHEADER', { static: false }) tableCategoryPhoneHeader: ElementRef;

    isload: boolean = true;
    loadMessage: string[] = []
    excel: ImportToExcel = new ImportToExcel();
    public setting: MainSettingOrganization = new MainSettingOrganization(this.editandadd, this.SignalR);
    public settingDepartment: SettingDepartmentCaseTableModel = new SettingDepartmentCaseTableModel(this.editandadd, this.SignalR);
    public holiday: HolidayTableModel = new HolidayTableModel(this.editandadd, this.SignalR);
    public settingDepartmentRegulations: SettingDepartmentRegulations = new SettingDepartmentRegulations(this.editandadd, this.SignalR);
    public settingCategoryPhoneHeader: SettingCategoryPhoneHeader = new SettingCategoryPhoneHeader(this.editandadd, this.SignalR);

    public async ngOnInit(): Promise<void> {
        await this.start()
    }

    async start() {
        var message = null;
        await this.selectAll.settingOrganization();
        await this.selectAll.settingDepartamentCase();
        await this.selectAll.holidayDays();
        await this.selectAll.settingDepartmentRegulations();
        await this.selectAll.settingCategoryPhoneHeader();
        message = await this.setting.addtableModel(this.selectAll.select);
        this.loadMessage.push(message);
        message = await this.holiday.addtableModel(this.selectAll.select, this.paginatorHoliday, this.sortHoliday, this.tableHoliday, this.templateHoliday);
        this.loadMessage.push(message);
        message = await this.settingDepartment.addtableModel(this.selectAll.select, this.paginatorsettingDepartment, this.sortsettingDepartment, this.tablesettingDepartment, this.templatesettingDepartment)
        this.loadMessage.push(message);
        message = await this.settingDepartmentRegulations.addtableModel(this.selectAll.select, this.paginatorregulationsDepartment, this.sortRegulationsDepartment, this.tableRegulationsDepartment, this.templateregulationsDepartment)
        this.loadMessage.push(message);
        message = await this.settingCategoryPhoneHeader.addtableModel(this.selectAll.select, this.paginatorCategoryPhoneHeader, this.sortCategoryPhoneHeader, this.tableCategoryPhoneHeader, this.templateCategoryPhoneHeader);
        this.loadMessage.push(message);
        this.isload = false;
    }

}
