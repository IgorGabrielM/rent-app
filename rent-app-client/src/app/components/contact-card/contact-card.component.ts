import { Component, Input, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { ContactModel } from 'src/@core/models/contact.model';
import { ContactService } from 'src/@core/services/contact.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @ViewChild('itemSlide', { static: true }) itemSlide: IonItemSliding;

  @Input() contact: ContactModel

  isFunctionCalled: boolean = false

  constructor(
    private contactService: ContactService,

    private alertController: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  slideToDelete(event: any) {
    const distance = event.detail.ratio;
    if (distance >= 1 && !this.isFunctionCalled) {
      this.deleteContractAlert()
      this.isFunctionCalled = true;
    }
  }

  async deleteContractAlert() {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: 'Deseja deletar o contrato? Ele não podera ser restaurado posteriormente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.isFunctionCalled = false;
            this.itemSlide.closeOpened()
          }
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteContact()
            this.isFunctionCalled = false;
            this.itemSlide.closeOpened()
          }
        }
      ]
    });
    await alert.present();
  }

  deleteContact() {
    this.contactService.delete(this.contact.id).then(() => {
      this.toastService.show('Sucesso', 'Contato deletado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      })
    })
  }

}
