import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
      localStorage.setItem('uid', user.user.uid)

      this.toastService.show('Successo', 'Acesso autorizado.', {
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
