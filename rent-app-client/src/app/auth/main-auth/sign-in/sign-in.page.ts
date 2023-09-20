import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { UserModel } from 'src/@core/models/user.model';
import { LoginService } from 'src/@core/services/login.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  userLogin: UserModel

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly cnpjMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', '0', '0', '0', '1', '-', /\d/, /\d/],
  };

  constructor(
    private loginService: LoginService,

    private router: Router,
    private toastService: ToastService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.userLogin = new UserModel()
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Fazendo login...' });
    loading.present();

    const user = await this.loginService.login(this.userLogin)
    if (user) {
      this.toastService.show('Successo', 'Asseco autorizado.', {
        color: 'success',
        duration: 2000,
        position: 'top',
      });
      this.router.navigateByUrl('tabs/home', { replaceUrl: true })
      this.loadingCtrl.dismiss();
    } else {
      this.toastService.show('Erro', 'Verifique os dados informados.', {
        color: 'danger',
        duration: 2000,
        position: 'top',
      });
      this.loadingCtrl.dismiss();
    }
  }

}
