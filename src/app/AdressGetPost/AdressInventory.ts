export class AdressInventarka {
    //public host = 'i7751-w00000745';
    public host = 'localhost';
    public autificationInventar = `http://${this.host}:8182/Inventarka/Authorization`;
    public alluser = `http://${this.host}:8182/Inventarka/AllUsers`;
    public allotdelget = `http://${this.host}:8182/Inventarka/AllOtdels`;
    public addandedituser = `http://${this.host}:8182/Inventarka/AddAndEditUser`;
    public addandeditprinter = `http://${this.host}:8182/Inventarka/AddAndEditPrinter`;
    public addandeditscaner = `http://${this.host}:8182/Inventarka/AddAndEditScaner`
    public addandeditmfu = `http://${this.host}:8182/Inventarka/AddAndEditMfu`
    public addandeditsysblock = `http://${this.host}:8182/Inventarka/AddAndEditSysBlok`
    public addandeditmonitor = `http://${this.host}:8182/Inventarka/AddAndEditMonitor`
    public addandeditotdel = `http://${this.host}:8182/Inventarka/AddAndEditOtdel`

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

    public selectparametr = `http://${this.host}:8182/Inventarka/GenerateSqlSelect`
    public selectxml = `http://${this.host}:8182/Inventarka/SelectXml`
}
