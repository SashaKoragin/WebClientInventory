import { Component,OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { GenerateParametrs,LogicaDataBase } from '../../AllSelectModel/GenerateParametrFront';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Recursion, ModelUserAndEquipment } from '../../AllSelectModel/RecursionMethod/RecursionClass';
import { AuthIdentification } from '../../../Post RequestService/PostRequest';
import { DocumentReport } from '../../AllSelectModel/Report/ReportModel';
import { TehnicalSql } from '../../ModelInventory/InventoryModel';
import { deserialize } from 'class-transformer';
import {MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


interface FlatNodeModel {
    expandable: boolean;
    model: ModelUserAndEquipment;
    level: number;
}

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/Invent.html',
    styleUrls: ['../Html/Invent.css'],
    providers: [SelectAllParametrs]
}) as any)

export class Invent implements OnInit {
    constructor(public select:SelectAllParametrs, public authService: AuthIdentification) { }

    modelUserAndEquipment:Recursion = new Recursion();

    logica:LogicaDataBase = new LogicaDataBase();
    selecting:GenerateParametrs

    logica1:LogicaDataBase = new LogicaDataBase();
    selecting1:GenerateParametrs

    async ngOnInit():Promise<void> {
        this.select.addselectallparametrs(new ModelSelect(1)).subscribe((model:ModelSelect)=>{
          this.selecting = new GenerateParametrs(model);
        })          
        this.select.addselectallparametrs(new ModelSelect(2)).subscribe((model:ModelSelect)=>{
            this.selecting1 = new GenerateParametrs(model);
          })         
    }

    private _transformerUser = (node: ModelUserAndEquipment, level: number) => {
        return {
          expandable: !!node.Children && node.Children.length > 0,
          model: node,
          level: level,
        };
      }
    
    treeControlUser = new FlatTreeControl<FlatNodeModel>(node => node.level, node => node.expandable);
    treeFlattenerUser = new MatTreeFlattener(this._transformerUser, node => node.level, node => node.expandable, node => node.Children);
    dataSourceUser = new MatTreeFlatDataSource(this.treeControlUser, this.treeFlattenerUser);
    hasChildUser = (_: number, node: FlatNodeModel) => node.model.Children.length>0
    
    private _transformerOtdel = (node: ModelUserAndEquipment, level: number) => {
        return {
          expandable: !!node.Children && node.Children.length > 0,
          model: node,
          level: level,
        };
      }
    
    treeControlOtdel = new FlatTreeControl<FlatNodeModel>(node => node.level, node => node.expandable);
    treeFlattenerOtdel = new MatTreeFlattener(this._transformerOtdel, node => node.level, node => node.expandable, node => node.Children);
    dataSourceOtdel = new MatTreeFlatDataSource(this.treeControlOtdel, this.treeFlattenerOtdel);
    hasChildOtdel = (_: number, node: FlatNodeModel) => node.model.Children.length>0

     updateUsers(){
        try {
           if(this.selecting.errorModel()){
            this.logica.logicaselect(); //Закрываем логику выбора
            this.logica.logicaprogress();  //Открываем логику загрузки
             this.select.selectusersql(this.selecting.generatecommand()).subscribe((model)=>{
                var server = deserialize<TehnicalSql>(TehnicalSql,model.toString());
                this.modelUserAndEquipment.methodEquipmentUserRecursion(server.Users);
                this.dataSourceUser.data = this.modelUserAndEquipment.userEcvipment
                this.logica.logicaprogress();
                this.logica.logicadatabase();
             });
            }
           else{
               alert('Существуют ошибки в выборке!!!');
            }
        } catch (e) {
        alert(e.toString());
        }
    }

    updateOtdels(){
        try {
           if(this.selecting1.errorModel()){
            this.logica1.logicaselect(); //Закрываем логику выбора
            this.logica1.logicaprogress();  //Открываем логику загрузки
            this.select.selectusersql(this.selecting1.generatecommand()).subscribe((model)=>{
               var server = deserialize<TehnicalSql>(TehnicalSql,model.toString())
               this.modelUserAndEquipment.methodEquipmentOtdelAndUserRecursion(server.Otdel);
               this.dataSourceOtdel.data = this.modelUserAndEquipment.otdelandUserEcvipment
               this.logica1.logicaprogress();
               this.logica1.logicadatabase();
            });
            }
           else{
            alert('Существуют ошибки в выборке!!!');
           }
        } catch (e) {
            alert(e.toString());
        }
    }

    backOtdels() {
             this.logica1.logicadatabase();; //Закрываем логику Данных
             this.logica1.logicaselect(); //Открываем логику загрузки
             this.modelUserAndEquipment.otdelandUserEcvipment = [];
    }

    backUsers() {
        this.logica.logicadatabase(); //Закрываем логику Данных
        this.logica.logicaselect(); //Открываем логику загрузки
        this.modelUserAndEquipment.userEcvipment = [];
    }

     uploadModel(model:ModelUserAndEquipment){
         if(model.IdUserOtdel){
         this.select.generatedocument(new DocumentReport(3,this.authService.fullSelect.Users.IdUser,model.IdUser,1)).subscribe(data =>{
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = model.Name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
         });
        }
         else{
             alert("У отдела отсутствует начальник!!!");
         }
     }
}
