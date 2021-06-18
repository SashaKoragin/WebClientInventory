//Представления для БД Инвенторизация 

export class Book {
    public BookModels?: BookModels[] = null;
}

export class BookModels {
    rowNumField: number;
    keysField: number;
    nameField: string;
    idField: number;
    modelField: string;
    idBookField: number;
    logicsButtonField: string;
}