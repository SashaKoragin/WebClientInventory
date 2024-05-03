import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EditAndAdd, PostInventar, AuthIdentificationSignalR } from '../../../../Post RequestService/PostRequest';
import { DateAdapter, MAT_DATE_FORMATS, MatPaginator, MatDialog } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../AddFunctionConvertDate/ConvertDateModel';
import { JournalAis3TableModel } from '../../../AddFullModel/ModelTable/TableModel';
import { ImportToExcel } from '../../../AddFullModel/ModelTable/PublicFunction';
import { ModelDialogSelectYear } from '../../../AddFullModel/DialogSelectYear/DialogYearTs/dialogSelectYear';
import { YearModeReport } from '../../../AddFullModel/DialogSelectYear/ModelYear/ModelYear';
import { AllUsersFilters } from '../../../ModelInventory/InventoryModel';


@Component(({
    selector: 'journal',
    templateUrl: '../Html/JournalAis3.html',
    styleUrls: ['../Html/JournalAis3.css'],
    providers: [
        EditAndAdd,
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ]

}) as any)

export class JournalAis3 implements OnInit {

    constructor(
        public editandadd: EditAndAdd,
        public selectAll: PostInventar,
        public SignalR: AuthIdentificationSignalR,
        public dialog: MatDialog) { }

    isload: boolean = true;
    loadMessage: string[] = [];
    modelYearorDepartment: YearModeReport = new YearModeReport();

    @ViewChild('TEMPLATEJOURNALAIS3', { static: true }) templateJournalAis3: ElementRef;

    @ViewChild('TABLEJOURNALAIS3', { static: true }) tableJournalAis3: ElementRef;

    @ViewChild('nameJournalAis', { static: true }) paginatornameJournalAis3: MatPaginator;
    //Журнал заявок 
    public nameJournalAis3: JournalAis3TableModel = new JournalAis3TableModel(this.editandadd, this.SignalR);

    ngOnInit(): void {
        this.start();
    };

    async start() {
        var message = null;
        await this.modelJournal();
        message = await this.nameJournalAis3.addtableModel(this.selectAll.select, this.paginatornameJournalAis3, null, this.tableJournalAis3, this.templateJournalAis3);
        this.loadMessage.push(message);
        this.isload = false;
    }

    async modelJournal() {
        var allUsersFilters = new AllUsersFilters()
        allUsersFilters.filterActualField.isFilterField = true;
        await this.selectAll.alluser(allUsersFilters);
        await this.selectAll.allotdel();
        await this.selectAll.allResourceIt();
        await this.selectAll.allTaskAis3();
        await this.selectAll.allJournalAis3();
        this.selectAll.select.Otdels.forEach(otdel => {
            if (this.selectAll.select.ResourceIt.some(x => x.IdOtdel === otdel.IdOtdel)) {
                this.modelYearorDepartment.otdel.push(otdel);
            }
        });
    }

    public donloadJournal() {
        const dialogRef = this.dialog.open(ModelDialogSelectYear, {
            data: this.modelYearorDepartment
        })
        dialogRef.afterClosed().subscribe(async (result: YearModeReport) => {
            if (this.modelYearorDepartment.selectedYears !== null && this.modelYearorDepartment.selectedOtdel !== null) {
                this.editandadd.createJournal(this.modelYearorDepartment.selectedYears, this.modelYearorDepartment.selectedOtdel.IdOtdel);
            }
            else {
                alert("Не введен Год или Отдел формирование не возможно!!!");
            }
        })
    }
    ///Формирование полного журнала
    public donloadFullJournal() {
        this.editandadd.createJournal("1", 1, true);
    }

}
