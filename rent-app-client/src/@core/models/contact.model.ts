import { DefaultModel } from "./default.model";

export class ContactModel extends DefaultModel {
  id_contact: string;
  name: string;
  telephone: string;
  email?: string;
}