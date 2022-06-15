//export const ServerHost: string = 'I7751-APP127';  //localhost
export const ServerHost: string = 'localhost'
export const ServerPort: string = '8182';
//К примеру новая структура
//http://I7751-W40204180:8182/Inventarka/AllRules
export class AdressInventarka {
    public autificationInventar = `http://${ServerHost}:${ServerPort}/Inventarka/Authorization`;
    public alluser = `http://${ServerHost}:${ServerPort}/Inventarka/AllUsers`;

    public allrule = `http://${ServerHost}:${ServerPort}/Inventarka/AllRules`;
    public allotdelget = `http://${ServerHost}:${ServerPort}/Inventarka/AllOtdels`;
    public addandedituser = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditUser?userIdEdit=`;
    public addandeditprinter = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditPrinter?userIdEdit=`;
    public addandeditscaner = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditScaner?userIdEdit=`;
    public addandeditmfu = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditMfu?userIdEdit=`;
    public addandeditsysblock = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditSysBlok?userIdEdit=`;
    public addandeditmonitor = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditMonitor?userIdEdit=`;
    public addandeditotdel = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditOtdel`;
    public addandedittelephon = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditTelephone?userIdEdit=`;
    public addandeditblockpower = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditBlockPower?userIdEdit=`;
    public addandeditswitch = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditSwith?userIdEdit=`;
    public addandeditToken = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditToken?userIdEdit=`
    public addandeditmodelswith = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditModelSwith`;

    public allmodelswithes = `http://${ServerHost}:${ServerPort}/Inventarka/AllModelSwithes`;
    public allswithes = `http://${ServerHost}:${ServerPort}/Inventarka/AllSwithes`;
    public allstatistics = `http://${ServerHost}:${ServerPort}/Inventarka/AllActualsProcedureUsers`;
    public allsysblock = `http://${ServerHost}:${ServerPort}/Inventarka/AllSysBlok`;
    public allmonitor = `http://${ServerHost}:${ServerPort}/Inventarka/AllMonitors`;
    public allmfu = `http://${ServerHost}:${ServerPort}/Inventarka/AllMfu`;
    public allcopysave = `http://${ServerHost}:${ServerPort}/Inventarka/AllCopySave`;
    public allposition = `http://${ServerHost}:${ServerPort}/Inventarka/AllPosition`;
    public allprinters = `http://${ServerHost}:${ServerPort}/Inventarka/AllPrinters`;
    public allscaners = `http://${ServerHost}:${ServerPort}/Inventarka/AllScaners`;
    public allproizvoditel = `http://${ServerHost}:${ServerPort}/Inventarka/AllProizvoditel`;
    public allmodel = `http://${ServerHost}:${ServerPort}/Inventarka/AllModel`;
    public allkabinet = `http://${ServerHost}:${ServerPort}/Inventarka/AllKabinet`;
    public allstatusing = `http://${ServerHost}:${ServerPort}/Inventarka/AllStatusing`;
    public allnamesysblok = `http://${ServerHost}:${ServerPort}/Inventarka/AllNameSysBlock`;
    public allnamemonitor = `http://${ServerHost}:${ServerPort}/Inventarka/AllNameMonitor`;
    public alltelephon = `http://${ServerHost}:${ServerPort}/Inventarka/AllTelephon`;
    public allblockpower = `http://${ServerHost}:${ServerPort}/Inventarka/AllBlockPower`;
    public allsupply = `http://${ServerHost}:${ServerPort}/Inventarka/AllSupply`;
    public allmodelblockpower = `http://${ServerHost}:${ServerPort}/Inventarka/AllModelBlockPower`;
    public allproizvoditelblockpower = `http://${ServerHost}:${ServerPort}/Inventarka/AllProizvoditelBlockPower`;
    public allclasification = `http://${ServerHost}:${ServerPort}/Inventarka/AllClasification`;
    public allmailidentifies = `http://${ServerHost}:${ServerPort}/Inventarka/AllMailIdentifies`;
    public allmailgroups = `http://${ServerHost}:${ServerPort}/Inventarka/AllMailGroups`;
    public alltoken = `http://${ServerHost}:${ServerPort}/Inventarka/AllToken`;

    public selectparametr = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateSqlSelect`;
    public selectxml = `http://${ServerHost}:${ServerPort}/Inventarka/SelectXml`;

    public deletedocument = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteDocument`;

    public generatedocument = `http://${ServerHost}:${ServerPort}/Inventarka/Invoice`;
    public addfiledb = `http://${ServerHost}:${ServerPort}/Inventarka/AddFileDb`;
    public selectdocument = `http://${ServerHost}:${ServerPort}/Inventarka/LoadDocument`;
    public selectbook = `http://${ServerHost}:${ServerPort}/Inventarka/LoadBook`;

    public actualIpAdresComputers = `http://${ServerHost}:${ServerPort}/Inventarka/ActualComputerIp`;
    public actualPrintServer = `http://${ServerHost}:${ServerPort}/Inventarka/ActualPrintServer`;
    public actualstatusModel = `http://${ServerHost}:${ServerPort}/Inventarka/ActualUsers`;
    public telephoneHelper = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateTelephoneHelper`;
    public bookModels = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateBookAccounting`;
    ///Вспомогательные таблицы маршруты к ним

