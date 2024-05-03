import { Users, Otdel, EquipmentType } from '../../ModelInventory/InventoryModel';

export class Recursion {

   public userEcvipment: ModelUserAndEquipment[] = [];
   public otdelandUserEcvipment: ModelUserAndEquipment[] = [];
   public modelAksiok: ModelAksiok[] = [];
   ///Разкладка пользователей в рекурсию

   public methodModelAksiok(EquipmentType: EquipmentType[]) {
      var i;
      this.modelAksiok = [];
      for (const type of EquipmentType) {
         i = 0;
         var use = new ModelAksiok();
         use.Name = type.NameType
         use.Code = type.CodeType,
            use.ModelAksiok = [];
         if (type.Producer != null || typeof type.Producer != 'undefined') {
            for (const product of type.Producer) {
               // console.log(type.Producer);
               use.ModelAksiok.push({ Name: product.NameProducer, Code: product.CodeProducer, ModelAksiok: [] });
               if (product.EquipmentModel != null || typeof product.EquipmentModel != 'undefined') {
                  for (const model of product.EquipmentModel) {
                     use.ModelAksiok[i].ModelAksiok.push({ Name: model.NameModel, Code: model.CodeModel, ModelAksiok: [] });
                  }
               }
               i++
            }
         }
         if (use.ModelAksiok.length > 0) {
            this.modelAksiok.push(use);
         }
      }
   }


