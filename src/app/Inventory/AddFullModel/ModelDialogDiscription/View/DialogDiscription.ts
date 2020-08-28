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
        data.discription = "Добрый день! ";
        var comment = (data.rowModel.Coment === undefined || data.rowModel.Coment === "" || data.rowModel.Coment === null) ? "" : " (" + data.rowModel.Coment + ")";
        if (new Array(14, 15, 16, 17, 18, 19, 20, 21, 22).some(x => x === data.idTemplate)) {
            var parametr = "Производитель: " + data.rowModel.FullProizvoditel.NameProizvoditel + ", Имя принтера: " + data.rowModel.FullModel.NameModel + ", сер.№: " + data.rowModel.ZavNumber + ", инв.№: " + data.rowModel.InventarNumber + ", серв.№: " + data.rowModel.ServiceNumber + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet + comment;
            data.discription += parametr;
            data.isUserCreater = true;
        }
        if (new Array(8, 9, 10, 11, 12, 13).some(x => x === data.idTemplate)) {
            var parametr = "Производитель: " + data.rowModel.FullProizvoditel.NameProizvoditel + ", Имя принтера: " + data.rowModel.FullModel.NameModel + ", сер.№: " + data.rowModel.ZavNumber + ", инв.№: " + data.rowModel.InventarNumber + ", серв.№: " + data.rowModel.ServiceNumber + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet + comment;
            data.discription += parametr;
        }
        if (data.idTemplate === 4) {
            var parametr = "РС: " + data.rowModel.NameSysBlock.NameComputer + ", сер.№: " + data.rowModel.SerNum + ", инв.№: " + data.rowModel.InventarNumSysBlok + ", серв.№:" + data.rowModel.ServiceNum + ",Имя: " + data.rowModel.NameComputer + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet;
            data.discription += parametr;
            data.isUserCreater = true;
        }
        if (new Array(1, 2, 3).some(x => x === data.idTemplate)) {
            var parametr = "РС: " + data.rowModel.NameSysBlock.NameComputer + ", сер.№: " + data.rowModel.SerNum + ", инв.№: " + data.rowModel.InventarNumSysBlok + ", серв.№:" + data.rowModel.ServiceNum + ",Имя: " + data.rowModel.NameComputer + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet;
            data.discription += parametr;
        }
        if (new Array(5, 6, 7).some(x => x === data.idTemplate)) {
            var parametr = "Требуется заменить/заказать тонер картридж для " + data.rowModel.FullModel.NameModel + ", сер.№: " + data.rowModel.ZavNumber + ", инв.№: " + data.rowModel.InventarNumber + ", серв.№: " + data.rowModel.ServiceNumber + ", Kабинет №: " + data.rowModel.Kabinet.NumberKabinet + comment;
            data.discription += parametr;
            data.isUserCreater = true;
        }
        if (new Array(25, 30).some(x => x === data.idTemplate)) {
            var telNum: string;
            var serNumber: string;
            var macAddres: string;
            var ipTelephone: string;
            var infoProblem: string;
            var telephone = data.rowModel.Telephon ? data.rowModel.Telephon : data.rowModel;
            if (telephone.SerNumber) {
                telNum = telephone.Telephon ? telephone.Telephon_ : '';
                serNumber = telephone.SerNumber;
                macAddres = telephone.MacTelephon;
                ipTelephone = telephone.IpTelephon;
            }
            else {
                alert("К пользователю не привязан телефон создание не возможно!!!");
                this.closeDialog();
                return;
            }
            if (data.idTemplate === 25) {
                infoProblem = "Просьба подключить и настроить телефонный аппарат в {Куда} и установить номер " + telNum
            }
            else {
                infoProblem = "Проблема с телефонным аппаратом {Описание проблемы Ip Адрес}";
            }
            var parametr = infoProblem + ", сер.№: " + serNumber + " Mac: " + macAddres + " Ip: " + ipTelephone;
            data.discription += parametr;
        }
        if (new Array(26, 27, 28).some(x => x === data.idTemplate)) {
            var parametr = "\n" + data.rowModel.Name + " , Учетная запись: " + data.rowModel.TabelNumber
            data.discription += parametr;
        }
        if (new Array(23, 24).some(x => x === data.idTemplate)) {
            var parametr = data.rowModel.Name + "," + data.rowModel.TabelNumber;
            data.discription += parametr;
        }
        if (data.idTemplate === 29) {
            var parametr = "Просьба выдать Акт технической экспертизы на списание оборудования: " + data.rowModel.FullModel.NameModel + ", сер.№: " + data.rowModel.ZavNumber + ", инв.№: " + data.rowModel.InventarNumber + ", серв.№: " + data.rowModel.ServiceNumber
            data.discription += parametr;
            data.isUserCreater = true;
        }
    }

    closeDialog(): void {
        this.dialogDataBase.close();
    }
} 