    public addAndEditNameSysBlock = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameSysBlock`;
    public addAndEditNameMonitor = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameMonitor`;
    public addAndEditNameModelBlokPower = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameModelBlokPower`;
    public addAndEditNameProizvoditelBlockPower = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameProizvoditelBlockPower`;
    public addAndEditNameSupply = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameSupply`;
    public addAndEditNameStatus = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameStatus`;
    public addAndEditNameKabinet = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameKabinet`;
    public addAndEditNameFullModel = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameFullModel`;
    public addAndEditNameClassification = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameClassification`;
    public addAndEditNameFullProizvoditel = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameFullProizvoditel`;
    public addAndEditNameCopySave = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameCopySave`;

    public addAndEditMailIdentifies = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditMailIdentifies`;
    public addAndEditMailGroups = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditMailGroups`;

    ///Получение файла по POST запросу параметр int для выбора View
    public getFileXlsx = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateFileXlsxSqlView`;

    ///Удаление записей
    public deleteUser = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteUser?userIdEdit=`;
    public deleteSysBlock = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteSysBlock?userIdEdit=`;
    public deleteMonitor = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteMonitor?userIdEdit=`;
    public deletePrinter = `http://${ServerHost}:${ServerPort}/Inventarka/DeletePrinter?userIdEdit=`;
    public deleteScannerAndCamera = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteScannerAndCamera?userIdEdit=`;
    public deleteMfu = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteMfu?userIdEdit=`;
    public deleteBlockPower = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteBlockPower?userIdEdit=`;
    public deleteSwitch = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteSwitch?userIdEdit=`;
    public deleteTelephone = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteTelephone?userIdEdit=`;
    public deleteToken = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteToken?userIdEdit=`;

    ///Серверное оборудование 
    public allServerEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/AllServerEquipment`;
    public allModelSeverEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/AllModelSeverEquipment`;
    public allManufacturerSeverEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/AllManufacturerSeverEquipment`;
    public allTypeServer = `http://${ServerHost}:${ServerPort}/Inventarka/AllTypeServer`;

    //Редактирование серверного оборудования
    public addAndEditServerEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditServerEquipment?userIdEdit=`;
    public addAndEditModelSeverEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditModelSeverEquipment`;
    public addAndEditManufacturerSeverEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditManufacturerSeverEquipment`;
    public addAndEditTypeServer = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditTypeServer`;
    //Удаление серверного оборудования
    public deleteServerEquipment = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteServerEquipment?userIdEdit=`;

    ///Работа с почтой Mail
    public visibilityBodyMail = `http://${ServerHost}:${ServerPort}/Inventarka/VisibilityBodyMail`;
    public outputMail = `http://${ServerHost}:${ServerPort}/Inventarka/OutputMail`;
    public deleteMail = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteMail`;

    ///Работа с СТО support.tax.nalog.ru
    public allTemplateSupport = `http://${ServerHost}:${ServerPort}/Inventarka/AllTemplateSupport`;
    public serviceSupport = `http://${ServerHost}:${ServerPort}/Inventarka/ServiceSupport`;

    ///Снять статусы со списанной техники
    public isCheckStatusNull = `http://${ServerHost}:${ServerPort}/Inventarka/IsCheckStatusNull`;
    ///Генерация Qr кодов для техники
    public generateQrCode = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateQrCodeTechnical?serialNumber={serialNumber}&isAll={isAll}`;
    ///Генерация QR кодов по кабинетам
    public generateQrCodeOffice = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateQrCodeOffice?numberOffice={numberOffice}&isAll={isAll}`;
    ///Личный кабинет для техники
    public allTechnicsLk = `http://${ServerHost}:${ServerPort}/Inventarka/AllTechnicsLk?idUser={idUser}`;
    ///Выгрузка всех пользователей отдела
    public allUsersDepartmentLk = `http://${ServerHost}:${ServerPort}/Inventarka/AllUsersDepartmentLk?idUser={idUser}`;
    ///Выгрузка ролей пользователя
    public allRuleUser = `http://${ServerHost}:${ServerPort}/Inventarka/RuleAndUsers?idUser={idUser}`;
    ///Добавление или удаление ролей пользователя
    public allAddandDeleteRuleUser = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndDeleteRuleUser`;
    ///Проверка по УН запущена ли процесс или нет 
    public isBeginTask = `http://${ServerHost}:${ServerPort}/Inventarka/IsBeginTask?userIdEdit={idTask}`;

