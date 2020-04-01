import { Component,OnInit } from '@angular/core';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { SelectAllParametrs,PostInventar } from '../../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';

@Component(({
    selector: 'app-root',
    templateUrl: '../Html/Synchronization.html',
    styleUrls: ['../Html/Synchronization.css'],
    providers: [SelectAllParametrs,PostInventar]
}) as any)

export class Synchronization implements OnInit {

    constructor(public select:SelectAllParametrs,public actual:PostInventar) { }
    dinamicmodel:DynamicTableColumnModel = new DynamicTableColumnModel();
    public serverresult:string = null;

    logica:LogicaDataBase = new LogicaDataBase();
    selecting:GenerateParametrs;
    columns:Table = this.dinamicmodel.columnssynhronization[0];

  
    logica2:LogicaDataBase = new LogicaDataBase();
    selecting2:GenerateParametrs;
    columns2:Table = this.dinamicmodel.columnssynhronization[1];

    logica3:LogicaDataBase = new LogicaDataBase();
    selecting3:GenerateParametrs;
    columns3:Table = this.dinamicmodel.columnssynhronization[2];

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.selectsynhronization[0].indexsevr)).subscribe((model:ModelSelect)=>{
              this.selecting = new GenerateParametrs(model);
        })
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.selectsynhronization[1].indexsevr)).subscribe((model:ModelSelect)=>{
            this.selecting2 = new GenerateParametrs(model);
        })
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.selectsynhronization[2].indexsevr)).subscribe((model:ModelSelect)=>{
            this.selecting3 = new GenerateParametrs(model);
        })

    }

    synchronization(){
        this.serverresult = 'Запустили актулизацию!!!'
        this.actual.actualIpComputers().subscribe(async model=>{
             this.serverresult = model.toString();
         });
    }

}