import * as XLSX from 'xlsx';

export class ImportToExcel{

    ///element.nativeElement Ref
    ///Проводится удаление из placeholder а то плохо тянет в таблицу(((
    ExportTOExcel(element:any)
    {
      var copy = element.nativeElement.cloneNode(true)
      var spanlist =  copy.querySelectorAll("span")
      if(spanlist){
          for(var s of spanlist){
            s.innerText = null
          }
      }
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(copy)
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Таблица');
      XLSX.writeFile(wb, 'Отчет.xlsx');
    }
}