import { AssetModel } from "./asset.model";
import { DefaultModel } from "./default.model";

export class ContractModel extends DefaultModel {
  neighborhood: string;
  street: string;
  cep: number;
  numberHouse: number;
  complement: string;
  endDateLocate: Date;

  contactId: string;
  contactName: string;
  assets?: AssetModel[];
  signatureWebPath: string;
}