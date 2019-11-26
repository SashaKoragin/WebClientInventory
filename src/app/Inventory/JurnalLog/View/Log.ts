import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { GenerateParametrs,LogicaDataBase } from '../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel, Table } from '../../AddFullModel/ModelTable/DynamicTableModel';

@Component(({
    selector: 'log',
    templateUrl: '../Html/Log.html',
    styleUrls: ['../Html/Log.css'],
    providers: [SelectAllParametrs]

}) as any)

export class Log implements OnInit {
    constructor(public select:SelectAllParametrs) { }
    
    dinamicmodel:DynamicTableColumnModel = new DynamicTableColumnModel();
    logica:LogicaDataBase = new LogicaDataBase();
    selecting:GenerateParametrs;
    columns:Table= this.dinamicmodel.columnslog[0];
    ngOnInit(): void {
        this.errorserver(null)
    }


    errorserver(type:any){
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.log[0].indexsevr)).subscribe((model:ModelSelect)=>{
            this.selecting = new GenerateParametrs(model);
          })
    }
}
