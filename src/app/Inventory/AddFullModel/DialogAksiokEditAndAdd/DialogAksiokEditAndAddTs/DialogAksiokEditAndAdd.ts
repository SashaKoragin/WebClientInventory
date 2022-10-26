import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { EditAndAdd, AuthIdentification } from '../../../../Post RequestService/PostRequest';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AksiokAddAndEdit, KitsEquipment, KitsEquipmentServer, ParametersRequestAksiok, FileExpertise, FileAkt } from '../../../ModelInventory/InventoryModel';
import { ModelAksiok } from '../DialogAksiokModel/DialogAksiokModel';
import { ModelValidation } from '../../ValidationModel/UserValidation';
import { MatTableDataSource } from '@angular/material';
import { async } from 'rxjs/internal/scheduler/async';
import { DragAndDrop } from '../../UploadFilleDragAndDrop/Ts/UploadFilleDragAndDrop';

@Component(({
    selector: 'reportCard',
    templateUrl: '../DialogAksiokEditAndAddHtml/DialogAksiokEditAndAdd.html',
    styleUrls: ['../DialogAksiokEditAndAddCss/DialogAksiokEditAndAdd.css'],
    providers: [EditAndAdd]
}) as any)

export class DialogAksiokEditAndAdd implements OnInit {
    constructor(public editandadd: EditAndAdd, public dialogDataBase: MatDialogRef<DialogAksiokEditAndAdd>,
        @Inject(MAT_DIALOG_DATA) public data: AksiokAddAndEdit, public authService: AuthIdentification) { }


    ///Файл Акта
    public fileAkt: any;
    ///Модель манипулирования внутреней логикой
    @ViewChild('fileReaderAktModel', { static: false }) selectionChild: DragAndDrop;
    ///Файл экспертизы
    public fileExpertise: any;

    private fileReaderAkt = new FileReader();

    private fileReaderExpertise = new FileReader();


    public errorYearOfIssue: string = null;
    public errorExploitationStartYear: string = null;
    //Признак загрузки моделей
    public loadModelServer = true;
    //Признак комплектности
    public isCheckedKits = false;
    //Ошибка
    public kitsError: string = null;

    public displayedColumnsKits = ['IdField', 'SerialNumberField', 'InventoryNumberField', 'IsKitField'];
    public dataSourceKits: MatTableDataSource<KitsEquipmentServer> = new MatTableDataSource<KitsEquipmentServer>();


    ///Валидация
    public modelValid: ModelValidation = new ModelValidation()
    public modelAksiok: ModelAksiok = new ModelAksiok(this.data)

    //Вход в функцию для получения данных
    async ngOnInit() {
        await this.editandadd.selectAllAksiok(this.modelAksiok);
        this.modelAksiok.startModel();
        this.loadModelServer = false;
        this.data.parametersRequestAksiokField = new ParametersRequestAksiok();
    }

    public changed(event: any) {
        if (this.isCheckedKits || this.kitsError !== null) {
            this.isCheckedKits = false;
            this.kitsError = null;
            this.data.kitsEquipmentField = null
            return;
        }
        var kitsEquipment: KitsEquipment = new KitsEquipment();
        kitsEquipment.inventoryNumField = this.data.parametersModelField.inventoryNumField
        //kitsEquipment.inventoryNumField = "101340000001576"
        this.editandadd.validationKitsEquipment(kitsEquipment).toPromise().then((kitsEquipmentServer: KitsEquipment) => {
            this.data.kitsEquipmentField = kitsEquipmentServer;
            if (this.data.kitsEquipmentField.errorServerField === null) {
                this.dataSourceKits.data = this.data.kitsEquipmentField.kitsEquipmentServerField;
                this.isCheckedKits = true;
            }
            else {
                this.kitsError = this.data.kitsEquipmentField.errorServerField;
                this.isCheckedKits = false;
            }
        });
    }

