import { Otdel } from '../../../ModelInventory/InventoryModel';
//Модель годов
export class YearModeReport {
  constructor() {
    this.AddYears();
  }

  public yearsModel: string[] = [];
  public selectedYears: string = null;



  public otdel: Otdel[] = [];
  public selectedOtdel: Otdel = null;


  public AddYears() {
    var todayYear = new Date().getFullYear();
    for (var year = 2021; year <= todayYear; year++) {
      this.yearsModel.push(year.toString());
    }
  }

  calbackfiltersAll(): void {
  
  }

}
