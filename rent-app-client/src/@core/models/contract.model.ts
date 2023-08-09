import { DefaultModel } from "./default.model";

export class ContractModel extends DefaultModel {
  neighborhood: string;
  street: string;
  cep: number;
  numberHouse: number;
  complement: string;

  contactId: string;
  contactName: string;
  assetsIds?: string[];
  signatureWebPath: string;
}