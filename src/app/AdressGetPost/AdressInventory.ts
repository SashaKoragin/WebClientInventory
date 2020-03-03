export const ServerHost:string = 'I7751-W40204180'  //localhost
//export const ServerHost:string = 'localhost' 
export const ServerPort:string = '8182'
//К примеру новая структура

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
    public addandeditswitch =`http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditSwith?userIdEdit=`;
    public addandeditmodelswith = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditModelSwith`;

    public allmodelswithes = `http://${ServerHost}:${ServerPort}/Inventarka/AllModelSwithes`;
    public allswithes = `http://${ServerHost}:${ServerPort}/Inventarka/AllSwithes`;
    public allstatistics =`http://${ServerHost}:${ServerPort}/Inventarka/AllActualsProcedureUsers`;
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
    public allclasification= `http://${ServerHost}:${ServerPort}/Inventarka/AllClasification`

    public selectparametr = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateSqlSelect`;
    public selectxml = `http://${ServerHost}:${ServerPort}/Inventarka/SelectXml`;
    
    public deletedocument = `http://${ServerHost}:${ServerPort}/Inventarka/DeleteDocument`;

    public generatedocument = `http://${ServerHost}:${ServerPort}/Inventarka/Invoice`;
    public addfiledb = `http://${ServerHost}:${ServerPort}/Inventarka/AddFileDb`;
    public selectdocument = `http://${ServerHost}:${ServerPort}/Inventarka/LoadDocument`;
    public selectbook = `http://${ServerHost}:${ServerPort}/Inventarka/LoadBook`

    public actualIpAdresComputers =`http://${ServerHost}:${ServerPort}/Inventarka/ActualComputerIp`
    public actualstatusModel = `http://${ServerHost}:${ServerPort}/Inventarka/ActualUsers`;
    public telephoneHelper = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateTelephoneHelper`;
    public bookModels = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateBookAccounting`;
    ///Вспомогательные таблицы маршруты к ним

    public addAndEditNameSysBlock = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameSysBlock`;
    public addAndEditNameMonitor =`http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameMonitor`;
    public addAndEditNameModelBlokPower = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameModelBlokPower`;
    public addAndEditNameProizvoditelBlockPower = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameProizvoditelBlockPower`;
    public addAndEditNameSupply = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameSupply`;
    public addAndEditNameStatus = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameStatus`;
    public addAndEditNameKabinet = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameKabinet`;
    public addAndEditNameFullModel = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameFullModel`;
    public addAndEditNameClassification = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameClassification`;
    public addAndEditNameFullProizvoditel = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameFullProizvoditel`;
    public addAndEditNameCopySave = `http://${ServerHost}:${ServerPort}/Inventarka/AddAndEditNameCopySave`;

    ///Получение файла по get запросу параметр int для выбора View
    public getFileXlsx = `http://${ServerHost}:${ServerPort}/Inventarka/GenerateFileXlsxSqlView?idView=`;
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
}
