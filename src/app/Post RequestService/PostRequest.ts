import { SignalR, ISignalRConnection, IConnectionOptions, ConnectionStatus } from 'ng2-signalr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    Users, Autorization, Printer, Kabinet,
    ScanerAndCamer, Mfu, SysBlock, Monitor,
    BlockPower, UsersIsActualsStats, Classification, Rules,
    FullSelectedModel, NameMonitor, FullProizvoditel, Statusing,
    FullModel, CopySave, NameSysBlock, Otdel, Position,
    Telephon, Supply, ModelBlockPower, ProizvoditelBlockPower, Swithe, ModelSwithes, MailIdentifier, MailGroup, AllTechnics, SettingDepartmentCaseToServer, RegulationsDepartment, Producer, EquipmentModel
} from '../Inventory/ModelInventory/InventoryModel';
import { AdressInventarka, ServerHost } from '../AdressGetPost/AdressInventory';
import { deserializeArray } from 'class-transformer';
import { ModelSelect, LogicaSelect } from '../Inventory/AllSelectModel/ParametrModel';
import { DocumentReport } from '../Inventory/AllSelectModel/Report/ReportModel';
import { UploadFile } from '../Inventory/AddFullModel/ModelTable/FileModel';
import { BookModels } from '../Inventory/ModelInventory/ViewInventory';
import { NgxPermissionsService } from 'ngx-permissions';
import { WebMailModel, FullTemplateSupport, ModelParametrSupport, ServerEquipment, ModelSeverEquipment, ManufacturerSeverEquipment, TypeServer, RuleUsers, Token, Organization, SettingDepartmentCaseGetServer, Rb_Holiday, RegulationsDepartmentToServer, ResourceIt, TaskAis3, JournalAis3, AllUsersFilters, OtherAll, ModelOther, TypeOther, ProizvoditelOther, AnalysisEpoAndInventarka, EventProcess, CategoryPhoneHeader, AksiokAddAndEdit, EquipmentType, FullCategories, KitsEquipment, UploadFileAksiok, ParameterEventProcess, SelectDayOfTheWeek, DownloadFileServer } from '../Inventory/ModelInventory/InventoryModel';
import { Router, NavigationExtras } from '@angular/router';
import { ReportCardModel } from '../Inventory/AddFullModel/DialogReportCard/ReportCardModel/ReportCardModel';
import { ModelMemoReport } from '../LKUser/Main/Model/ReportMemo';
import { ModelAksiok } from '../Inventory/AddFullModel/DialogAksiokEditAndAdd/DialogAksiokModel/DialogAksiokModel';


const url: AdressInventarka = new AdressInventarka();
const httpOptionsJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})

export class AuthIdentificationSignalR {

    constructor(public signalR: SignalR) { }

    public iduser: string = null;
    public conect: ISignalRConnection = null;
    public status: ConnectionStatus = null;
    public autorization: AuthIdentification = null;

    createconection(autorizationUsers: AuthIdentification) {
        try {
            this.autorization = autorizationUsers;
            var options: IConnectionOptions =
            {
                hubName: 'SignalRinventory',
                qs: { iduser: autorizationUsers.autorization.idUserField, user: autorizationUsers.autorization.nameField, tabelnumbers: autorizationUsers.autorization.tabelNumberField },
                url: `http://${ServerHost}:8059/signalr`,
                executeErrorsInZone: true,
                executeEventsInZone: true,
                executeStatusChangeInZone: true
                //Можно задать ping интервал
            }
            this.conect = this.signalR.createConnection(options);
            this.statusSubscriSignalR()
        } catch (e) {
            alert(e.toString());
        }
    }


    //Запуск подписи на событие
    async startserverSignalR() {
        if (this.status === null) {
            await this.conect.start();
            this.iduser = this.conect.id
            console.log('Запустили сервер!');
            console.log('Подписались на статус соединения!');
        }
    }

    stopserverSignalR() {

        console.log('Отключили роли!');
        if (new Array('connected', 'disconnected').some(x => x === this.status.name)) {
            console.log('Остановили сервер!');
            console.log('Отписались от статуса соединения!');
            this.conect.stop();
            this.iduser = null;
            this.status = null;
        }
    }

