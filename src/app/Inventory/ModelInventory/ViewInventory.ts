//Представления для БД Инвенторизация 

export class Book{
    public BookModels?:BookModels[] = null;
}

export class BookModels{
    RowNum:number;
    Keys:number;
    Name:string;
    Id:number;
    Model:string;
    IdBook:number;
}