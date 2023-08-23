import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContractModel } from 'src/@core/models/contract.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { table } from 'console';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-modal-contract-pdf',
  templateUrl: './modal-contract-pdf.component.html',
  styleUrls: ['./modal-contract-pdf.component.scss']
})

export class ModalContractPdfComponent implements OnInit {
  @Input() contract: ContractModel

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  getFormatedRowsTableOfAssets() {
    const arrayOfColumns = [];
    this.contract.assets.forEach((asset) => {
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

  totalValueCalculator(assetQuantity: number, assetPrice: number) {
    return String(assetQuantity * assetPrice)
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