    private statusSubscriSignalR() {
        this.conect.status.subscribe((state: ConnectionStatus) => {
            this.status = state;
            console.log(state.name);
            if (state.name === "disconnected") {
                console.log(this.conect.errors);
                this.stopserverSignalR();
                this.autorization.logoutDisconnect();
                alert("Потеря соединения с сайтом Обновите страницу!!!");
            }
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthIdentification {

    constructor(private http: HttpClient, public router: Router, public permissionsService: NgxPermissionsService) { }

    autorizationLk: Autorization = new Autorization();
    isLoggedInLk = false;
    redirectUrlLk: string;
    loginLk() {
        this.autorizationLk.errorAutorizationField = null;
        return this.http.post(url.autificationInventar, this.autorizationLk, httpOptionsJson);
    }

    logoutLk(): void {
        this.isLoggedInLk = false;
        this.autorizationLk.errorAutorizationField = null;
        this.autorizationLk = new Autorization();
        this.FlushRule();
    }

    ///Добавление ролей
    public AddRuleService(rulesUser: string[]) {
        console.log('Создали соединение!');
        this.permissionsService.addPermission(rulesUser);
        console.log('Подключили роли!');
    }

    //Удаление ролей
    public FlushRule() {
        this.permissionsService.flushPermissions();
    }


    autorization: Autorization = new Autorization();
    isLoggedIn = false;
    redirectUrl: string;

    login() {
        this.autorization.errorAutorizationField = null;
        return this.http.post(url.autificationInventar, this.autorization, httpOptionsJson);
    }

    logout(): void {
        this.isLoggedIn = false;
        this.autorization.errorAutorizationField = null;
        this.autorization = new Autorization();
        this.FlushRule();
    }

    ///Потеря контекста с сайтом
    logoutDisconnect(): void {
        this.isLoggedIn = false;
        this.autorization.errorAutorizationField = null;
        this.autorization = new Autorization();
        let redirect = '/InventoryLogin';
        console.log("Перенаправили на страницу: " + redirect)
        let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };
        this.router.navigate([redirect], navigationExtras);
    }
}

@Injectable({
    providedIn: 'root'
})
export class PostInventar {
    constructor(private http: HttpClient) { }

    public select: FullSelectedModel = new FullSelectedModel();
    ///Актулизация пользователей в БД
    actualusersmodel() {
        return this.http.post(url.actualstatusModel, null, httpOptionsJson);
    }
    //Актулизация Ip Адресов Компьютеров
    actualIpComputers() {
        return this.http.post(url.actualIpAdresComputers, null, httpOptionsJson);
    }
    //Актуализация с PrintServer
    actualPrintServer() {
        return this.http.post(url.actualPrintServer, null, httpOptionsJson);
    }

    ///Детализация модели с сервера со всеми авторами
    public downLoadFileDetal(idFile: number) {
        return this.http.post(url.modelFileDetailing.replace("{idFile}", idFile.toString()), null, httpOptionsJson);
    }

    //Выгрузка файла с сетевого ресурса
    downloadFileServer(idFile: number) {
        return this.http.post(url.downloadFileServer.replace("{idFile}", idFile.toString()), null,
            { responseType: "json", headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async (model: DownloadFileServer) => {
                if (model.fileByteField !== null) {
                    var blob = new Blob([new Uint8Array(model.fileByteField).buffer], { type: model.typeMimeField });
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = model.nameFileField;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    return;
                }
                alert("Файла по данному пути уже нет!!!");
            });
    }

    //Генерация справочника инспекции
    telephonehelp(model: ModelSelect) {
        return this.http.post(url.telephoneHelper, model,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "Телефонный справочник инспекции";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }



    ///Выгрузка умного отчета по сравнению данных с системами
    public downLoadReportFileXlsxSqlView(modelSelect: ModelSelect) {
        this.http.post(url.reportFileXlsxSqlView, modelSelect,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = modelSelect.logicaSelectField.nameReportFileField;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }
    ///Выгрузка умного отчета по сравнению данных техники с системами
    public downLoadReportFileSqlViewTechReport(modelSelect: ModelSelect) {
        this.http.post(url.reportFileSqlViewTechReport, modelSelect,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = modelSelect.logicaSelectField.nameReportFileField;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }

    public downLoadXlsxSql(logicaSelect: LogicaSelect) {
        this.http.post(url.getFileXlsx, logicaSelect,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = logicaSelect.nameReportFileField;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }
    ///Статистика доступности серверов онлайн
    public async statisticServerIsWork() {
        var startProcess = await this.http.post(url.statusServerDataBase, null,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).toPromise().then((model) => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "Статистика доступности";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                return "Выполнено!";
            });
        return startProcess;
    }

    ///Настройки организации для документо-оборота
    async settingOrganization() {
        this.select.Organization = await this.http.get(url.settingOrganization, httpOptionsJson).toPromise().then((model: Organization) => {
            if (model) {
                return model;
            }
        })
    }
    ///Настройка падежей отделов
    async settingDepartamentCase() {
        this.select.SettingDepartmentCaseGetServer = await this.http.get(url.settingDepartmentCase, httpOptionsJson).toPromise().then((model: SettingDepartmentCaseGetServer[]) => {
            if (model) {
                var settingDepartmentCaseGetServer = deserializeArray<SettingDepartmentCaseGetServer>(SettingDepartmentCaseGetServer, model.toString());
                return settingDepartmentCaseGetServer;
            }
        });
    }
    ///Получение справочника категорий телефонов
    async settingCategoryPhoneHeader() {
        this.select.CategoryPhoneHeader = await this.http.get(url.allCategoryPhoneHeader, httpOptionsJson).toPromise().then((model: CategoryPhoneHeader[]) => {
            if (model) {
                var categoryPhoneHeader = deserializeArray<CategoryPhoneHeader>(CategoryPhoneHeader, model.toString());
                return categoryPhoneHeader;
            }
        });
    }

    ///Настройки регламентов отдела
    async settingDepartmentRegulations() {
        this.select.RegulationsDepartment = await this.http.get(url.getDepartmentRegulations, httpOptionsJson).toPromise().then((model: RegulationsDepartment[]) => {
            if (model) {
                var regulationsDepartment = deserializeArray<RegulationsDepartment>(RegulationsDepartment, model.toString());
                return regulationsDepartment;
            }
        })
    }
    ///Загрузка справочника праздничных дней
    async holidayDays() {
        this.select.Rb_Holiday = await this.http.get(url.getholiday, httpOptionsJson).toPromise().then((model: Rb_Holiday[]) => {
            if (model) {
                var holiday = deserializeArray<Rb_Holiday>(Rb_Holiday, model.toString());
                console.log(holiday);
                return holiday;
            }
        })
    }


    ///Выборка всего из БД в всех пользователей
    async alluser(filterActual: AllUsersFilters = new AllUsersFilters()) {
        this.select.Users = await this.http.post(url.alluser, filterActual, httpOptionsJson).toPromise().then((model) => {
            if (model) {
                var users = deserializeArray<Users>(Users, model.toString());
                users.forEach(x => x.Otdel.User = null);
                return users
            }
        });
    }
    ///Все идентификаторы пользователей
    async allmailidentifies() {
        this.select.MailIdentifier = await this.http.get(url.allmailidentifies, httpOptionsJson).toPromise().then((model) => {
            if (model) {
                return deserializeArray<MailIdentifier>(MailIdentifier, model.toString());
            }
        })
    }

    ///Все группы пользователей
    async allmailgroup() {
        this.select.MailGroup = await this.http.get(url.allmailgroups, httpOptionsJson).toPromise().then((model) => {
            if (model) {
                return deserializeArray<MailGroup>(MailGroup, model.toString());
            }
        })
    }

    //Вытащить все отделы из БД
    async allotdel() {
        this.select.Otdels = await this.http.get(url.allotdelget, httpOptionsJson).toPromise().then((model) => {
            if (model) {
                return deserializeArray<Otdel>(Otdel, model.toString());
            }
        });
    }
    //Вытащить все должностя из БД
    async allposition() {
        this.select.Position = await this.http.get(url.allposition, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Position>(Position, model.toString());
            }
        });
    }

    async allrule() {
        this.select.Rule = await this.http.get(url.allrule, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Rules>(Rules, model.toString());
            }
        })
    }

    //Запрос на все принтера
    async allprinters() {
        this.select.Printer = await this.http.get(url.allprinters, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Printer>(Printer, model.toString())
            }
        });
    }
    //Запрос на все сканеры
    async allscaners() {
        this.select.Scaner = await this.http.get(url.allscaners, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ScanerAndCamer>(ScanerAndCamer, model.toString())
            }
        });;
    }
    //Запрос на все мфу
    async allmfu() {
        this.select.Mfu = await this.http.get(url.allmfu, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Mfu>(Mfu, model.toString())
            }
        });
    }
    //Запрос на получение разного
    async allOtherAll() {
        this.select.OtherAll = await this.http.get(url.allOtherAll, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<OtherAll>(OtherAll, model.toString())
            }
        });
    }
    //Запрос на получение моделей разного
    async allModelOther() {
        this.select.ModelOther = await this.http.get(url.allModelOther, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ModelOther>(ModelOther, model.toString())
            }
        });
    }
    //Запрос на получение моделей разного
    async allTypeOther() {
        this.select.TypeOther = await this.http.get(url.allTypeOther, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<TypeOther>(TypeOther, model.toString())
            }
        });
    }
    //Запрос на получение моделей разного
    async allProizvoditelOther() {
        this.select.ProizvoditelOther = await this.http.get(url.allProizvoditelOther, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ProizvoditelOther>(ProizvoditelOther, model.toString())
            }
        });
    }
    //Запрос на все системные блоки
    async allsysblok() {
        this.select.SysBlok = await this.http.get(url.allsysblock, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<SysBlock>(SysBlock, model.toString());
            }
        });
    }
    //Получить всю класификацию
    async allclassification() {
        this.select.Classification = await this.http.get(url.allclasification, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Classification>(Classification, model.toString());
            }
        })
    }

    //Запрос на все мониторы
    async allmonitor() {
        this.select.Monitors = await this.http.get(url.allmonitor, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Monitor>(Monitor, model.toString())
            }
        });
    }
    //Запрос на все copySave
    async allcopysave() {
        this.select.CopySave = await this.http.get(url.allcopysave, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<CopySave>(CopySave, model.toString());
            }
        });
    }
    //Запрос на все производители принтеров
    async allproizvoditel() {
        this.select.Proizvoditel = await this.http.get(url.allproizvoditel, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<FullProizvoditel>(FullProizvoditel, model.toString());
            }
        });
    }
    //Запрос на все модели принтеров
    async allmodel() {
        this.select.Model = await this.http.get(url.allmodel, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<FullModel>(FullModel, model.toString());
            }
        });
    }
    //Запрос на все кабинеты
    async allkabinet() {
        this.select.Kabinet = await this.http.get(url.allkabinet, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Kabinet>(Kabinet, model.toString());
            }
        });
    }
    //Запрос на все статусы
    async allstatysing() {
        this.select.Statusing = await this.http.get(url.allstatusing, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Statusing>(Statusing, model.toString());
            }
        });
    }
    //Запрос на все модели системных блоков
    async allnamesysblok() {
        this.select.ModelSysBlok = await this.http.get(url.allnamesysblok, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<NameSysBlock>(NameSysBlock, model.toString());
            }
        });
    }
    ///Получение ресурсов для заявки
    async allResourceIt() {
        this.select.ResourceIt = await this.http.get(url.getResourceIt, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ResourceIt>(ResourceIt, model.toString())
            }
        });
    }
    ///Получение задач для заявки
    async allTaskAis3() {
        this.select.TaskAis3 = await this.http.get(url.getTaskAis3, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<TaskAis3>(TaskAis3, model.toString())
            }
        });
    }
    ///Получение журнала заявок реестр
    async allJournalAis3() {
        this.select.JournalAis3 = await this.http.get(url.getJournalAis3, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<JournalAis3>(JournalAis3, model.toString());
            }
        })
    }

    //Запрос на все модели мониторов
    async allnamemonitor() {
        this.select.NameMonitors = await this.http.get(url.allnamemonitor, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<NameMonitor>(NameMonitor, model.toString())
            }
        });
    }
    async alltelephone() {
        this.select.Telephon = await this.http.get(url.alltelephon, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Telephon>(Telephon, model.toString())
            }
        });
    }

    async allblockpower() {
        this.select.BlockPower = await this.http.get(url.allblockpower, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<BlockPower>(BlockPower, model.toString())
            }
        });
    }
    async allsupply() {
        this.select.Supply = await this.http.get(url.allsupply, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Supply>(Supply, model.toString())
            }
        });
    }
    ///Все модели комутаторов
    async allmodelswithes() {
        this.select.ModelSwithe = await this.http.get(url.allmodelswithes, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ModelSwithes>(ModelSwithes, model.toString());
            }
        })
    }
    ///Все коммутаторы
    async allswithes() {
        this.select.Swithes = await this.http.get(url.allswithes, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Swithe>(Swithe, model.toString());
            }
        })
    }

    async allmodelblockpower() {
        this.select.ModelBlockPower = await this.http.get(url.allmodelblockpower, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ModelBlockPower>(ModelBlockPower, model.toString())
            }
        });
    }
    //Статистика процедуры
    async allstatisticsusers() {
        this.select.UsersIsActualsStats = await this.http.get(url.allstatistics, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<UsersIsActualsStats>(UsersIsActualsStats, model.toString())
            }
        })
    }

    async allproizvoditelblockpower() {
        this.select.ProizvoditelBlockPower = await this.http.get(url.allproizvoditelblockpower, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ProizvoditelBlockPower>(ProizvoditelBlockPower, model.toString())
            }
        });
    }

    async allTemplate() {
        this.select.FullTemplateSupport = await this.http.get(url.allTemplateSupport, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<FullTemplateSupport>(FullTemplateSupport, model.toString());
            }
        })
    }
    ///Выгрузка токенов
    async allToken() {
        this.select.Token = await this.http.get(url.alltoken, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Token>(Token, model.toString());
            }
        })
    }

    async allServerEquipment() {
        this.select.ServerEquipment = await this.http.get(url.allServerEquipment, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ServerEquipment>(ServerEquipment, model.toString());
            }
        })
    }

    async allModelSeverEquipment() {
        this.select.ModelSeverEquipment = await this.http.get(url.allModelSeverEquipment, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ModelSeverEquipment>(ModelSeverEquipment, model.toString());
            }
        })
    }

    async allManufacturerSeverEquipment() {
        this.select.ManufacturerSeverEquipment = await this.http.get(url.allManufacturerSeverEquipment, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<ManufacturerSeverEquipment>(ManufacturerSeverEquipment, model.toString());
            }
        })
    }
    ///Все типы серверов
    async allTypeServer() {
        this.select.TypeServer = await this.http.get(url.allTypeServer, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<TypeServer>(TypeServer, model.toString());
            }
        })
    }
    ///Все процесса
    async allEventProcess() {
        this.select.EventProcess = await this.http.get(url.allEventProcess, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<EventProcess>(EventProcess, model.toString());
            }
        });
    }
    ///Расписание процесса дни
    async allDayOfTheWeekProcess() {
        this.select.SelectDayOfTheWeek = await this.http.get(url.allDayOfTheWeekProcess, httpOptionsJson).toPromise().then((model) => {
            if (model) {
                return deserializeArray<SelectDayOfTheWeek>(SelectDayOfTheWeek, model.toString());
            }
        });


    }

    ///Все параметры для процеса
    async allParametersProcess(idProcess: number) {
        this.select.ParameterEventProcess = await this.http.get(url.allEventProcessParameters.replace("{idProcess}", idProcess.toString()), httpOptionsJson).toPromise().then((model) => {
            if (model) {
                return deserializeArray<ParameterEventProcess>(ParameterEventProcess, model.toString());
            }
        });
    }

    ///Вся техника на ЛК по людям и отделам
    public async allTechnics(idUser: number) {
        this.select.AllTechnics = await this.http.get(url.allTechnicsLk.replace("{idUser}", idUser.toString()), httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<AllTechnics>(AllTechnics, model.toString());
            }
        });
    }

    public async allUsersDepartmentLk(idUser: number) {
        this.select.Users = await this.http.get(url.allUsersDepartmentLk.replace("{idUser}", idUser.toString()), httpOptionsJson).toPromise().then((model) => {
            if (model) {
                var users = deserializeArray<Users>(Users, model.toString());
                users.forEach(x => x.Otdel.User = null);
                return users
            }
        });
    }

    ///Все запросы для заполнение данных по технике после актулизации пользователей
    public async fullusers() {
        await this.alluser();
        await this.allposition();
        await this.allotdel();
        await this.alltelephone();
        await this.allstatisticsusers();
        await this.allkabinet();
        await this.allstatysing();
        await this.allsupply();
    }
}

