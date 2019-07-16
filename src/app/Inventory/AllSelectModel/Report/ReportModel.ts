
//DTO для генерации документа
export class DocumentReport{
    //idselect --Ун выборки
    //idOut --Ун кто формирует
    //idUser --На кого формируется
    //idDocument --Угн документа
    constructor(idselect:number,idOut:number,idUser:number,idDocument:number){
       this.paramRequestField.idSelectField = idselect;
       this.paramRequestField.idOutField = idOut;
       this.paramRequestField.idUsersField = idUser;
       this.paramRequestField.idNameDocumentField = idDocument;
    }
    paramRequestField:Request = new Request();
    bodyField:Body = null;
    mainField:Main = new Main;
}

class Request{
    //Ун выборки из таблицы LogicaSelect
    idSelectField?:number = null;
    //Кто формирует накладную
    idOutField?:number = null;
    //На кого формируется накладная
    idUsersField?:number = null;
    //Ун документа какой документ
    idNameDocumentField?:number = null;
}

class Body{
    
}

class Main{
    formedField:Formed = null;
    organizationField:Organization = null;
    receivedField:Received = null;
    barcodeField:Barcode = null;
}

class Barcode{

}

class Formed{

}
class Organization{

}

class Received{

}