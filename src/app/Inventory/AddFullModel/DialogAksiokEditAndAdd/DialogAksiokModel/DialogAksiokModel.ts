import { AksiokAddAndEdit, EquipmentType, Producer, EquipmentModel, FullCategories } from '../../../ModelInventory/InventoryModel';


export class ModelAksiok {

    constructor(public aksiokAddAndEdit: AksiokAddAndEdit) { }

    public equipmentType: EquipmentType[] = [];
    public producer: Producer[] = []
    public equipmentModel: EquipmentModel[] = [];
    public fullCategories: FullCategories[] = []
    public state: EquipmentState[] = [{ Id: 40, NameState: "На складе" }, { Id: 50, NameState: "Ожидает постановки на баланс" }, { Id: 60, NameState: "На балансе" }, { Id: 70, NameState: "На списании" }, { Id: 80, NameState: "Списано" }]
    public stateSto: EquipmentStateSto[] = [{ Id: 10, NameStateSto: "На постановке" }, { Id: 20, NameStateSto: "На СТО" }, { Id: 30, NameStateSto: "На снятии" }, { Id: 40, NameStateSto: "Не на СТО" }]
    public stateExpertise: EquipmentExpertise[] = [{ Id: 10, NameExpertise: "Не на экспертизе" }, { Id: 20, NameExpertise: "На экспертизе" }, { Id: 30, NameExpertise: "Экспертиза пройдена" }]

    public referencefullCategories: FullCategories;

    public filteredeEquipmentType: any;
    public filteredeProducer: any;
    public filteredeEquipmentModel: any;
    public filteredeState: any;
    public filteredeStateSto: any;
    public filteredeExpertise: any;

    public selectedEquipmentType: EquipmentType;
    public selectedProducer: Producer;
    public selectedEquipmentModel: EquipmentModel;
    public selectedState: EquipmentState = new EquipmentState();
    public selectedStateSto: EquipmentStateSto;
    public selectedExpertise: EquipmentExpertise = new EquipmentExpertise();

    public selectedFullCategories: FullCategories;

    startModel() {
        this.filteredeEquipmentType = this.equipmentType.slice();
        this.filteredeState = this.state.slice();
        this.filteredeStateSto = this.stateSto.slice();
        this.filteredeExpertise = this.stateExpertise.slice();
        if (this.aksiokAddAndEdit.parametersModelField.modelRequestField === "Edit") {
            this.referencefullCategories = this.fullCategories.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idFullCategoriaField)[0];
            this.selectedEquipmentType = this.equipmentType.filter(x => x.Id === this.referencefullCategories.IdEquipmentType)[0];
            this.selectedProducer = this.producer.filter(x => x.Id === this.referencefullCategories.IdProducer)[0];
            this.selectedEquipmentModel = this.equipmentModel.filter(x => x.Id === this.referencefullCategories.IdEquipmentModel)[0];
            this.selectedState = this.state.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idStateField)[0];
            this.selectedStateSto = this.stateSto.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idStateStoField)[0];
            this.selectedExpertise = this.stateExpertise.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idExpertiseField)[0];
            this.filterProducer()
            this.filterEquipmentModelStart();
        }
    }


    public filterEquipmentType() {
        this.selectedProducer = null;
        this.selectedEquipmentModel = null;
        this.filteredeEquipmentModel = null
        this.filterProducer();

    }


    public filterProducer() {
        var model = this.fullCategories.filter(x => x.IdEquipmentType === this.selectedEquipmentType.Id);
        this.filteredeProducer = this.producer.filter(x1 => model.some(x => x.IdProducer === x1.Id))
    }

    public filterEquipmentModel() {
        this.selectedEquipmentModel = null;
        this.filterEquipmentModelStart();
    }

    public filterEquipmentModelStart() {
        var model = this.fullCategories.filter(x => x.IdEquipmentType === this.selectedEquipmentType.Id && x.IdProducer === this.selectedProducer.Id);
        this.filteredeEquipmentModel = this.equipmentModel.filter(x1 => model.some(x => x.IdEquipmentModel === x1.Id))
    }


}
export class EquipmentState {
    public Id: number;
    public NameState: string;
}

export class EquipmentStateSto {
    public Id: number;
    public NameStateSto: string;
}

export class EquipmentExpertise {
    public Id: number;
    public NameExpertise: string;
}