    //Настройки организации
    public settingOrganization = `http://${ServerHost}:${ServerPort}/Inventarka/SettingOrganization`;
    public addAndEditOrganization = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditOrganization?userIdEdit=`;

    //Настройка падежей для отделов отчетность
    //http://localhost:8182/Inventarka/SettingDepartmentCase
    public settingDepartmentCase = `http://${ServerHost}:${ServerPort}/Inventarka/SettingDepartmentCase`
    public addAndEditSettingDepartmentCase = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditSettingDepartmentCase?userIdEdit=`;
    //Настройки праздничных дней в инвенторизации
    public getholiday = `http://${ServerHost}:${ServerPort}/Inventarka/GetHoliday`
    public addAndEditHoliday = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditRbHoliday?userIdEdit=`;
    public deleteHoliday = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteRbHoliday?userIdEdit=`;
    //Настройки регламентов отдела
    public getDepartmentRegulations = `http://${ServerHost}:${ServerPort}/Inventarka/SettingDepartmentRegulations`;
    public addAndEditSettingDepartmentRegulations = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditSettingDepartmentRegulations?userIdEdit=`;

    //Api для заявки на доступ
    //Ресурсы
    public getResourceIt = `http://${ServerHost}:${ServerPort}/Inventarka/GetResourceIt`;
    public addAndEditResourceIt = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditResourceIt`;
    public getTaskAis3 = `http://${ServerHost}:${ServerPort}/Inventarka/GetTaskAis3`;
    public addAndEditTaskAis3 = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditTaskAis3`;
    //Журналы заявок
    public getJournalAis3 = `http://${ServerHost}:${ServerPort}/Inventarka/GetJournalAis3`;
    public addAndEditJournalAis3 = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditJournalAis3`;
    //Формирование актов списания
    public act = `http://${ServerHost}:${ServerPort}/Inventarka/CreateAct`;
    //Формирование журнала АИС 3 для доступов
    public createJournalAis3 = `http://${ServerHost}:${ServerPort}/Inventarka/CreateJournalAis3?year={year}&idOtdel={idOtdel}&isAllJournal={isAllJournal}`;
    //Создание табелей
    public createReportCard = `http://${ServerHost}:${ServerPort}/Inventarka/CreateReportCard`;
    //Создание служебных записок
    public createMemoReport = `http://${ServerHost}:${ServerPort}/Inventarka/CreateMemoReport`;

    //Разное 
    public allOtherAll = `http://${ServerHost}:${ServerPort}/Inventarka/AllOtherAll`;
    public allModelOther = `http://${ServerHost}:${ServerPort}/Inventarka/AllModelOther`;
    public allTypeOther = `http://${ServerHost}:${ServerPort}/Inventarka/AllTypeOther`;
    public allProizvoditelOther = `http://${ServerHost}:${ServerPort}/Inventarka/AllProizvoditelOther`;

    public addAndEditOtherAll = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditOtherAll?userIdEdit=`;
    public addAndEditModelOther = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditModelOther`;
    public addAndEditTypeOther = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditTypeOther`;
    public addAndEditProizvoditelOther = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditProizvoditelOther`;
    public deleteOtherAll = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteOtherAll?userIdEdit=`;
    //Актулизация данных с ЭПО
    public updateEpo = `http://${ServerHost}:${ServerPort}/Inventarka/UpdateDataSto?idProcess=4`;
    //Актуализация данных с АКСИОК
    public updateAksiok = `http://${ServerHost}:${ServerPort}/Inventarka/UpdateAksiok?idProcess=6&userLogin={userLogin}&passwordUser={passwordUser}`;
    //Получение всех отчетов с ЭПО
    public getModelReportAnalysisEpo = `http://${ServerHost}:${ServerPort}/Inventarka/GetModelReportAnalysisEpo`;
    //Полные отчеты по ЭПО с Инвенторизацией
    public allReportEpoAndInventory = `http://${ServerHost}:${ServerPort}/Inventarka/AllReportInventoryAndEpo`
    //Параметры для процесов
    public allEventProcess = `http://${ServerHost}:${ServerPort}/Inventarka/AllEventProcess`
    public addAndEditEventProcess = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditEventProcess`
    ///Проверка статусов серверов онлайн
    public statusServerDataBase = `http://${ServerHost}:${ServerPort}/Inventarka/StatusIpServerOnline`
    ///Категории телефонов
    public allCategoryPhoneHeader = `http://${ServerHost}:${ServerPort}/Inventarka/AllCategoryPhoneHeader`;
    public addAndEditCategoryPhoneHeader = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditCategoryPhoneHeader`;
    ///Вытащить дополнительные характеристики объекта АКСИОК
    public selectModelCharacteristicJson = `http://${ServerHost}:${ServerPort}/Inventarka/SelectModelCharacteristicJson?idModel={idModel}`;

    ///Аксиок модели и категории для анализа редактирования или удаления
    public aksiokAddAndEditModelValidation = `http://${ServerHost}:${ServerPort}/Inventarka/AksiokAddAndEditModelValidation`;
    public selectAllFullСategories = `http://${ServerHost}:${ServerPort}/Inventarka/SelectFullСategories`;
    public selectAllEquipmentType = `http://${ServerHost}:${ServerPort}/Inventarka/SelectEquipmentType`;
    public selectAllProducer = `http://${ServerHost}:${ServerPort}/Inventarka/SelectAllProducer`;
    public selectAllEquipmentModel = `http://${ServerHost}:${ServerPort}/Inventarka/SelectAllEquipmentModel`;
}
