import { Component,OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { GenerateParametrs,LogicaDataBase } from '../../AllSelectModel/GenerateParametrFront';
import {  DesirilizeXml,  TehnicalSql } from '../../ModelInventory/InventoryModel';
import {  deserialize } from 'class-transformer';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Recursion,ModelUserAndEquipment } from '../../AllSelectModel/RecursionMethod/RecursionClass';




@Component(({
    selector: 'equepment',
    templateUrl: '../Html/Invent.html',
    styleUrls: ['../Html/Invent.css'],
    providers: [SelectAllParametrs]
}) as any)

export class Invent implements OnInit {
    constructor(public select:SelectAllParametrs) { }
    
    modelUserAndEquipment:Recursion = new Recursion();

    logica:LogicaDataBase = new LogicaDataBase();
    selecting:GenerateParametrs
    selectsql:DesirilizeXml = new DesirilizeXml()

    logica1:LogicaDataBase = new LogicaDataBase();
    selecting1:GenerateParametrs
    selectsql1:DesirilizeXml = new DesirilizeXml()

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(1)).subscribe((model:ModelSelect)=>{
          this.selecting = new GenerateParametrs(model);
        })          
        this.select.addselectallparametrs(new ModelSelect(2)).subscribe((model:ModelSelect)=>{
            this.selecting1 = new GenerateParametrs(model);
          })         
    }

nestedTreeControl: NestedTreeControl<ModelUserAndEquipment> = new NestedTreeControl<ModelUserAndEquipment>(node=>node.Children);
nestedDataSource: MatTreeNestedDataSource<ModelUserAndEquipment> = new MatTreeNestedDataSource<ModelUserAndEquipment>();;


nestedTreeControl1: NestedTreeControl<ModelUserAndEquipment> = new NestedTreeControl<ModelUserAndEquipment>(node=>node.Children);
nestedDataSource1: MatTreeNestedDataSource<ModelUserAndEquipment> = new MatTreeNestedDataSource<ModelUserAndEquipment>();;



    update(){
        try {
           if(this.selecting.errorModel()){
            this.logica.logicaselect(); //Закрываем логику выбора
            this.logica.logicaprogress();  //Открываем логику загрузки
            this.select.selectusersql(this.selecting.generatecommand()).subscribe((model)=>{
              this.selectsql.Tehnical = deserialize<TehnicalSql>(TehnicalSql,model.toString()); //Динамический язык
              this.modelUserAndEquipment.methodEquipmentUserRecursion(this.selectsql.Tehnical.Users)
              this.nestedDataSource.data = this.modelUserAndEquipment.userEcvipment;
              this.logica.logicaprogress();
              this.logica.logicadatabase();
            })
            }
           else{
               alert('Существуют ошибки в выборке!!!');
            }
        } catch (e) {
        alert(e.toString());
        }
    }

    hasNestedChild = (_: number, node: ModelUserAndEquipment) =>  node.Children.length>0;
    back() {
             this.logica.logicadatabase();; //Закрываем логику Данных
             this.logica.logicaselect(); //Открываем логику загрузки
             this.modelUserAndEquipment.userEcvipment = [];
             this.nestedDataSource.data = null;
 
     }

    update1(){
        try {
           if(this.selecting1.errorModel()){
            this.logica1.logicaselect(); //Закрываем логику выбора
            this.logica1.logicaprogress();  //Открываем логику загрузки
            this.select.selectusersql(this.selecting1.generatecommand()).subscribe((model)=>{
              this.selectsql1.Tehnical = deserialize<TehnicalSql>(TehnicalSql,model.toString()); //Динамический язык
              this.modelUserAndEquipment.methodEquipmentOtdelAndUserRecursion(this.selectsql1.Tehnical.Otdel)
              this.nestedDataSource1.data = this.modelUserAndEquipment.otdelandUserEcvipment;
              this.logica1.logicaprogress();
              this.logica1.logicadatabase();
            })
            }
           else{
               alert('Существуют ошибки в выборке!!!');
            }
        } catch (e) {
        alert(e.toString());
        }
    }

    hasNestedChild1 = (_: number, node: ModelUserAndEquipment) =>  node.Children.length>0;
    back1() {
             this.logica1.logicadatabase();; //Закрываем логику Данных
             this.logica1.logicaselect(); //Открываем логику загрузки
             this.modelUserAndEquipment.otdelandUserEcvipment = [];
             this.nestedDataSource1.data = null;
     }

     upload(model:ModelUserAndEquipment){
         console.log(model);
     }
}