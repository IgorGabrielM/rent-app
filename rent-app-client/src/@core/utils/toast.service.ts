import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private toastController: ToastController
  ) { }

  async show(
    title: string,
    message: string,
    settings: {
      color?:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'light'
      | 'medium'
      | 'dark';
      duration?: number;
      position?: 'top' | 'middle' | 'bottom';
    } = {
        color: 'success',
        duration: 2000,
        position: 'bottom',
      }
  ) {
    const toast = await this.toastController.create({
      header: title,
      message,
      duration: settings.duration,
      position: settings.position,
      color: settings.color,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
