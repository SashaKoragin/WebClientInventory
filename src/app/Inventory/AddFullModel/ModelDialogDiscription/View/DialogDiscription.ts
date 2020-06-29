import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export class ModelDialog {
    idTemplate: number;
    name: string;
    info: string;
    discription: string;
    rowModel: any;
    isUserCreater: boolean;
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
        data.discription = "Добрый день!";
        if (new Array(14, 15, 16, 17, 18, 19, 20, 21, 22).some(x => x === data.idTemplate)) {
            var parametr = " Имя принтера: " + data.rowModel.FullModel.NameModel + ", сер.№: " + data.rowModel.ZavNumber + ", инв.№: " + data.rowModel.InventarNumber + ", серв.№: " + data.rowModel.ServiceNumber + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet;
            data.discription += parametr;
            data.isUserCreater = true;
        }
        if (data.idTemplate === 4) {
            var parametr = " РС: " + data.rowModel.NameSysBlock.NameComputer + ", сер.№: " + data.rowModel.SerNum + ", инв.№: " + data.rowModel.InventarNumSysBlok + ", серв.№:" + data.rowModel.ServiceNum + ",Имя: " + data.rowModel.NameComputer + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet;
            data.discription += parametr;
            data.isUserCreater = true;
        }
        if (new Array(1, 2, 3).some(x => x === data.idTemplate)) {
            var parametr = "РС: " + data.rowModel.NameSysBlock.NameComputer + ", сер.№: " + data.rowModel.SerNum + ", инв.№: " + data.rowModel.InventarNumSysBlok + ", серв.№:" + data.rowModel.ServiceNum + ",Имя: " + data.rowModel.NameComputer + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet;
            data.discription += parametr;
        }
        if (new Array(5, 6, 7).some(x => x === data.idTemplate)) {
            var parametr = " Имя принтера: " + data.rowModel.FullModel.NameModel + ", сер.№: " + data.rowModel.ZavNumber + ", инв.№: " + data.rowModel.InventarNumber + ", серв.№: " + data.rowModel.ServiceNumber + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet;
            data.discription += parametr;
            data.isUserCreater = true;
        }
        if (data.idTemplate === 25) {
            var telNum = data.rowModel.Telephon ? data.rowModel.Telephon.Telephon_ : '';
            var parametr = " Просьба подключить и настроить телефонный аппарат в {Куда} и установить номер " + telNum;
            data.discription += parametr;
        }
    }

    closeDialog(): void {
        this.dialogDataBase.close();
    }
} 