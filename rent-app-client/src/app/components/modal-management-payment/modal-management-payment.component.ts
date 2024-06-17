import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
import { ContractService } from 'src/@core/services/contract.service';
import { ToastService } from 'src/@core/utils/toast.service';
import { ContactService } from 'src/@core/services/contact.service';

@Component({
  selector: 'app-modal-contract-pdf',
  templateUrl: './modal-management-payment.component.html',
  styleUrls: ['./modal-management-payment.component.scss']
})

export class ModalManagementPaymentComponent implements OnInit {
  @Input() contract: ContractModel

  handlePaid: boolean = false
  newDateForPay: Date

  constructor(
    private contractService: ContractService,
    private contactService: ContactService,

    private toastService: ToastService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  getTotalValue(): number {
    let totalValue: number = 0;

    this.contract?.assetCategories.forEach((asset) => {
      totalValue += Number(asset.value) * asset.quantity;
    });

    return totalValue;
  }

  async generateMesage() {
    //const contactNumber = (await this.contactService.find(this.contract.contactId) as ContactModel).telephone.replace(/\D/g, '')

    const assets = this.contract.assetCategories.map((assetCategory) => {
      return `${assetCategory.quantity}x ${assetCategory.description} = R$${assetCategory.value.toFixed(2)}`
    })

    const date = new Date(this.contract.endDateLocate);
    const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const message = `Seu contrato expirou!
    Contrato referente aos seguintes equipamentos:
    ${assets.map((asset) => asset)} 
    O contrato possui um valor total de R$${this.getTotalValue().toFixed(2)}
    Com a data de vencimento de ${formattedDate}, deseja renova-lo?`

    //const url = `https://wa.me/${contactNumber}?text=${message}`;
    // window.open(url, '_system');
  }

  confirmNewDateForPay(ev: any) {
    const evDetail: Date = new Date(ev.detail.value);

    const padZero = (num) => num.toString().padStart(2, '0');
    const dateFormated = `${evDetail.getUTCFullYear()}-${padZero(evDetail.getUTCMonth() + 1)}-${padZero(evDetail.getUTCDate())}`

    this.contractService.update({ ...this.contract, endDateLocate: dateFormated }).then(() => {
      this.handlePaid = false
      this.toastService.show('Sucesso', 'Contrato reagendado', {
        color: 'success',
        duration: 2000,
        position: 'top',
      })
    })
  }

  markAsPaid() {
    this.contractService.update({ ...this.contract, isPaid: true }).then(() => {
      this.handlePaid = false
      this.toastService.show('Sucesso', 'Contrato pago', {
        color: 'success',
        duration: 2000,
        position: 'top',
      })
    })
  }

  markAsRetourned() {
    this.contractService.update({ ...this.contract, isRetourned: true }).then(() => {
      this.handlePaid = false
      this.toastService.show('Sucesso', 'Contrato marcado como devolvido.', {
        color: 'success',
        duration: 2000,
        position: 'top',
      })
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
