import { Component, ViewChild, ElementRef, OnInit,Input } from '@angular/core';
import {  FullSelectedModel, Telephon, Users, Otdel,Position } from '../../ModelInventory/InventoryModel';
import { ModelValidation } from '../../AddFullModel/ValidationModel/UserValidation';



@Component(({
    selector: 'TemplateUsers',
    templateUrl: '../Html/TemplateUsers.html',
    styleUrls: ['../Html/TemplateUsers.css']
}) as any)

export class TemplateUsers {

  // @ViewChild('TEMPLATEUSERS',{static: false}) templateUsers: ElementRef;

    public otdels: Otdel[];
    public position: Position[];
    public modeltable: Users[];
    public telephone:Telephon[];
    public model: Users = new Users();

    public modelvalid:ModelValidation = new ModelValidation()


    public filteredOtdel:any;
    public filteredPosition:any;
    public filteredTelephone:any;
  

    calbackfiltersAll(){
        this.filteredOtdel = this.otdels.slice();
        this.filteredPosition = this.position.slice();
        this.filteredTelephone = this.telephone.slice();
      }
      startmodel(fullmodel:FullSelectedModel){
        this.model = JSON.parse(JSON.stringify(fullmodel.Users[0]));
        this.otdels = fullmodel.Otdels;
        this.telephone = fullmodel.Telephon;
        this.position = fullmodel.Position;
        this.filteredOtdel = this.otdels.slice();
        this.filteredPosition = this.position.slice();
        this.filteredTelephone = this.telephone.slice();
      }
}