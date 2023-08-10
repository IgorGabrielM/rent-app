import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import SignaturePad from 'signature_pad';
import { AssetModel } from 'src/@core/models/asset.model';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContractModel } from 'src/@core/models/contract.model';
import { AssetService } from 'src/@core/services/asset.service';
import { ContactService } from 'src/@core/services/contact.service';
import { ContractService } from 'src/@core/services/contract.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.page.html',
  styleUrls: ['./create-contract.page.scss'],
})
export class CreateContractPage implements OnInit {
  codeQueryParam: string
  contacts: ContactModel[] = []
  assets: AssetModel[] = []

  contract: ContractModel

  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;
  signatureImg: string;
  signature = true;
  isSignature = true;
  isOpenContractTerms: boolean = false
  contractTerms: any


  readonly phoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cepMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastService: ToastService,

    private contactService: ContactService,
    private contractService: ContractService,
    private assetService: AssetService,
  ) { }

  ngOnInit() {
    this.getQueryParam();
    this.loadContacts();
    this.loadAssets();
    console.log(new Date() as Date)
    this.loadContactTerms()
  }

  ionViewWillEnter() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    this.isSignature = true;
    console.log(event)
  }

  moved(event: Event) {
  }

  clearPad() {
    this.isSignature = false;
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }

  getQueryParam() {
    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      this.codeQueryParam = queryParams['id'];
      if (this.codeQueryParam) {
        this.contractService.find(this.codeQueryParam).then((contract) => {
          setTimeout(() => {
            this.contract = contract as ContractModel
          }, 1000)
        })
      } else {
        this.contract = new ContractModel()
      }
    });
  }

  loadContacts() {
    this.contactService.list().subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts
    })
  }

  loadContactTerms() {
    this.contractService.getTermsServices().subscribe((term) => {
      this.contractTerms = term
      console.log(term)
    })
  }

  loadAssets() {
    this.assetService.list().subscribe((assets: AssetModel[]) => {
      this.assets = assets
    })
  }

  getNameContact(id: string): string {
    return this.contacts.find((contact) => contact.id == id)?.name
  }

  onSubmit() {
    if (!this.codeQueryParam) {
      this.savePad();
      this.contractService.create({ ...this.contract, contactName: this.getNameContact(this.contract.contactId) }).then(() => {
        this.toastService.show('Sucesso', 'Contrato criado com sucesso!', {
          color: 'success',
          duration: 3000,
          position: 'top',
        });
        this.route.navigate(['/tabs/contracts'])
        this.contract = new ContractModel();
      })
    } else {
      this.savePad();
      this.contractService.update({ ...this.contract, contactName: this.getNameContact(this.contract.contactId) }).then(() => {
        this.toastService.show('Sucesso', 'Contrato atualizado com sucesso!', {
          color: 'success',
          duration: 3000,
          position: 'top',
        });
        this.route.navigate(['/tabs/contracts'])
        this.contract = new ContractModel();
      })
    }
  }

}
