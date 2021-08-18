import { EditAndAdd, SelectAllParametrs, PostInventar } from '../../../../Post RequestService/PostRequest';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AllTemplateAndTree, TableTemplate, TemplateAllIfns, TehnicalSqlAndTreeAis3 } from '../../../ModelInventory/InventoryModel';
import { deserialize } from 'class-transformer';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/TemplatendRuleAis3.html',
    styleUrls: ['../Html/TemplatendRuleAis3.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    providers: [SelectAllParametrs]
}) as any)

export class TemplatendRuleAis3 implements OnInit {

    constructor(
        public select: SelectAllParametrs,
        public selectall: PostInventar) { }
    dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs;
    columns: Table = this.dinamicmodel.ruleAndTemplate[this.dinamicmodel.mainselectTemplateAndRule.indexcolumnmodel];



    logicaTemplate: LogicaDataBase = new LogicaDataBase();
    selectingTemplate: GenerateParametrs
    public dataSource: MatTableDataSource<TemplateAllIfns> = new MatTableDataSource<TemplateAllIfns>();
    public expandedElement: TemplateAllIfns[] = [];
    public countMaxPaginator: number = 0;
    public globalFiltersModel = ['IdTemplateIfns', 'Name', 'Category', 'TemplateIfnsAndRuleIfns.IdRuleIfns', 'TemplateIfnsAndRuleIfns.Rules'];
    public columnsToDisplay = ['Name'];
    @ViewChild('pathRuleTemplate', { static: true }) paginator: MatPaginator;

    public isBeginTask: boolean = true;


    ngOnInit(): void {
        this.select.isBeginTask(3).toPromise().then((isCheck: boolean) => {
            this.isBeginTask = isCheck
            if (this.isBeginTask) {
                this.errorserver(null)
                this.select.addselectallparametrs(new ModelSelect(44)).subscribe((model: ModelSelect) => {
                    this.selectingTemplate = new GenerateParametrs(model);
                });
            }
        });
    }

    errorserver(type: any) {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectTemplateAndRule.indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model);
            this.columns = this.dinamicmodel.ruleAndTemplate[this.dinamicmodel.mainselectTemplateAndRule.indexcolumnmodel]
        })
    }

    updateTemplateAis3() {
        try {
            if (this.selectingTemplate.errorModel()) {
                this.logicaTemplate.logicaselect(); //Закрываем логику выбора
                this.logicaTemplate.logicaprogress();  //Открываем логику загрузки
                this.select.selectusersql(this.selectingTemplate.generatecommand()).toPromise().then(async (model) => {
                    if (model != "null") {
                        var server = deserialize<TehnicalSqlAndTreeAis3>(TehnicalSqlAndTreeAis3, model.toString());
                        this.dataSource.data = server.TemplateAllIfns;
                        this.countMaxPaginator = server.TemplateAllIfns.length;
                        this.dataSource.paginator = this.paginator;
                        this.castomefiltermodel();
                    }
                    this.logicaTemplate.logicaprogress();
                    this.logicaTemplate.logicadatabase();
                });
            }
            else {
                alert('Существуют ошибки в выборке!!!');
            }
        } catch (e) {
            alert(e.toString());
        }
    }


    back() {
        this.logicaTemplate.logicadatabase(); //Закрываем логику Данных
        this.logicaTemplate.logicaselect(); //Открываем логику загрузки
        this.dataSource.data = [];
    }

    public expandElement(element: TemplateAllIfns) {
        if (this.expandedElement.length > 0) {
            if (this.expandedElement.find(x => x.Name === element.Name)) {
                let index: number = this.expandedElement.findIndex(item => item.Name === element.Name);
                this.expandedElement.splice(index, 1);
                return;
            }
        }
        this.expandedElement.push(element)
    }

    public IsOpenToClose(element: TemplateAllIfns): boolean {
        if (this.expandedElement.length > 0) {
            if (this.expandedElement.find(x => x.Name === element.Name)) {
                return true;
            }
        }
        return false;
    }

    public filterstablePath(filterValue: string): void {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    castomefiltermodel() {
        this.dataSource.filterPredicate = (data, filter) => {
            var tot = false;
            for (let column of this.globalFiltersModel) {
                if (column in data) {
                    if ((new Date(data[column].toString()).toString() == "Invalid Date")) {
                        tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                    } else {

                        var date = new Date(data[column].toString());
                        var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                        tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                    }
                }
                else {
                    if (data[column.split('.')[0]] !== null) {
                        var i = 0
                        if (data.TemplateIfnsAndRuleIfns) {
                            for (let template of data.TemplateIfnsAndRuleIfns) {
                                if (typeof (data.TemplateIfnsAndRuleIfns[i]) === 'object') {
                                    if (data.TemplateIfnsAndRuleIfns[i][column.split('.')[1]]) {
                                        tot = (tot || data.TemplateIfnsAndRuleIfns[i][column.split('.')[1]].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                                    }
                                }
                                i++;
                            }
                        }
                    }
                }
            }
            return tot;
        }
    }

    public async postDownLoadXlsxSql() {
        await this.selectall.downLoadXlsxSql(this.selecting.generatecommand())
    }

    public async matrixSecurity() {
        await this.select.addselectallparametrs(new ModelSelect(45)).subscribe((model: ModelSelect) => {
            this.selectall.downLoadXlsxSql(model.logicaSelectField)
        })
    }

    ///Функция выбора на всякий случай
    selectViewSql(type: any) {
        console.log(type.index);
    }

}