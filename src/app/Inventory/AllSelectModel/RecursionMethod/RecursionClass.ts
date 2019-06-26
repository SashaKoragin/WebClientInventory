import { Users, SysBlock, Otdel } from '../../ModelInventory/InventoryModel';
import { MainInventar } from '../../Main/Main/MainInventory';


export class Recursion{

  public userEcvipment:ModelUserAndEquipment[] = [];
  public otdelandUserEcvipment:ModelUserAndEquipment[] = [];
  ///Разкладка пользователей в рекурсию
  public methodEquipmentUserRecursion(Users:Users[]){
        var i =0;
        for (const user of Users) {
            i = 0;
            var use =new ModelUserAndEquipment();
             use.Name = user.Name;
             use.Children =[];
             use.InputServer = false;
             use.Types =null;
             if(user.Monitors !=null||typeof user.Monitors!='undefined')
             {
              use.Children.push({Name:"Монитор",Types:null,InputServer:false,Children:[]})
                 for (const monitor of user.Monitors) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:monitor.NameMonitor.Name ,NameModel:null,SerNumber:monitor.SerNum,
                                    ServiceNumber:null,InventerNumber:monitor.InventarNumMonitor,
                                    Kabinet:monitor.Kabinet.NumberKabinet,
                                    NameComputer:null,IpAdress:null})
                     use.Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.Mfu!=null||typeof user.Mfu!='undefined')
             {
              use.Children.push({Name:"МФУ",Types:null,InputServer:false,Children:[]})
                 for (const mfu of user.Mfu) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:mfu.FullProizvoditel.NameProizvoditel ,NameModel:mfu.FullModel.NameModel,
                                    SerNumber:mfu.ZavNumber,ServiceNumber:mfu.ServiceNumber,InventerNumber:null,
                                    Kabinet:mfu.Kabinet.NumberKabinet,NameComputer:null,IpAdress:null
                                    })
                     use.Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.Printer!=null||typeof user.Printer!='undefined')
             {
              use.Children.push({Name:"Принтер",Types:null,InputServer:false,Children:[]})
                 for (const printer of user.Printer) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:printer.FullProizvoditel.NameProizvoditel ,NameModel:printer.FullModel.NameModel,
                                    SerNumber:printer.ZavNumber,ServiceNumber:printer.ServiceNumber,InventerNumber:null,
                                    Kabinet:printer.Kabinet.NumberKabinet,NameComputer:null,IpAdress:null
                                    })
                     use.Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.ScanerAndCamer!=null||typeof user.ScanerAndCamer!='undefined')
             {
              use.Children.push({Name:"Сканеры и камеры",Types:null,InputServer:false,Children:[]})
                 for (const scaner of user.ScanerAndCamer) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:scaner.FullProizvoditel.NameProizvoditel ,NameModel:scaner.FullModel.NameModel,
                                    SerNumber:scaner.ZavNumber,ServiceNumber:scaner.ServiceNumber,InventerNumber:scaner.InventarNumber,
                                    Kabinet:scaner.Kabinet.NumberKabinet,NameComputer:null,IpAdress:null
                                    })
                     use.Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.SysBlock!=null||typeof user.SysBlock!='undefined')
             {
              use.Children.push({Name:"Системные блоки",Types:null,InputServer:false,Children:[]})
                 for (const sysblok of user.SysBlock) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:sysblok.NameSysBlock.NameComputer ,NameModel:null,
                                    SerNumber:sysblok.SerNum,ServiceNumber:sysblok.ServiceNum,InventerNumber:sysblok.InventarNumSysBlok,
                                    Kabinet:sysblok.Kabinet.NumberKabinet,NameComputer:sysblok.NameComputer,IpAdress:sysblok.IpAdress
                                    })
                     use.Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(use.Children.length>0)
             {
                this.userEcvipment.push(use);
             }
        }
      }

      ///Разкладка отделов в рекурсию
      public methodEquipmentOtdelAndUserRecursion(Otdel:Otdel[]){
        var i =0;
        var j =0;
        for (const otdel of Otdel) {
            j = 0;
            var otd =new ModelUserAndEquipment();
            otd.Name = otdel.NameOtdel;
            otd.Children =[];
            otd.InputServer = false;
            otd.Types =null;
           for (const user of otdel.Users) {
              i = 0;
            if((user.Monitors !=null||typeof user.Monitors!='undefined')
              ||(user.Mfu!=null||typeof user.Mfu!='undefined')
              ||(user.Printer!=null||typeof user.Printer!='undefined')
              ||(user.ScanerAndCamer!=null||typeof user.ScanerAndCamer!='undefined')
              ||(user.SysBlock!=null||typeof user.SysBlock!='undefined')){  

              otd.Children.push({ Name:user.Name,InputServer:true,Types:null,Children:[] })
             if(user.Monitors !=null||typeof user.Monitors!='undefined')
             {
             otd.Children[j].Children.push({Name:"Монитор",Types:null,InputServer:false,Children:[]})
                 for (const monitor of user.Monitors) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:monitor.NameMonitor.Name ,NameModel:null,SerNumber:monitor.SerNum,
                                    ServiceNumber:null,InventerNumber:monitor.InventarNumMonitor,
                                    Kabinet:monitor.Kabinet.NumberKabinet,
                                    NameComputer:null,IpAdress:null})
                 otd.Children[j].Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.Mfu!=null||typeof user.Mfu!='undefined')
             {
                otd.Children[j].Children.push({Name:"МФУ",Types:null,InputServer:false,Children:[]})
                 for (const mfu of user.Mfu) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:mfu.FullProizvoditel.NameProizvoditel ,NameModel:mfu.FullModel.NameModel,
                                    SerNumber:mfu.ZavNumber,ServiceNumber:mfu.ServiceNumber,InventerNumber:null,
                                    Kabinet:mfu.Kabinet.NumberKabinet,NameComputer:null,IpAdress:null
                                    })
                    otd.Children[j].Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.Printer!=null||typeof user.Printer!='undefined')
             {
            otd.Children[j].Children.push({Name:"Принтер",Types:null,InputServer:false,Children:[]});
                 for (const printer of user.Printer) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:printer.FullProizvoditel.NameProizvoditel ,NameModel:printer.FullModel.NameModel,
                                    SerNumber:printer.ZavNumber,ServiceNumber:printer.ServiceNumber,InventerNumber:null,
                                    Kabinet:printer.Kabinet.NumberKabinet,NameComputer:null,IpAdress:null
                                    })
                    otd.Children[j].Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.ScanerAndCamer!=null||typeof user.ScanerAndCamer!='undefined')
             {
                otd.Children[j].Children.push({Name:"Сканеры и камеры",Types:null,InputServer:false,Children:[]});
                 for (const scaner of user.ScanerAndCamer) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:scaner.FullProizvoditel.NameProizvoditel ,NameModel:scaner.FullModel.NameModel,
                                    SerNumber:scaner.ZavNumber,ServiceNumber:scaner.ServiceNumber,InventerNumber:scaner.InventarNumber,
                                    Kabinet:scaner.Kabinet.NumberKabinet,NameComputer:null,IpAdress:null
                                    })
                otd.Children[j].Children[i].Children.push(mo);
                 }
                 i++;
             }
             if(user.SysBlock!=null||typeof user.SysBlock!='undefined')
             {
                otd.Children[j].Children.push({Name:"Системные блоки",Types:null,InputServer:false,Children:[]});
                 for (const sysblok of user.SysBlock) {
                     var mo =new ModelUserAndEquipment()
                     mo.Children = []
                     mo.Name = null;
                     mo.Types = [];
                     mo.Types.push({Name:sysblok.NameSysBlock.NameComputer ,NameModel:null,
                                    SerNumber:sysblok.SerNum,ServiceNumber:sysblok.ServiceNum,InventerNumber:sysblok.InventarNumSysBlok,
                                    Kabinet:sysblok.Kabinet.NumberKabinet,NameComputer:sysblok.NameComputer,IpAdress:sysblok.IpAdress
                                    })
                     otd.Children[j].Children[i].Children.push(mo);
                 }
                 i++;
             }
             j++;
            }
           }
           if(otd.Children.length>0)
           {
              this.otdelandUserEcvipment.push(otd);
           }
        }
      }
}



export class ModelUserAndEquipment{
    public Name: string; 
    public InputServer:boolean; 
    public Types: Equipment[];
    public Children: ModelUserAndEquipment[];
}

export class Equipment{
    Name:string;
    NameModel:string;
    SerNumber:string;
    ServiceNumber:string;
    InventerNumber:string;
    Kabinet:string;
    NameComputer:string;
    IpAdress:string;
}