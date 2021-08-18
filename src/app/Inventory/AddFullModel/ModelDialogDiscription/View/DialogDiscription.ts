import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class ModelDialog {
    idTemplate: number;
    name: string;
    info: string;
    discription: string;
    rowModel: any;
    isUserCreater: boolean;
    isItDepartmen: boolean = true;
}

@Component(({
    selector: 'discription',
    templateUrl: '../Html/DialogDiscription.html',
    styleUrls: ['../Html/DialogDiscription.css'],

}) as any)

export class DialogDiscription {

    constructor(public dialogDataBase: MatDialogRef<DialogDiscription>,
        @Inject(MAT_DIALOG_DATA) public data: ModelDialog) {
        console.log(data.rowModel);
        data.discription = this.propertyToDescription(data.rowModel, data.discription).replace(new RegExp(/(\[\w+\])/, 'g'), '');
        if (new Array(28, 34, 35).some(x => x === data.idTemplate)) {
            data.isUserCreater = true;
        }
    }

    public propertyToDescription(object: any, description: string) {
        for (var property in object) {
            if (typeof (object[property]) === 'object') {
                description = this.propertyToDescription(object[property], description);
            }
            else {
                var has = object.hasOwnProperty(property);
                if (has) {
                    description = description.replace(`[${property}]`, object[property]);
                }
            }
        }
        return description
    }

    closeDialog(): void {
        this.dialogDataBase.close();
    }
} 