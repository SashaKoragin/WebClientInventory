export class MenuAksiok {
    public ModelMenuAksiok: ModelMenuAksiok[] =
        [{ NameMenu: 'Редактировать АКСИОК', ModelMenu: 'Edit' },
        { NameMenu: 'Добавить в АКСИОК', ModelMenu: 'Add' },
        { NameMenu: 'Файл экспертизы', ModelMenu: 'ExpertiseFile' },
        { NameMenu: 'Акт списания', ModelMenu: 'FileAct' }]
}


export class ModelMenuAksiok {
    public NameMenu: string;
    public ModelMenu: string;
}

