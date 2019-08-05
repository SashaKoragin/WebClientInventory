import { MatTableDataSource} from '@angular/material';
import { ElementRef, ViewChild } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';

export class AddFile{
    
    constructor(public select:SelectAllParametrs) { }

    ref:ElementRef
   
   public intilization(ref:ElementRef){
     this.ref = ref;
   }

    public visible:boolean;
    displaydataSource: string[] = ['Name', 'Expansion','Button'];
    dataSource: MatTableDataSource<Upload> = null;

    //Выгружаем
    public UploadFile:UploadFile = new UploadFile();
    public result:string = null;

    private fileReader = new FileReader();
  
    public onChange(event: Event) {
        
      if (event.target['files']) {
        this.readFiles(event.target['files'], 0);
      }
    };
  
    private readFiles(files: any[], index: number) {
      let file = files[index];
      this.fileReader.onload = () => {
        var dublefile = this.UploadFile.Upload.findIndex(x =>x.NameFile ==file.name)
        if(dublefile==-1)
        {
            if( file.type =="image/tiff")
            {
            this.UploadFile.Upload.push({IdDocument:0, NameFile:file.name,MimeFile:file.type,ExpansionFile:file.name.split('.').pop().toLowerCase(),BlobFile:this.uint8ArrayToArray(this.fileReader.result as ArrayBuffer)})
            if (files[index + 1]) {
                this.readFiles(files, index + 1);
              } else {
                index++;
                this.dataSource = new MatTableDataSource<Upload>(this.UploadFile.Upload);
                this.visible = true;
                this.result = "Количество загруженных файлов ("+index+")"
                this.resetfilestatus();
              }
            }else{
                console.log(file.name +" не соответствует формату image/tiff")
            }
        }
      };
      this.fileReader.readAsArrayBuffer(file);
    }

    resetfilestatus() {
        this.ref.nativeElement.value = "";
    }

   ///Конвертация Uint8Array to number[]
    uint8ArrayToArray(uint8Array:ArrayBuffer):number[] {
        var array = [];
        var bytes = new Uint8Array(uint8Array);
       // return bytes;
         var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            array[i] = bytes[i];
        }
        return array;
    }



    delete(file:Upload){
        var index = this.UploadFile.Upload.findIndex(x =>x.NameFile ==file.NameFile)
        if(index!==-1)
          {
           this.UploadFile.Upload.splice(index, 1);
           if(this.UploadFile.Upload.length==0){
               this.dataSource = null;
               this.visible = false;
               this.result = null;
            }else{
                this.dataSource = new MatTableDataSource<Upload>(this.UploadFile.Upload);
            }
          }
    }

   donloadsServers(){
     if(this.UploadFile.Upload.length>0){
      console.log(this.UploadFile);
      this.select.addfiledb(this.UploadFile).subscribe(model=>{
          console.log(model);
          this.dataSource = null;
          this.UploadFile.Upload = [];
      })
    }
      else{
        alert("Не чего не выбрано нечего выгружать!!!")
      }
   }

}





export class UploadFile {
  Upload:Upload[] = []
}

export class Upload{
    IdDocument:number;
    MimeFile:string;
    ExpansionFile:string;
    NameFile:string;
    BlobFile:number[];
}