   public methodEquipmentUserRecursion(Users: Users[]) {
      var i = 0;
      //console.log(Users)
      for (const user of Users) {
         i = 0;
         var use = new ModelUserAndEquipment();
         use.Name = user.NameUser;
         use.IdUser = user.IdUser;
         use.Children = [];
         use.InputServer = false;
         use.Types = null;
         if (user.Monitors != null || typeof user.Monitors != 'undefined') {
            use.Children.push({ Name: "Монитор", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const monitor of user.Monitors) {
               use.Children[i].Children[0].Types.push({
                  Name: monitor.NameMonitor.NameManufacturer, NameModel: null, SerNumber: monitor.SerNum,
                  ServiceNumber: null, InventerNumber: monitor.InventarNumMonitor,
                  Kabinet: monitor.Kabinet ? monitor.Kabinet.NumberKabinet : null,
                  Status: monitor.Coment,
                  NameComputer: null, IpAdress: null
               });
            }
            i++;
         }
         if (user.Mfu != null || typeof user.Mfu != 'undefined') {
            use.Children.push({ Name: "МФУ", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const mfu of user.Mfu) {
               use.Children[i].Children[0].Types.push({
                  Name: mfu.FullProizvoditel.NameProizvoditel, NameModel: mfu.FullModel.NameModel,
                  SerNumber: mfu.ZavNumber, ServiceNumber: mfu.ServiceNumber, InventerNumber: null,
                  Kabinet: mfu.Kabinet ? mfu.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: mfu.Coment
               });
            }
            i++;
         }
         if (user.Printer != null || typeof user.Printer != 'undefined') {
            use.Children.push({ Name: "Принтер", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const printer of user.Printer) {
               use.Children[i].Children[0].Types.push({
                  Name: printer.FullProizvoditel.NameProizvoditel, NameModel: printer.FullModel.NameModel,
                  SerNumber: printer.ZavNumber, ServiceNumber: printer.ServiceNumber, InventerNumber: null,
                  Kabinet: printer.Kabinet ? printer.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: printer.Coment
               });
            }
            i++;
         }
         if (user.ScanerAndCamer != null || typeof user.ScanerAndCamer != 'undefined') {
            use.Children.push({ Name: "Сканеры и камеры", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const scaner of user.ScanerAndCamer) {
               use.Children[i].Children[0].Types.push({
                  Name: scaner.FullProizvoditel.NameProizvoditel, NameModel: scaner.FullModel.NameModel,
                  SerNumber: scaner.ZavNumber, ServiceNumber: scaner.ServiceNumber, InventerNumber: scaner.InventarNumber,
                  Kabinet: scaner.Kabinet ? scaner.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: scaner.Coment
               });
            }
            i++;
         }
         if (user.SysBlock != null || typeof user.SysBlock != 'undefined') {
            use.Children.push({ Name: "Системные блоки", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const sysblok of user.SysBlock) {
               use.Children[i].Children[0].Types.push({
                  Name: sysblok.NameSysBlock.NameComputer, NameModel: null,
                  SerNumber: sysblok.SerNum, ServiceNumber: sysblok.ServiceNum, InventerNumber: sysblok.InventarNumSysBlok,
                  Kabinet: sysblok.Kabinet ? sysblok.Kabinet.NumberKabinet : null, NameComputer: sysblok.NameComputer, IpAdress: sysblok.IpAdress,
                  Status: sysblok.Coment
               });
            }
            i++;
         }
         if (user.BlockPower != null || typeof user.BlockPower != 'undefined') {
            use.Children.push({ Name: "ИБП", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const blok of user.BlockPower) {
               use.Children[i].Children[0].Types.push({
                  Name: blok.ProizvoditelBlockPower.Name, NameModel: blok.ModelBlockPower.Name,
                  SerNumber: blok.ZavNumber, ServiceNumber: blok.ServiceNumber, InventerNumber: blok.InventarNumber,
                  Kabinet: blok.Kabinet ? blok.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: blok.Coment
               });
            }
            i++;
         }
         if (user.Telephon != null || typeof user.Telephon != 'undefined') {
            use.Children.push({ Name: "Телефон", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            use.Children[i].Children[0].Types.push({
               Name: user.Telephon.ModelPhone.NameModel, NameModel: null,
               SerNumber: user.Telephon.SerNumber, ServiceNumber: null, InventerNumber: null,
               Status: user.Telephon.Coment,
               Kabinet: user.Telephon.Kabinet ? user.Telephon.Kabinet.NumberKabinet : null, NameComputer: user.Telephon.MacTelephon,
               IpAdress: user.Telephon.IpTelephon
            });
            i++;
         }
         if (user.Swithe != null || typeof user.Swithe != 'undefined') {
            use.Children.push({ Name: "Коммутатор", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const swith of user.Swithe) {
               use.Children[i].Children[0].Types.push({
                  Name: 'Коммутатор', NameModel: swith.ModelSwithe.NameModel,
                  SerNumber: swith.SerNum, ServiceNumber: swith.ServiceNum, InventerNumber: swith.InventarNum,
                  Kabinet: swith.Kabinet ? swith.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: swith.Coment
               });
            }
            i++;
         }
         if (user.Token != null || typeof user.Token != 'undefined') {
            use.Children.push({ Name: "Токены", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const token of user.Token) {
               use.Children[i].Children[0].Types.push({
                  Name: 'Токен', NameModel: token.ProizvoditelName,
                  SerNumber: token.SerNum, ServiceNumber: 'Не предусмотрен', InventerNumber: token.SerNum,
                  Kabinet: token.Kabinet ? token.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: token.Coment
               });
            }
            i++;
         }
         if (user.OtherAll != null || typeof user.OtherAll != 'undefined') {
            use.Children.push({ Name: "Разное", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
            for (const other of user.OtherAll) {
               use.Children[i].Children[0].Types.push({
                  Name: other.ProizvoditelOther.Name, NameModel: other.ModelOther.Name,
                  SerNumber: other.SerNum, ServiceNumber: other.ServiceNumber, InventerNumber: other.InventarNum,
                  Kabinet: other.Kabinet ? other.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                  Status: other.Coment
               })
            }
            i++;
         }
         if (use.Children.length > 0) {
            this.userEcvipment.push(use);
         }
      }
   }

   ///Разкладка отделов в рекурсию
   public methodEquipmentOtdelAndUserRecursion(Otdel: Otdel[]) {
      //console.log(Otdel)
      var i;
      var j;
      for (const otdel of Otdel) {
         if (typeof otdel.Users != 'undefined') {
            j = 0;
            var otd = new ModelUserAndEquipment();
            otd.Name = otdel.NameOtdel;
            otd.Children = [];
            otd.InputServer = false;
            otd.Types = null;
            for (const user of otdel.Users) {
               i = 0;
               if ((user.Monitors != null || typeof user.Monitors != 'undefined')
                  || (user.Mfu != null || typeof user.Mfu != 'undefined')
                  || (user.Printer != null || typeof user.Printer != 'undefined')
                  || (user.ScanerAndCamer != null || typeof user.ScanerAndCamer != 'undefined')
                  || (user.SysBlock != null || typeof user.SysBlock != 'undefined')
                  || (user.BlockPower != null || typeof user.BlockPower != 'undefined')
                  || (user.Telephon != null || typeof user.Telephon != 'undefined') || (user.Swithe != null || typeof user.Swithe != 'undefined')
                  || (user.OtherAll != null || typeof user.OtherAll != 'undefined')
               ) {
                  otd.Children.push({ Name: user.NameUser, IdUser: user.IdUser, IdUserOtdel: otdel.IdUser, InputServer: true, Types: null, Children: [] })
                  if (user.Monitors != null || typeof user.Monitors != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Монитор", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] });
                     for (const monitor of user.Monitors) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: monitor.NameMonitor.NameManufacturer, NameModel: null, SerNumber: monitor.SerNum,
                           ServiceNumber: null, InventerNumber: monitor.InventarNumMonitor,
                           Kabinet: monitor.Kabinet ? monitor.Kabinet.NumberKabinet : null,
                           Status: monitor.Coment,
                           NameComputer: null, IpAdress: null
                        });
                     }
                     i++;
                  }
                  if (user.Mfu != null || typeof user.Mfu != 'undefined') {
                     otd.Children[j].Children.push({ Name: "МФУ", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] });
                     for (const mfu of user.Mfu) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: mfu.FullProizvoditel.NameProizvoditel, NameModel: mfu.FullModel.NameModel,
                           SerNumber: mfu.ZavNumber, ServiceNumber: mfu.ServiceNumber, InventerNumber: null,
                           Kabinet: mfu.Kabinet ? mfu.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: mfu.Coment
                        });
                     }
                     i++;
                  }
                  if (user.Printer != null || typeof user.Printer != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Принтер", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] });
                     for (const printer of user.Printer) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: printer.FullProizvoditel.NameProizvoditel, NameModel: printer.FullModel.NameModel,
                           SerNumber: printer.ZavNumber, ServiceNumber: printer.ServiceNumber, InventerNumber: null,
                           Kabinet: printer.Kabinet ? printer.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: printer.Coment
                        });
                     }
                     i++;
                  }
                  if (user.ScanerAndCamer != null || typeof user.ScanerAndCamer != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Сканеры и камеры", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] });
                     for (const scaner of user.ScanerAndCamer) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: scaner.FullProizvoditel.NameProizvoditel, NameModel: scaner.FullModel.NameModel,
                           SerNumber: scaner.ZavNumber, ServiceNumber: scaner.ServiceNumber, InventerNumber: scaner.InventarNumber,
                           Kabinet: scaner.Kabinet ? scaner.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: scaner.Coment
                        });
                     }
                     i++;
                  }
                  if (user.SysBlock != null || typeof user.SysBlock != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Системные блоки", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] });
                     for (const sysblok of user.SysBlock) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: sysblok.NameSysBlock.NameComputer, NameModel: null,
                           SerNumber: sysblok.SerNum, ServiceNumber: sysblok.ServiceNum, InventerNumber: sysblok.InventarNumSysBlok,
                           Kabinet: sysblok.Kabinet ? sysblok.Kabinet.NumberKabinet : null, NameComputer: sysblok.NameComputer, IpAdress: sysblok.IpAdress,
                           Status: sysblok.Coment
                        });
                     }
                     i++;
                  }
                  if (user.BlockPower != null || typeof user.BlockPower != 'undefined') {
                     otd.Children[j].Children.push({ Name: "ИБП", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
                     for (const blok of user.BlockPower) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: blok.ProizvoditelBlockPower.Name, NameModel: blok.ModelBlockPower.Name,
                           SerNumber: blok.ZavNumber, ServiceNumber: blok.ServiceNumber, InventerNumber: blok.InventarNumber,
                           Kabinet: blok.Kabinet ? blok.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: blok.Coment
                        });
                     }
                     i++;
                  }
                  if (user.Telephon != null || typeof user.Telephon != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Телефон", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
                     otd.Children[j].Children[i].Children[0].Types.push({
                        Name: user.Telephon.ModelPhone.NameModel, NameModel: null,
                        SerNumber: user.Telephon.SerNumber, ServiceNumber: null, InventerNumber: null,
                        Status: user.Telephon.Coment,
                        Kabinet: user.Telephon.Kabinet ? user.Telephon.Kabinet.NumberKabinet : null, NameComputer: user.Telephon.MacTelephon, IpAdress: user.Telephon.IpTelephon
                     });
                     i++;
                  }
                  if (user.Swithe != null || typeof user.Swithe != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Коммутатор", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
                     for (const swith of user.Swithe) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: 'Коммутатор', NameModel: swith.ModelSwithe.NameModel,
                           SerNumber: swith.SerNum, ServiceNumber: swith.ServiceNum, InventerNumber: swith.InventarNum,
                           Kabinet: swith.Kabinet ? swith.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: swith.Coment
                        });
                     }
                     i++;
                  }
                  if (user.Token != null || typeof user.Token != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Токены", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
                     for (const token of user.Token) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: 'Токен', NameModel: token.ProizvoditelName,
                           SerNumber: token.SerNum, ServiceNumber: 'Не предусмотрен', InventerNumber: token.SerNum,
                           Kabinet: token.Kabinet ? token.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: token.Coment
                        });
                     }
                     i++;
                  }
                  if (user.OtherAll != null || typeof user.OtherAll != 'undefined') {
                     otd.Children[j].Children.push({ Name: "Разное", IdUser: null, Types: null, InputServer: false, Children: [{ Children: [], Name: null, IdUser: null, Types: [], InputServer: false }] })
                     for (const other of user.OtherAll) {
                        otd.Children[j].Children[i].Children[0].Types.push({
                           Name: other.ProizvoditelOther.Name, NameModel: other.ModelOther.Name,
                           SerNumber: other.SerNum, ServiceNumber: other.ServiceNumber, InventerNumber: other.InventarNum,
                           Kabinet: other.Kabinet ? other.Kabinet.NumberKabinet : null, NameComputer: null, IpAdress: null,
                           Status: other.Coment
                        })
                     }
                     i++;
                  }
                  j++;
               }
            }
            if (otd.Children.length > 0) {
               this.otdelandUserEcvipment.push(otd);
            }
         }
      }
   }

}



export class ModelUserAndEquipment {
   public Name: string;  //Имя пользователя
   public IdUser: number; //Ун пользователя
   public IdUserOtdel?: number = null; //Ун пользователя
   public InputServer: boolean; //Кнопка отправки на сервер 
   public Types: Equipment[];
   public Children: ModelUserAndEquipment[];
}

export class Equipment {
   Name: string;
   NameModel: string;
   SerNumber: string;
   ServiceNumber: string;
   InventerNumber: string;
   Kabinet: string;
   NameComputer: string;
   IpAdress: string;
   Status: string;
}

export class ModelAksiok {
   public Code: string;
   public Name: string;
   public ModelAksiok: ModelAksiok[];

}