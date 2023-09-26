import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContactService } from 'src/@core/services/contact.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {
  codeQueryParam: string
  idContactToEdit: string
  contact: ContactModel

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly telphoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private toastService: ToastService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getQueryParam()
  }

  getQueryParam() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idContactToEdit = params['id'];
      if (this.idContactToEdit) {
        this.contactService.find(this.idContactToEdit).then((asset) => {
          setTimeout(() => {
            this.contact = asset as ContactModel
          }, 1000)
        })
      } else {
        this.contact = new ContactModel()
      }
    });
  }

  onSubmit() {
    if (this.contact.name && this.contact.telephone && this.contact.email) {
      if (!this.idContactToEdit) {
        this.contactService.create(this.contact).then(() => {
          this.toastService.show('Sucesso', 'Contato criado com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.route.navigate(['/tabs/contacts'])
          this.contact = new ContactModel()
        })
      } else {
        this.contactService.update({ ...this.contact, id: this.idContactToEdit }).then(() => {
          this.toastService.show('Sucesso', 'Contato atualizado com sucesso!', {
            color: 'success',
            duration: 2000,
            position: 'top',
          });
          this.route.navigate(['/tabs/contacts'])
          this.contact = new ContactModel()
        })
      }
    } else {
      this.toastService.show('Erro', 'Preencha todos os campos!', {
        color: 'danger',
        duration: 2000,
        position: 'top',
      });
    }
  }

}
