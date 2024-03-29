import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ContractService } from 'src/@core/services/contract.service';
import { ToastService } from 'src/@core/utils/toast.service';
import { ContactService } from 'src/@core/services/contact.service';
import { ContactModel } from 'src/@core/models/contact.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-modal-contract-pdf',
  templateUrl: './modal-contract-pdf.component.html',
  styleUrls: ['./modal-contract-pdf.component.scss']
})

export class ModalContractPdfComponent implements OnInit {
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

  getFormatedRowsTableOfAssets() {
    const arrayOfColumns = [];
    this.contract?.assets.forEach((asset) => {
      arrayOfColumns.push([
        asset.name,
        asset.identifier,
        String(asset.quantity),
        `R$ ${String(asset.assetCategory.value)},00`,
        `R$ ${this.totalValueCalculator(asset.quantity, asset.assetCategory.value)},00`
      ]);
    });

    return arrayOfColumns;
  }

  generatePdf(data: ContractModel) {
    const dataColumnsFormated = this.getFormatedRowsTableOfAssets();
    const documentDefinition = {
      content: [
        {
          columns: [
            { text: data.titleContract, style: 'header' },
            { text: "Data de vencimento: " + this.returnDataFormated(String(data.endDateLocate)), alignment: 'right' },
          ]
        },
        { text: data.termsContract, margin: [0, 20], style: 'justifiedText', },

        { text: "Equipamentos vinculados: ", margin: [0, 10], style: 'justifiedText', },
        {
          table: {
            widths: ['*', '*', '*', '*', '*'],
            body: [
              ['Equipamento', 'Identificador', 'Quantidade', 'Valor unitário', 'Valor total'],
              ...dataColumnsFormated
            ],
          },
        },
        { text: "Valor total vinculado do contrato: R$" + String(this.getTotalValue()) + ",00", margin: [0, 10], style: 'justifiedText', },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 15, 0, 5] },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }

  returnDataFormated(date: string) {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate
  }

  getTotalValue(): number {
    let totalValue: number = 0;

    this.contract?.assets.forEach((asset) => {
      totalValue += Number(asset.assetCategory.value) * asset.quantity;
    });

    return totalValue;
  }

  totalValueCalculator(assetQuantity: number, assetPrice: number) {
    return String(assetQuantity * assetPrice)
  }

  async generateMesage() {
    const contactNumber = (await this.contactService.find(this.contract.contactId) as ContactModel).telephone.replace(/\D/g, '')

    const assets = this.contract.assets.map((asset) => {
      return `${asset.quantity}x ${asset.name} = R$${asset.assetCategory.value.toFixed(2)}`
    })

    const date = new Date(this.contract.endDateLocate);
    const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const message = `Seu contrato expirou!
    Contrato referente aos seguintes equipamentos:
    ${assets.map((asset) => asset)} 
    O contrato possui um valor total de R$${this.getTotalValue().toFixed(2)}
    Com a data de vencimento de ${formattedDate}, deseja renova-lo?`

    const url = `https://wa.me/${contactNumber}?text=${message}`;
    window.open(url, '_system');
  }

  confirmNewDateForPay() {
    this.contractService.update({ ...this.contract, endDateLocate: this.newDateForPay }).then(() => {
      this.handlePaid = false
      this.toastService.show('Sucesso', 'Contrato reagendado', {
        color: 'success',
        duration: 2000,
        position: 'top',
      })
    })
  }

  markAsPaid() {
    this.contractService.update({ ...this.contract, endDateLocate: null }).then(() => {
      this.handlePaid = false
      this.toastService.show('Sucesso', 'Contrato pago', {
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
