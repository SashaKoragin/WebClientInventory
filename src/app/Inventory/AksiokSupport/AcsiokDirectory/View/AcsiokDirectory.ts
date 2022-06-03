import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectAllParametrs } from "../../../../Post RequestService/PostRequest";
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EquipmentType, TehnicalSqlAndTreeAis3, Producer, EquipmentModel } from '../../../ModelInventory/InventoryModel';
import { deserialize } from 'class-transformer';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ModelAksiok, Recursion } from '../../../AllSelectModel/RecursionMethod/RecursionClass';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';


interface FlatNodeModel {
    expandable: boolean;
    model: ModelAksiok;
    level: number;
}

@Component(({
    selector: 'aksiokDirectory',
    templateUrl: '../Html/AcsiokDirectory.html',
    styleUrls: ['../Html/AcsiokDirectory.css'],
    providers: [SelectAllParametrs]
}) as any)

export class AksiokDirectory implements OnInit {

    constructor(public select: SelectAllParametrs) { }

    ///Сигнализирует запуск процесса
    public isBeginTask: boolean = true;
    logicaTemplate: LogicaDataBase = new LogicaDataBase();
    selectingTemplate: GenerateParametrs
    modelUserAndEquipment: Recursion = new Recursion();
    public dataSourceProducer: MatTableDataSource<Producer> = new MatTableDataSource<Producer>();



    ngOnInit(): void {
        this.select.isBeginTask(6).toPromise().then((isCheck: boolean) => {
            this.isBeginTask = isCheck
            if (this.isBeginTask) {
                this.select.addselectallparametrs(new ModelSelect(54)).subscribe((model: ModelSelect) => {
                    this.selectingTemplate = new GenerateParametrs(model);
                });
            }
        });
    }


    private _transformerModel = (node: ModelAksiok, level: number) => {
        return {
            expandable: !!node.ModelAksiok && node.ModelAksiok.length > 0,
            model: node,
            level: level,
        };
    }

    treeControlModel = new FlatTreeControl<FlatNodeModel>(node => node.level, node => node.expandable);
    treeFlattenerModel = new MatTreeFlattener(this._transformerModel, node => node.level, node => node.expandable, node => node.ModelAksiok);
    dataSourceModel = new MatTreeFlatDataSource(this.treeControlModel, this.treeFlattenerModel);
    hasChildModel = (_: number, node: FlatNodeModel) => node.model.ModelAksiok.length > 0



    updateAksiokAllModel() {
        try {
            if (this.selectingTemplate.errorModel()) {
                this.logicaTemplate.logicaselect(); //Закрываем логику выбора
                this.logicaTemplate.logicaprogress();  //Открываем логику загрузки
                this.select.selectusersql(this.selectingTemplate.generatecommand()).toPromise().then(async (model) => {
                    if (model != "null") {
                        var server = deserialize<TehnicalSqlAndTreeAis3>(TehnicalSqlAndTreeAis3, model.toString());
                        this.modelUserAndEquipment.methodModelAksiok(server.EquipmentType);
                        this.dataSourceModel.data = this.modelUserAndEquipment.modelAksiok
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

    filterRecursive(filterText: string,
        array: any[],
        property: string,
        property1: string
    ) {
        let filteredData;
        function copy(o: any) {
            return Object.assign({}, o);
        }
        if (filterText) {
            filterText = filterText.toLowerCase();
            filteredData = array.map(copy).filter(function x(y) {
                if (y[property].toLowerCase().includes(filterText)) {
                    return true;
                }
                if (y[property1].toLowerCase().includes(filterText)) {
                    return true;
                }
                if (y.ModelAksiok) {
                    return (y.ModelAksiok = y.ModelAksiok.map(copy).filter(x)).length;
                }
            });
        } else {
            filteredData = array;
        }
        return filteredData;
    }

    back() {
        this.logicaTemplate.logicadatabase(); //Закрываем логику Данных
        this.logicaTemplate.logicaselect(); //Открываем логику загрузки
    }

    public filterTree(filterValue: string): void {
        this.dataSourceModel.data = this.filterRecursive(
            filterValue,
            this.modelUserAndEquipment.modelAksiok,
            'Name',
            'Code'
        );
    }

    applyFilter(filterText: string) {
        this.filterTree(filterText);
    }
}