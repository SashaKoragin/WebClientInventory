export class AdressInventarka {
    public host = 'i7751-w00000745';
   // public host = 'localhost';
    public autificationInventar = `http://${this.host}:8182/Inventarka/Authorization`;
    public alluser = `http://${this.host}:8182/Inventarka/AllUsers`;
    public allotdelget = `http://${this.host}:8182/Inventarka/AllOtdels`;
    public addandedituser = `http://${this.host}:8182/Inventarka/AddAndEditUser`;
    public addandeditprinter = `http://${this.host}:8182/Inventarka/AddAndEditPrinter`;
    public addandeditscaner = `http://${this.host}:8182/Inventarka/AddAndEditScaner`;
    public addandeditmfu = `http://${this.host}:8182/Inventarka/AddAndEditMfu`;
    public addandeditsysblock = `http://${this.host}:8182/Inventarka/AddAndEditSysBlok`;
    public addandeditmonitor = `http://${this.host}:8182/Inventarka/AddAndEditMonitor`;
    public addandeditotdel = `http://${this.host}:8182/Inventarka/AddAndEditOtdel`;
    public addandedittelephon = ` http://${this.host}:8182/Inventarka/AddAndEditTelephone`;
    public addandeditblockpower = ` http://${this.host}:8182/Inventarka/AddAndEditBlockPower`;
    
    public allstatistics =`http://${this.host}:8182/Inventarka/AllActualsProcedureUsers`
    public allsysblock = `http://${this.host}:8182/Inventarka/AllSysBlok`;
    public allmonitor = `http://${this.host}:8182/Inventarka/AllMonitors`;
    public allmfu = `http://${this.host}:8182/Inventarka/AllMfu`;
    public allcopysave = `http://${this.host}:8182/Inventarka/AllCopySave`;
    public allposition = `http://${this.host}:8182/Inventarka/AllPosition`;
    public allprinters = `http://${this.host}:8182/Inventarka/AllPrinters`;
    public allscaners = `http://${this.host}:8182/Inventarka/AllScaners`;
    public allproizvoditel = `http://${this.host}:8182/Inventarka/AllProizvoditel`;
    public allmodel = `http://${this.host}:8182/Inventarka/AllModel`;
    public allkabinet = `http://${this.host}:8182/Inventarka/AllKabinet`;
    public allstatusing = `http://${this.host}:8182/Inventarka/AllStatusing`;
    public allnamesysblok = `http://${this.host}:8182/Inventarka/AllNameSysBlock`;
    public allnamemonitor = `http://${this.host}:8182/Inventarka/AllNameMonitor`;
    public alltelephon = `http://${this.host}:8182/Inventarka/AllTelephon`;
    public allblockpower = `http://${this.host}:8182/Inventarka/AllBlockPower`;
    public allsupply = `http://${this.host}:8182/Inventarka/AllSupply`;
    public allmodelblockpower = `http://${this.host}:8182/Inventarka/AllModelBlockPower`;
    public allproizvoditelblockpower = `http://${this.host}:8182/Inventarka/AllProizvoditelBlockPower`;
    public allclasification= `http://${this.host}:8182/Inventarka/AllClasification`

    public selectparametr = `http://${this.host}:8182/Inventarka/GenerateSqlSelect`;
    public selectxml = `http://${this.host}:8182/Inventarka/SelectXml`;
    
    public deletedocument = `http://${this.host}:8182/Inventarka/DeleteDocument`;

    public generatedocument = `http://${this.host}:8182/Inventarka/Invoice`;
    public addfiledb = `http://${this.host}:8182/Inventarka/AddFileDb`;
    public selectdocument = `http://${this.host}:8182/Inventarka/LoadDocument`;
    public selectbook = `http://${this.host}:8182/Inventarka/LoadBook`

    public actualIpAdresComputers =`http://${this.host}:8182/Inventarka/ActualComputerIp`
    public actualstatusModel = `http://${this.host}:8182/Inventarka/ActualUsers`;
    public telephoneHelper = `http://${this.host}:8182/Inventarka/GenerateTelephoneHelper`;
    public bookModels = `http://${this.host}:8182/Inventarka/GenerateBookAccounting`;
    ///Вспомогательные таблицы маршруты к ним
    public addAndEditNameSysBlock = `http://${this.host}:8182/Inventarka/AddAndEditNameSysBlock`;
    public addAndEditNameMonitor =`http://${this.host}:8182/Inventarka/AddAndEditNameMonitor`;
    public addAndEditNameModelBlokPower = `http://${this.host}:8182/Inventarka/AddAndEditNameModelBlokPower`;
    public addAndEditNameProizvoditelBlockPower = `http://${this.host}:8182/Inventarka/AddAndEditNameProizvoditelBlockPower`;
    public addAndEditNameSupply = `http://${this.host}:8182/Inventarka/AddAndEditNameSupply`;
    public addAndEditNameStatus = `http://${this.host}:8182/Inventarka/AddAndEditNameStatus`;
    public addAndEditNameKabinet = `http://${this.host}:8182/Inventarka/AddAndEditNameKabinet`;
    public addAndEditNameFullModel = `http://${this.host}:8182/Inventarka/AddAndEditNameFullModel`;
    public addAndEditNameClassification = `http://${this.host}:8182/Inventarka/AddAndEditNameClassification`;
    public addAndEditNameFullProizvoditel = `http://${this.host}:8182/Inventarka/AddAndEditNameFullProizvoditel`;
    public addAndEditNameCopySave = `http://${this.host}:8182/Inventarka/AddAndEditNameCopySave`;

}
