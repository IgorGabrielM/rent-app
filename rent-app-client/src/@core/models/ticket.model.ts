import { DefaultModel } from "./default.model";

export class TicketModel extends DefaultModel {
  title: string
  description: string
  image: string
  criticity: 'low' | 'medium' | 'high'
}