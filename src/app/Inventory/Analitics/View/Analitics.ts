import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { GenerateParametrs,LogicaDataBase } from '../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel, Table } from '../../AddFullModel/ModelTable/DynamicTableModel';
@Component(({
    selector: 'analitics',
    templateUrl: '../Html/Analitics.html',
    styleUrls: ['../Html/Analitics.css'],
    providers: [SelectAllParametrs]

}) as any)

export class Analitics implements OnInit {
    constructor(public select:SelectAllParametrs) { }
    dinamicmodel:DynamicTableColumnModel = new DynamicTableColumnModel();
    logica:LogicaDataBase = new LogicaDataBase();
    selecting:GenerateParametrs;
    columns:Table = this.dinamicmodel.columnsanalitics[this.dinamicmodel.mainselectstatistic.indexcolumnmodel];

    ngOnInit(): void {
        this.analiticsserver(null)
    }

    analiticsserver(type:any){
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectstatistic.indexsevr)).subscribe((model:ModelSelect)=>{
            this.selecting = new GenerateParametrs(model);
            this.columns = this.dinamicmodel.columnsanalitics[this.dinamicmodel.mainselectstatistic.indexcolumnmodel]
          })
    }
}