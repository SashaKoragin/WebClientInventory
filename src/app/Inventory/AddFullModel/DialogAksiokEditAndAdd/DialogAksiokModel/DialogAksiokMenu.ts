export class MenuAksiok {
    public ModelMenuAksiok: ModelMenuAksiok[] =
        [{ NameMenu: 'Редактировать АКСИОК', ModelMenu: 'Edit' },
        { NameMenu: 'Добавить в АКСИОК', ModelMenu: 'Add' },
        { NameMenu: 'Файл экспертизы', ModelMenu: 'ExpertiseFile' },
        { NameMenu: 'Акт списания', ModelMenu: 'FileAct' },
        { NameMenu: 'Сравнительная карточка оборудования', ModelMenu: 'CardEquipment' }]
}

export class ModelMenuAksiok {
    public NameMenu: string;
    public ModelMenu: string;
}