@Injectable()
export class EditAndAdd {
    constructor(private http: HttpClient) { }

    ///Проверка по УН запущен ли процесс или нет
    public isBeginTask(idTask: number) {
        return this.http.get(url.isBeginTask.replace("{idTask}", idTask.toString()), httpOptionsJson)
    }
    ///Проверка модели на возможность внесения или редактирования АКСИОК
    validationModelAksiok(aksiokAddAndEdit: AksiokAddAndEdit) {
        return this.http.post(url.aksiokAddAndEditModelValidation, aksiokAddAndEdit, httpOptionsJson);
    }
    ///Выгрузка файла с сервера АКСИОК
    uploadFileAksiok(aksiokAddAndEdit: AksiokAddAndEdit) {
        this.http.post(url.uploadFileAksiok, aksiokAddAndEdit, httpOptionsJson).subscribe(async (uploadFile: UploadFileAksiok) => {
            if (uploadFile) {
                console.log(uploadFile);
                var blob = new Blob([new Uint8Array(uploadFile.fileField).buffer], { type: uploadFile.typeFileField });
                new Blob()
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = uploadFile.nameFileField;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }
            else {
                alert("Отсутствует файл для выгрузки!!!")
            }
        });
        ;
    }
    ///Проверка на комплектность оборудования
    validationKitsEquipment(kitsEquipment: KitsEquipment) {
        return this.http.post(url.kitsEquipmentValidation, kitsEquipment, httpOptionsJson);
    }
    ///Получить все типы АКСИОК
    async selectAllAksiok(modelAksiok: ModelAksiok) {
        modelAksiok.equipmentType = await this.http.get(url.selectAllEquipmentType, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<EquipmentType>(EquipmentType, model.toString())
            }
        });
        modelAksiok.producer = await this.http.get(url.selectAllProducer, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<Producer>(Producer, model.toString())
            }
        });
        modelAksiok.equipmentModel = await this.http.get(url.selectAllEquipmentModel, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<EquipmentModel>(EquipmentModel, model.toString())
            }
        });
        modelAksiok.fullCategories = await this.http.get(url.selectAllFullСategories, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<FullCategories>(FullCategories, model.toString())
            }
        });
    }
    ///Функция Api добавления или редактирования Модели
    aksiokAddAndEditModel(aksiokAddAndEdit: AksiokAddAndEdit) {
        return this.http.post(url.aksiokAddAndEditModel, aksiokAddAndEdit, httpOptionsJson);
    }

    ///Редактирование глобальных настроек приложения для документо-оборота
    addandeditorganization(organization: Organization, userIdEdit: string) {
        return this.http.post(url.addAndEditOrganization.concat(userIdEdit), organization, httpOptionsJson);
    }
    ///Редактирование глобальных настроек падежи отделов
    addandeditsettingdepartmentcase(settingDepartmentCase: SettingDepartmentCaseToServer, userIdEdit: string) {
        return this.http.post(url.addAndEditSettingDepartmentCase.concat(userIdEdit), settingDepartmentCase, httpOptionsJson);
    }
    ///Редактирование или добавление регламента отдела
    addandeditRegulationsDepartment(regulationsDepartmentToServer: RegulationsDepartmentToServer, userIdEdit: string) {
        return this.http.post(url.addAndEditSettingDepartmentRegulations.concat(userIdEdit), regulationsDepartmentToServer, httpOptionsJson);
    }
    ///Добавление или редактирование Праздничных дней
    addandeditHolyday(holiday: Rb_Holiday, userIdEdit: string) {
        return this.http.post(url.addAndEditHoliday.concat(userIdEdit), holiday, httpOptionsJson);
    }
    ///Обновление или добавление Users
    addandedituser(user: Users, userIdEdit: string) {
        return this.http.post(url.addandedituser.concat(userIdEdit), user, httpOptionsJson);
    }
    ///Добабление или обновление принтеров
    addandeditprinter(printer: Printer, userIdEdit: string) {
        return this.http.post(url.addandeditprinter.concat(userIdEdit), printer, httpOptionsJson);
    }
    ///Добабление или обновление Коммутаторов
    addandeditswitch(switchs: Swithe, userIdEdit: string) {
        return this.http.post(url.addandeditswitch.concat(userIdEdit), switchs, httpOptionsJson);
    }
    ///Добабление или обновление сканера
    addandeditscaner(scaner: ScanerAndCamer, userIdEdit: string) {
        return this.http.post(url.addandeditscaner.concat(userIdEdit), scaner, httpOptionsJson);
    }
    ///Добабление или обновление мфу
    addandeditmfu(mfu: Mfu, userIdEdit: string) {
        return this.http.post(url.addandeditmfu.concat(userIdEdit), mfu, httpOptionsJson);
    }
    ///Добабление или обновление системного блока
    addandeditsysblok(sysblock: SysBlock, userIdEdit: string) {
        return this.http.post(url.addandeditsysblock.concat(userIdEdit), sysblock, httpOptionsJson);
    }
    ///Добабление или обновление монитора
    addandeditmonitor(monutor: Monitor, userIdEdit: string) {
        return this.http.post(url.addandeditmonitor.concat(userIdEdit), monutor, httpOptionsJson);
    }
    ///Редактирование или добавление отдела
    addandeditotdel(otdel: Otdel) {
        return this.http.post(url.addandeditotdel, otdel, httpOptionsJson);
    }
    ///Редактирование или добавление телефонов
    addandedittelephon(telephon: Telephon, userIdEdit: string) {
        return this.http.post(url.addandedittelephon.concat(userIdEdit), telephon, httpOptionsJson);
    }
    ///Редактирование или добавление ИБП
    addandeditblockpower(blockpower: BlockPower, userIdEdit: string) {
        return this.http.post(url.addandeditblockpower.concat(userIdEdit), blockpower, httpOptionsJson);
    }
    ///Редактирование или добавление Сервисного оборудования
    addAndEditServerEquipment(nameServerEquipment: ServerEquipment, userIdEdit: string) {
        return this.http.post(url.addAndEditServerEquipment.concat(userIdEdit), nameServerEquipment, httpOptionsJson);
    }
    ///Редактирование или добавление Сервисного оборудования
    addAndEditToken(nameToken: Token, userIdEdit: string) {
        return this.http.post(url.addandeditToken.concat(userIdEdit), nameToken, httpOptionsJson);
    }
    ///Редактирование или добавление Наименование системного блока
    addAndEditNameSysBlock(nameSysBlock: NameSysBlock) {
        return this.http.post(url.addAndEditNameSysBlock, nameSysBlock, httpOptionsJson);
    }
    ///Редактирование или добавление Наименование монитора
    addAndEditNameMonitor(nameMonitor: NameMonitor) {
        return this.http.post(url.addAndEditNameMonitor, nameMonitor, httpOptionsJson);
    }
    ///Редактирование или добавление Наименование модели ИБП
    addAndEditNameModelBlokPower(nameModelBlokPower: ModelBlockPower) {
        return this.http.post(url.addAndEditNameModelBlokPower, nameModelBlokPower, httpOptionsJson);
    }
    ///Добавление ресурса для заявок
    addAndEditResourceIt(resourceIt: ResourceIt) {
        return this.http.post(url.addAndEditResourceIt, resourceIt, httpOptionsJson);
    }
    ///Добавление ресурса для заявок
    addAndEditTaskAis3(taskAis3: TaskAis3) {
        return this.http.post(url.addAndEditTaskAis3, taskAis3, httpOptionsJson);
    }
    ///Добавление записи о доступе для реестра
    addAndEditJournalAis3(journal: JournalAis3) {
        return this.http.post(url.addAndEditJournalAis3, journal, httpOptionsJson);
    }
    ///Редактирование или добавление Наименование производителя ИБП
    addAndEditNameProizvoditelBlockPower(nameProizvoditelBlockPower: ProizvoditelBlockPower) {
        return this.http.post(url.addAndEditNameProizvoditelBlockPower, nameProizvoditelBlockPower, httpOptionsJson);
    }
    ///Редактирование или добавление Наименование партии
    addAndEditNameSupplys(nameSupply: Supply) {
        return this.http.post(url.addAndEditNameSupply, nameSupply, httpOptionsJson);
    }
    ///Редактирование или добавление Наименование статуса
    addAndEditNameStatus(nameStatusing: Statusing) {
        return this.http.post(url.addAndEditNameStatus, nameStatusing, httpOptionsJson);
    }

    ///Редактирование или добавление Номера кабинета
    addAndEditNameKabinet(nameKabinet: Kabinet) {
        return this.http.post(url.addAndEditNameKabinet, nameKabinet, httpOptionsJson);
    }
    ///Редактирование или добавление модели принтера (МФУ)
    addAndEditNameFullModel(nameFullModel: FullModel) {
        return this.http.post(url.addAndEditNameFullModel, nameFullModel, httpOptionsJson);
    }
    ///Редактирование или добавление классификации принтера (МФУ)
    addAndEditNameClassification(nameClassification: Classification) {
        return this.http.post(url.addAndEditNameClassification, nameClassification, httpOptionsJson);
    }
    ///Редактирование или добавление производителя принтера (МФУ)
    addAndEditNameFullProizvoditel(nameFullProizvoditel: FullProizvoditel) {
        return this.http.post(url.addAndEditNameFullProizvoditel, nameFullProizvoditel, httpOptionsJson);
    }
    ///Редактирование или добавление CopySave
    addAndEditNameCopySave(nameCopySave: CopySave) {
        return this.http.post(url.addAndEditNameCopySave, nameCopySave, httpOptionsJson);
    }
    ///Редактирование или добавление ModelSwithe
    addAndEditModelSwitch(nameModelSwitch: ModelSwithes) {
        return this.http.post(url.addandeditmodelswith, nameModelSwitch, httpOptionsJson);
    }
    ///Редактирование или добавление моделей серверов
    addAndEditModelSeverEquipment(nameModelSeverEquipment: ModelSeverEquipment) {
        return this.http.post(url.addAndEditModelSeverEquipment, nameModelSeverEquipment, httpOptionsJson);
    }


    ///Редактирование или добавление типа серверного оборудования
    addAndEditTypeServer(nameTypeServer: TypeServer) {
        return this.http.post(url.addAndEditTypeServer, nameTypeServer, httpOptionsJson);
    }
    ///Редактирование или добавление производитеолей серверов
    addAndEditManufacturerSeverEquipment(nameManufacturerSeverEquipment: ManufacturerSeverEquipment) {
        return this.http.post(url.addAndEditManufacturerSeverEquipment, nameManufacturerSeverEquipment, httpOptionsJson);
    }
    ///Добавление или редактирования категории телефона
    addAndEditCategoryPhoneHeader(nameCategoryPhoneHeader: CategoryPhoneHeader) {
        return this.http.post(url.addAndEditCategoryPhoneHeader, nameCategoryPhoneHeader, httpOptionsJson);
    }
    ///Только редактирование идентификатора и группы
    editModelMailIdentifier(nameMailIdentifier: MailIdentifier) {
        return this.http.post(url.addAndEditMailIdentifies, nameMailIdentifier, httpOptionsJson);
    }
    //Добавление редактирование Группы
    editModelMailGroup(nameMailGroup: MailGroup) {
        return this.http.post(url.addAndEditMailGroups, nameMailGroup, httpOptionsJson);
    }
    ///Удаление ошибочных праздничных дней
    deleteErrorHoliday(model: Rb_Holiday, userIdEdit: string) {
        return this.http.post(url.deleteHoliday.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление Пользователя
    deleteUser(model: Users, userIdEdit: string) {
        return this.http.post(url.deleteUser.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление Системных блоков
    deleteSysBlock(model: SysBlock, userIdEdit: string) {
        return this.http.post(url.deleteSysBlock.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление мониторов
    deleteMonitor(model: Monitor, userIdEdit: string) {
        return this.http.post(url.deleteMonitor.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление принтеров
    deletePrinter(model: Printer, userIdEdit: string) {
        return this.http.post(url.deletePrinter.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление сканера или камеры
    deleteScannerAndCamera(model: ScanerAndCamer, userIdEdit: string) {
        return this.http.post(url.deleteScannerAndCamera.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление МФУ
    deleteMfu(model: Mfu, userIdEdit: string) {
        return this.http.post(url.deleteMfu.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление ИБП
    deleteBlockPower(model: BlockPower, userIdEdit: string) {
        return this.http.post(url.deleteBlockPower.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление Сервисного оборудования
    deleteServerEquipment(model: ServerEquipment, userIdEdit: string) {
        return this.http.post(url.deleteServerEquipment.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление Сервисного оборудования
    deleteToken(model: Token, userIdEdit: string) {
        return this.http.post(url.deleteToken.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление коммутаторов
    deleteSwitch(model: Swithe, userIdEdit: string) {
        return this.http.post(url.deleteSwitch.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление телефонов
    deleteTelephone(model: Telephon, userIdEdit: string) {
        return this.http.post(url.deleteTelephone.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Добавление или удаления ролей пользователя
    addandDeleteRuleUser(model: RuleUsers) {
        return this.http.post(url.allAddandDeleteRuleUser, model, httpOptionsJson);
    }

    ///Добавление или редактирование Разное
    addAndEditOtherAll(model: OtherAll, userIdEdit: string) {
        return this.http.post(url.addAndEditOtherAll.concat(userIdEdit), model, httpOptionsJson);
    }
    ///Удаление модели Разного
    deleteOtherAll(model: OtherAll, userIdEdit: string) {
        return this.http.post(url.deleteOtherAll.concat(userIdEdit), model, httpOptionsJson);
    }

    ///Добавление или редактирование моделей разного
    addAndEditModelOther(model: ModelOther) {
        return this.http.post(url.addAndEditModelOther, model, httpOptionsJson);
    }
    ///Добавление или редактирование типов разного
    addAndEditTypeOther(model: TypeOther) {
        return this.http.post(url.addAndEditTypeOther, model, httpOptionsJson);
    }
    ///Добавление или редактирование типов разного
    addAndEditProizvoditelOther(model: ProizvoditelOther) {
        return this.http.post(url.addAndEditProizvoditelOther, model, httpOptionsJson);
    }

    ///Добавление или сохранение модели параметров
    addAndEditEventProcess(model: EventProcess) {
        return this.http.post(url.addAndEditEventProcess, model, httpOptionsJson)
    }
    ///Редактирование для параметров
    editParameterEventProcess(model: ParameterEventProcess) {
        return this.http.post(url.editParameterEventProcess, model, httpOptionsJson)
    }
    ///Создание заявки на СТО
    createSupport(modelParametrSupport: ModelParametrSupport) {
        return this.http.post(url.serviceSupport, modelParametrSupport, httpOptionsJson);
    }

    //Роли и пользователи по id
    ruleAndUsers(idUser: number) {
        return this.http.get(url.allRuleUser.replace("{idUser}", idUser.toString()))
    }


    ///Генерация QR Code для техники
    createQRCode(serialNumber: string, isAll: boolean) {
        this.http.post(url.generateQrCode.replace("{serialNumber}", serialNumber).replace("{isAll}", String(isAll)), null,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "QR Code Technical";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }

    createQRCodeOffice(numberOffice: string, isAll: boolean) {
        this.http.post(url.generateQrCodeOffice.replace("{numberOffice}", numberOffice).replace("{isAll}", String(isAll)), null,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
                var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "QR Code Office";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }
    ///Формирования актов списания
    createAct(modelSelect: ModelSelect, numberInv: string) {
        this.http.post(url.act, modelSelect, { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `Акт списания - ${numberInv}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
    ///Формирование журнала для АИС 3
    createJournal(year: string, idOtdel: number, isAllJournal: boolean = false) {
        this.http.get(url.createJournalAis3.replace("{year}", year).replace("{idOtdel}", idOtdel.toString()).replace("{isAllJournal}", isAllJournal.toString()), { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `Журнал АИС 3 за - ${year} год`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
    ///Генерация табелей
    createReportCard(model: ReportCardModel) {
        return this.http.post(url.createReportCard, model, { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }

    ///Создание служебных записок на отдел
    createMemoReport(nameUser: string, modelMemo: ModelMemoReport) {
        this.http.post(url.createMemoReport, modelMemo, { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `${modelMemo.selectParameterDocumentField.nameDocumentField} на ${nameUser}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}

@Injectable()
export class SelectAllParametrs {
    constructor(private http: HttpClient) { }

    addselectallparametrs(model: ModelSelect) {
        return this.http.post(url.selectparametr, model, httpOptionsJson);
    }

    selectusersql(model: LogicaSelect) {
        return this.http.post(url.selectxml, model, httpOptionsJson);
    }

    public deletedocument(iddocument: number) {
        return this.http.post(url.deletedocument, iddocument, httpOptionsJson)
    }

    public selectdocument(iddocument: number) {
        return this.http.post(url.selectdocument, iddocument,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    public selectbook(idbook: number) {
        return this.http.post(url.selectbook, idbook,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    public generatebook(bookModels: BookModels) {
        return this.http.post(url.bookModels, bookModels,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    public generatedocument(modeldoc: DocumentReport) {
        return this.http.post(url.generatedocument, modeldoc,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    public addfiledb(upload: UploadFile) {
        return this.http.post(url.addfiledb, upload, httpOptionsJson);
    }
    ///Просмотр Body Письма
    public visibilityBodyMail(modelMail: WebMailModel) {
        return this.http.post(url.visibilityBodyMail, modelMail, httpOptionsJson);
    }
    ///Вложение письма
    public async outputMail(modelMail: WebMailModel) {
        var blob = await this.http.post(url.outputMail, modelMail,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).toPromise().then(data => {
                var blob = new Blob([data], { type: 'application/zip' });
                return blob;
            });
        return blob;
    }
    ///Удаление письма
    public deleteMail(modelMail: WebMailModel) {
        return this.http.post(url.deleteMail, modelMail, httpOptionsJson);
    }
    ///Снятие статуса 
    public isCheckStatusNull(row: any) {
        return this.http.post(url.isCheckStatusNull, row, httpOptionsJson);
    }

    ///Проверка по УН запущен ли процесс или нет
    public isBeginTask(idTask: number) {
        return this.http.get(url.isBeginTask.replace("{idTask}", idTask.toString()), httpOptionsJson)
    }

    ///Запуск любого процесса на сервере
    public startProcessInventory(idProcess: number, userLogin: string = null, passwordUser: string = null) {
        this.http.post(url.startProcess.replace("{idProcess}", idProcess.toString()).replace("{userLogin}", userLogin).replace("{passwordUser}", passwordUser), null, httpOptionsJson).toPromise().then();
    }

    ///Получение отчетов по ЭПО всех
    public async selectAllReportEpo() {
        return await this.http.get(url.getModelReportAnalysisEpo, httpOptionsJson).toPromise().then(model => {
            if (model) {
                return deserializeArray<AnalysisEpoAndInventarka>(AnalysisEpoAndInventarka, model.toString())
            }
        });
    }
    ///Вытащить дополнительные характеристики объекта АКСИОК
    public async selectModelCharacteristicJson(idModel: number) {
        return await this.http.get(url.selectModelCharacteristicJson.replace("{idModel}", idModel.toString())).toPromise()
    }

    //Все отчеты по ЭПО с Инвенторизацией
    public allReportEpoAndInventory(idArrayReport: number[]) {
        this.http.post(url.allReportEpoAndInventory, idArrayReport, { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async model => {
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `Отчеты ЭПО`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}