    public async createServerModel() {
        this.data.parametersRequestAksiokField.idTypeField = this.modelAksiok.selectedEquipmentType.Id;
        this.data.parametersRequestAksiokField.idProducerField = this.modelAksiok.selectedProducer.Id;
        this.data.parametersRequestAksiokField.idModelField = this.modelAksiok.selectedEquipmentModel.Id;
        this.data.parametersRequestAksiokField.idStateField = this.modelAksiok.selectedState.Id;
        this.data.parametersRequestAksiokField.idStateStoField = this.modelAksiok.selectedStateSto.Id;
        this.data.parametersRequestAksiokField.idExpertiseField = this.modelAksiok.selectedExpertise.Id;
        this.data.parametersModelField.loginUserField = this.authService.autorization.loginField;
        this.data.parametersModelField.passwordField = this.authService.autorization.passwordField;

    }

    public async loadFileExpertise() {

    }

    public edit(): void {
        if (this.data.parametersModelField.exploitationStartYearField >= this.data.parametersModelField.yearOfIssueField) {
            this.createServerModel();
            this.editandadd.aksiokAddAndEditModel(this.data).toPromise().then((str: string) => {
                alert(str)
            });
        }
        else {
            alert("Не может быть дата эксплуатации быть больше даты ввода!!!");
        }
    }

    ///Перехват события файл Экспертизы
    public addfileExpertis(event: any) {
        if (event) {
            this.fileExpertise = event[0];
            if (this.fileExpertise) {
                this.data.parametersRequestAksiokField.fileExpertiseField = new FileExpertise();
                this.fileReaderExpertise.readAsArrayBuffer(this.fileExpertise);
                this.fileReaderExpertise.onload = async () => {
                    this.data.parametersRequestAksiokField.fileExpertiseField.nameFileField = this.fileExpertise.name;
                    this.data.parametersRequestAksiokField.fileExpertiseField.fileField = this.uint8ArrayToArray(this.fileReaderExpertise.result as ArrayBuffer);
                    this.data.parametersRequestAksiokField.fileExpertiseField.typeFileField = this.fileExpertise.type;
                };
            }
            return;
        }
        this.data.parametersRequestAksiokField.fileExpertiseField = null;
        this.fileExpertise = null
    }


    ///Перехват события на Акта
    public addfileAkt(event: any) {
        if (event) {
            this.fileAkt = event[0];
            var regx = new RegExp(/^(.+_[0-9]{2}.[0-9]{2}.[0-9]{4}_[0-9]{4}.[Aa-zZ]+)$/, 'g')
            if (regx.test(this.fileAkt.name)) {
                if (this.fileAkt) {
                    this.data.parametersRequestAksiokField.fileAktField = new FileAkt();
                    this.fileReaderAkt.readAsArrayBuffer(this.fileAkt);
                    this.fileReaderAkt.onload = async () => {
                        this.data.parametersRequestAksiokField.fileAktField.nameFileField = this.fileAkt.name;
                        this.data.parametersRequestAksiokField.fileAktField.fileField = this.uint8ArrayToArray(this.fileReaderAkt.result as ArrayBuffer);
                        this.data.parametersRequestAksiokField.fileAktField.typeFileField = this.fileAkt.type;
                    };
                }
                return;
            }
            else {
                this.selectionChild.delete();
                alert("Имя файла не соответствует заданному формату (Номер_Дата(через точку)_Инвентарный(последнии 4 цыфры))!!!")
            }
        }
        this.data.parametersRequestAksiokField.fileAktField = null;
        this.fileAkt = null
    }



    public add(): void {
        alert("В процессе реализации!")
    }

    public closeDialog(): void {
        this.dialogDataBase.close();
    }

    ///Конвертация Uint8Array to number[]
    uint8ArrayToArray(uint8Array: ArrayBuffer): number[] {
        var array = [];
        var bytes = new Uint8Array(uint8Array);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            array[i] = bytes[i];
        }
        return array;
    }
}