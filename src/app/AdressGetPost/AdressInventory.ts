export class AdressInventarka {
  //  public host = 'i7751-w00000745:8182';
    public host = 'localhost:8182';
    public autificationInventar = `http://${this.host}/Inventarka/Authorization`;
    public alluser = `http://${this.host}/Inventarka/AllUsers`;
    public allotdelget = `http://${this.host}/Inventarka/AllOtdels`;
    public addandedituser = `http://${this.host}/Inventarka/AddAndEditUser`;
    public addandeditprinter = `http://${this.host}/Inventarka/AddAndEditPrinter`;
    public addandeditscaner = `http://${this.host}/Inventarka/AddAndEditScaner`;
    public addandeditmfu = `http://${this.host}/Inventarka/AddAndEditMfu`;
    public addandeditsysblock = `http://${this.host}/Inventarka/AddAndEditSysBlok`;
    public addandeditmonitor = `http://${this.host}/Inventarka/AddAndEditMonitor`;
    public addandeditotdel = `http://${this.host}/Inventarka/AddAndEditOtdel`;
    public addandedittelephon = `http://${this.host}/Inventarka/AddAndEditTelephone`;
    public addandeditblockpower = `http://${this.host}/Inventarka/AddAndEditBlockPower`;
    public addandeditswitch =`http://${this.host}/Inventarka/AddAndEditSwith`;
    public addandeditmodelswith = `http://${this.host}/Inventarka/AddAndEditModelSwith`;

    public allmodelswithes = `http://${this.host}/Inventarka/AllModelSwithes`;
    public allswithes = `http://${this.host}/Inventarka/AllSwithes`;
    public allstatistics =`http://${this.host}/Inventarka/AllActualsProcedureUsers`;
    public allsysblock = `http://${this.host}/Inventarka/AllSysBlok`;
    public allmonitor = `http://${this.host}/Inventarka/AllMonitors`;
    public allmfu = `http://${this.host}/Inventarka/AllMfu`;
    public allcopysave = `http://${this.host}/Inventarka/AllCopySave`;
    public allposition = `http://${this.host}/Inventarka/AllPosition`;
    public allprinters = `http://${this.host}/Inventarka/AllPrinters`;
    public allscaners = `http://${this.host}/Inventarka/AllScaners`;
    public allproizvoditel = `http://${this.host}/Inventarka/AllProizvoditel`;
    public allmodel = `http://${this.host}/Inventarka/AllModel`;
    public allkabinet = `http://${this.host}/Inventarka/AllKabinet`;
    public allstatusing = `http://${this.host}/Inventarka/AllStatusing`;
    public allnamesysblok = `http://${this.host}/Inventarka/AllNameSysBlock`;
    public allnamemonitor = `http://${this.host}/Inventarka/AllNameMonitor`;
    public alltelephon = `http://${this.host}/Inventarka/AllTelephon`;
    public allblockpower = `http://${this.host}/Inventarka/AllBlockPower`;
    public allsupply = `http://${this.host}/Inventarka/AllSupply`;
    public allmodelblockpower = `http://${this.host}/Inventarka/AllModelBlockPower`;
    public allproizvoditelblockpower = `http://${this.host}/Inventarka/AllProizvoditelBlockPower`;
    public allclasification= `http://${this.host}/Inventarka/AllClasification`

    public selectparametr = `http://${this.host}/Inventarka/GenerateSqlSelect`;
    public selectxml = `http://${this.host}/Inventarka/SelectXml`;
    
    public deletedocument = `http://${this.host}/Inventarka/DeleteDocument`;

    public generatedocument = `http://${this.host}/Inventarka/Invoice`;
    public addfiledb = `http://${this.host}/Inventarka/AddFileDb`;
    public selectdocument = `http://${this.host}/Inventarka/LoadDocument`;
    public selectbook = `http://${this.host}/Inventarka/LoadBook`

    public actualIpAdresComputers =`http://${this.host}/Inventarka/ActualComputerIp`
    public actualstatusModel = `http://${this.host}/Inventarka/ActualUsers`;
    public telephoneHelper = `http://${this.host}/Inventarka/GenerateTelephoneHelper`;
    public bookModels = `http://${this.host}/Inventarka/GenerateBookAccounting`;
    ///Вспомогательные таблицы маршруты к ним

    public addAndEditNameSysBlock = `http://${this.host}/Inventarka/AddAndEditNameSysBlock`;
    public addAndEditNameMonitor =`http://${this.host}/Inventarka/AddAndEditNameMonitor`;
    public addAndEditNameModelBlokPower = `http://${this.host}/Inventarka/AddAndEditNameModelBlokPower`;
    public addAndEditNameProizvoditelBlockPower = `http://${this.host}/Inventarka/AddAndEditNameProizvoditelBlockPower`;
    public addAndEditNameSupply = `http://${this.host}/Inventarka/AddAndEditNameSupply`;
    public addAndEditNameStatus = `http://${this.host}/Inventarka/AddAndEditNameStatus`;
    public addAndEditNameKabinet = `http://${this.host}/Inventarka/AddAndEditNameKabinet`;
    public addAndEditNameFullModel = `http://${this.host}/Inventarka/AddAndEditNameFullModel`;
    public addAndEditNameClassification = `http://${this.host}/Inventarka/AddAndEditNameClassification`;
    public addAndEditNameFullProizvoditel = `http://${this.host}/Inventarka/AddAndEditNameFullProizvoditel`;
    public addAndEditNameCopySave = `http://${this.host}/Inventarka/AddAndEditNameCopySave`;
}