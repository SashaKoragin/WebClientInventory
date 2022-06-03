import { Component, OnInit } from '@angular/core';
import { EditAndAdd } from '../../../../Post RequestService/PostRequest';
import { MatDialogRef } from '@angular/material/dialog';
import { AksiokAddAndEdit } from '../../../ModelInventory/InventoryModel';
import { ModelAksiok } from '../DialogAksiokModel/DialogAksiokModel';
import { ModelValidation } from '../../ValidationModel/UserValidation';

@Component(({
    selector: 'reportCard',
    templateUrl: '../DialogAksiokEditAndAddHtml/DialogAksiokEditAndAdd.html',
    styleUrls: ['../DialogAksiokEditAndAddCss/DialogAksiokEditAndAdd.css'],
    providers: [EditAndAdd]
}) as any)

export class DialogAksiokEditAndAdd implements OnInit {
    constructor(public editandadd: EditAndAdd, public dialogDataBase: MatDialogRef<AksiokAddAndEdit>) { }

    ///Валидация
    public modelValid: ModelValidation = new ModelValidation()
    public modelAksiok: ModelAksiok = new ModelAksiok(this.dialogDataBase.componentInstance)


    ngOnInit(): void {

    }

    public edit(): void {
    }
    public add(): void {
    }
}