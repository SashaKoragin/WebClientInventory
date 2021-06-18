//Модель годов
export class YearModeReport {
    constructor() {
      this.AddYears();
    }
  
    public yearsModel: string[] = [];
    public selectedYears: string;
  
    public AddYears() {
      var todayYear = new Date().getFullYear();
      for (var year = 2021; year <= todayYear; year++) {
        this.yearsModel.push(year.toString());
      }
    }
  }
  