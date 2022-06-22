import { AksiokAddAndEdit, EquipmentType, Producer, EquipmentModel, FullCategories } from '../../../ModelInventory/InventoryModel';

export class ModelAksiok {

    constructor(public aksiokAddAndEdit: AksiokAddAndEdit) { }

    public isLoadModel: boolean = false;
    public equipmentType: EquipmentType[] = [];
    public producer: Producer[] = []
    public equipmentModel: EquipmentModel[] = [];
    public fullCategories: FullCategories[] = []


    public selectedEquipmentType: EquipmentType;
    public selectedProducer: Producer;
    public selectedEquipmentModel: EquipmentModel;
    public selectedFullCategories: FullCategories;


}