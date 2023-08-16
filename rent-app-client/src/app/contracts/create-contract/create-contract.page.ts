import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { AssetModel } from 'src/@core/models/asset.model';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContractModel } from 'src/@core/models/contract.model';
import { AssetService } from 'src/@core/services/asset.service';
import { ContactService } from 'src/@core/services/contact.service';
import { ContractService } from 'src/@core/services/contract.service';
import { ImageService } from 'src/@core/services/image.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.page.html',
  styleUrls: ['./create-contract.page.scss'],
})
export class CreateContractPage implements OnInit {
  idContractToEdit: string
  contacts: ContactModel[] = []
  assets: AssetModel[] = []
  contract: ContractModel

  isOpenContractTerms: boolean = false
  contractTerms: any
  imageAsBase64: string

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
    //private imageService: ImageService
  ) { }

  ngOnInit() {
    this.getQueryParam();
    this.loadContacts();
    this.loadAssets();
    //console.log(new Date() as Date)
    this.loadContactTerms()
  }

  ionViewWillEnter() {
  }

  getQueryParam() {
    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      this.idContractToEdit = queryParams['id'];
      if (this.idContractToEdit) {
        this.contractService.find(this.idContractToEdit).then((contract) => {
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

  getImage(data: string) {
    this.imageAsBase64 = data;
    console.log(this.imageAsBase64)

    fetch(this.imageAsBase64)
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob)
        //this.imageService.uploadImageBlob(blob)
      })
  }

  uploadPicture(blob: Blob) {

  }

  onSubmit() {
    if (!this.idContractToEdit) {
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
