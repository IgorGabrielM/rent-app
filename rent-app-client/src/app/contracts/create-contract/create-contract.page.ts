import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { AssetModel } from 'src/@core/models/asset.model';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContractModel } from 'src/@core/models/contract.model';
import { AssetService } from 'src/@core/services/asset.service';
import { ContactService } from 'src/@core/services/contact.service';
import { ContractService } from 'src/@core/services/contract.service';
import { ImageService } from 'src/@core/services/image.service';
import { CepService } from 'src/@core/utils/cep.service';
import { DateFormatService } from 'src/@core/utils/date-format.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.page.html',
  styleUrls: ['./create-contract.page.scss'],
  providers: [CepService]
})
export class CreateContractPage implements OnInit {
  idContractToEdit: string
  contacts: ContactModel[] = []
  assets: AssetModel[] = []
  contract: ContractModel

  isAgreed: boolean = false
  isOpenContractTerms: boolean = false
  contractTerms: any
  imageAsBase64: string
  imageUrl?: string

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
    private dateFormatService: DateFormatService,
    private cepService: CepService,
    private imageService: ImageService,
  ) { }

  ngOnInit() {
    this.getQueryParam();
    this.loadContacts();
    this.loadAssets();
    this.loadContactTerms();
  }

  ionViewWillEnter() {
    this.getQueryParam();
    this.loadContacts();
    this.loadAssets();
    this.loadContactTerms();
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

  totalValueCalculator(assetQuantity: number, assetPrice: number) {
    return String(assetQuantity * assetPrice)
  }

  handleChangeAsset(event: any) {
    this.contract?.assets.forEach((asset) => {
      if (!asset.quantity || asset.quantity == 0) {
        asset.quantity = 1
      }
    })
  }

  getNameContact(id: string): string {
    return this.contacts.find((contact) => contact.id == id)?.name
  }

  onCepChange() {
    if (String(this.contract.cep).length === 9) {
      this.cepService.getAddressByCep(String(this.contract.cep))
        .subscribe((data: any) => {
          this.contract.street = data.logradouro;
          this.contract.neighborhood = data.bairro;
        });
    }
  }

  getImage(data: string) {
    this.imageAsBase64 = data;
    fetch(this.imageAsBase64)
      .then((res) => res.blob())
      .then((blob) => {
        this.imageService.uploadImageBlob(blob, 'signatures').then((res) => {
          this.imageUrl = res
          this.toastService.show('Sucesso', 'Imagem salva com sucesso', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
        })
      })
  }

  verifyToSubmit(step: 1 | 2): boolean {
    if (step == 1) {
      if (this.contract.identifier && this.contract.neighborhood && this.contract.street && this.contract.numberHouse &&
        this.contract.contactId && this.contract.endDateLocate && this.contract?.assets.length > 0) {
        return true
      } else {
        return false
      }
    }
    if (step == 2) {
      if (this.contract.identifier && this.contract.neighborhood && this.contract.street && this.contract.numberHouse &&
        this.contract.contactId && this.contract.endDateLocate && this.contract?.assets.length > 0 && this.isAgreed && (this.imageUrl || this.contract.image)) {
        return true
      } else {
        return false
      }
    }
    return false

  }

  onSubmit() {
    const data = new Date()
    if (this.contract.neighborhood && this.contract.street && this.contract.numberHouse &&
      this.contract.contactId && this.contract.endDateLocate && this.contract?.assets.length > 0 && this.isAgreed) {
      if (!this.idContractToEdit) {
        this.contractService.create({
          ...this.contract,
          image: this.imageUrl,
          contactName: this.getNameContact(this.contract.contactId),
          createdAt: this.dateFormatService.turnTimestampOnYearMonthDay(data),
          titleContract: this.contractTerms[0].title,
          termsContract: this.contractTerms[0].term
        }).then(() => {
          this.toastService.show('Sucesso', 'Contrato criado com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.isOpenContractTerms = false
          this.contract = new ContractModel();
          setTimeout(() => {
            this.route.navigate(['./tabs/contracts']),
              1000
          })
        })
      } else {
        this.contractService.update({ ...this.contract, contactName: this.getNameContact(this.contract.contactId), id: this.idContractToEdit, updatedAt: this.dateFormatService.turnTimestampOnYearMonthDay(data) }).then(() => {
          this.toastService.show('Sucesso', 'Contrato atualizado com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.isOpenContractTerms = false
          this.contract = new ContractModel();
          setTimeout(() => {
            this.route.navigate(['./tabs/contracts']),
              1000
          })
        })
      }
    }
    else {
      this.toastService.show('Erro', 'Preencha todos os campos obrigatórios!', {
        color: 'danger',
        duration: 2000,
        position: 'top',
      });
      this.isOpenContractTerms = false
    }
  }

}
