import { AksiokAddAndEdit, EquipmentType, Producer, EquipmentModel, FullCategories, ModelDocumentType, ContractOnSto, ContractSpecification } from '../../../ModelInventory/InventoryModel';


export class ModelAksiok {

    constructor(public aksiokAddAndEdit: AksiokAddAndEdit) { }

    public modelDocumentType: ModelDocumentType[] = [];
    public equipmentType: EquipmentType[] = [];
    public producer: Producer[] = [];
    public equipmentModel: EquipmentModel[] = [];
    public fullCategories: FullCategories[] = [];
    public contractSpecification: ContractSpecification[] = [];
    public contractOnSto: ContractOnSto[] = [];
  

    public state: EquipmentState[] = [{ Id: 40, NameState: "На складе" }, { Id: 50, NameState: "Ожидает постановки на баланс" }, { Id: 60, NameState: "На балансе" }, { Id: 70, NameState: "На списании" }, { Id: 80, NameState: "Списано" }, { Id: 90, NameState: "Во временном пользовании" }]
    public stateSto: EquipmentStateSto[] = [{ Id: 10, NameStateSto: "На постановке" }, { Id: 20, NameStateSto: "На СТО" }, { Id: 30, NameStateSto: "На снятии" }, { Id: 40, NameStateSto: "Не на СТО" }]
    public stateExpertise: EquipmentExpertise[] = [{ Id: 10, NameExpertise: "Не на экспертизе" }, { Id: 20, NameExpertise: "На экспертизе" }, { Id: 30, NameExpertise: "Экспертиза пройдена" }]

    public referenceFullCategories: FullCategories;

    public filteredModelDocumentType: any;
    public filteredEquipmentType: any;
    public filteredProducer: any;
    public filteredEquipmentModel: any;
    public filteredState: any;
    public filteredStateSto: any;
    public filteredExpertise: any;
    public filteredContractSpecification: any;
    public filteredContractOnSto: any;
 

    public selectedModelDocumentType: ModelDocumentType
    public selectedContractSpecification: ContractSpecification;
    public selectedContractOnSto: ContractOnSto;
    public selectedEquipmentType: EquipmentType;
    public selectedProducer: Producer;
    public selectedEquipmentModel: EquipmentModel;
    public selectedState: EquipmentState = new EquipmentState();
    public selectedStateSto: EquipmentStateSto;
    public selectedExpertise: EquipmentExpertise = new EquipmentExpertise();

    public selectedFullCategories: FullCategories;

    startModel() {
        this.filteredModelDocumentType = this.modelDocumentType.slice();
        this.filteredEquipmentType = this.equipmentType.slice();
        this.filteredState = this.state.slice();
        this.filteredStateSto = this.stateSto.slice();
        this.filteredExpertise = this.stateExpertise.slice();
        this.filteredContractSpecification = this.contractSpecification.slice();
        this.filteredContractOnSto = this.contractOnSto.slice();
        console.log(this.aksiokAddAndEdit.parametersModelField);
        if (this.aksiokAddAndEdit.parametersModelField.modelRequestField === "Edit") {
            this.selectedModelDocumentType = this.modelDocumentType.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idCardField)[0];
            this.referenceFullCategories = this.fullCategories.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idFullCategoriaField)[0];
            this.selectedContractOnSto = this.contractOnSto.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idContractOnStoField)[0];
            this.selectedContractSpecification = this.contractSpecification.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idDeliveryContractField)[0];
            this.filteredEquipmentType = this.equipmentType.filter(x => x.Id === this.referenceFullCategories.IdEquipmentType && x.NameType == this.selectedModelDocumentType.EquipmentTypeName);
            this.selectedEquipmentType = this.equipmentType.filter(x => x.Id === this.referenceFullCategories.IdEquipmentType && x.NameType == this.selectedModelDocumentType.EquipmentTypeName)[0];
            this.selectedProducer = this.producer.filter(x => x.Id === this.referenceFullCategories.IdProducer)[0];
            this.selectedEquipmentModel = this.equipmentModel.filter(x => x.Id === this.referenceFullCategories.IdEquipmentModel)[0];
            this.selectedState = this.state.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idStateField)[0];
            this.selectedStateSto = this.stateSto.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idStateStoField)[0];
            this.selectedExpertise = this.stateExpertise.filter(x => x.Id === this.aksiokAddAndEdit.parametersModelField.idExpertiseField)[0];
            this.filterProducer()
            this.filterEquipmentModelStart();
        }
    }

    public filterModelDocumentType() {
        this.selectedEquipmentType = this.equipmentType.filter(x => x.NameType == this.selectedModelDocumentType.EquipmentTypeName)[0];
        if (this.selectedEquipmentType) {
            this.filterEquipmentType();
        }
    }

    public filterEquipmentType() {
        this.selectedProducer = null;
        this.selectedEquipmentModel = null;
        this.filteredEquipmentModel = null
        this.filterProducer();
    }


    public filterProducer() {
        var model = this.fullCategories.filter(x => x.IdEquipmentType === this.selectedEquipmentType.Id);
        this.filteredProducer = this.producer.filter(x1 => model.some(x => x.IdProducer === x1.Id))
    }

    public filterEquipmentModel() {
        this.selectedEquipmentModel = null;
        this.filterEquipmentModelStart();
    }

    public filterEquipmentModelStart() {
        var model = this.fullCategories.filter(x => x.IdEquipmentType === this.selectedEquipmentType.Id && x.IdProducer === this.selectedProducer.Id);
        this.filteredEquipmentModel = this.equipmentModel.filter(x1 => model.some(x => x.IdEquipmentModel === x1.Id))
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