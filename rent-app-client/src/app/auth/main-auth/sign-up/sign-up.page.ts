import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { UserModel } from 'src/@core/models/user.model';
import { LoginService } from 'src/@core/services/login.service';
import { UserService } from 'src/@core/services/user.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  userToCreate: UserModel
  passwordConfirm: boolean


  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly cnpjMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', '0', '0', '0', '1', '-', /\d/, /\d/],
  };

  constructor(
    private loginService: LoginService,
    private userService: UserService,

    private router: Router,
    private toastService: ToastService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.userToCreate = new UserModel()
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Fazendo cadastro...' });
    loading.present();

    const user = await this.loginService.registerUser(this.userToCreate)

    if (user) {
      this.userService.create({ ...this.userToCreate, id: user.user.uid })

      this.toastService.show('Successo', 'Conta criada.', {
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

  verifyConsfirmPassword(event: any): void {
    const confirmPassword = event.detail.value
    if (confirmPassword === this.userToCreate.password && confirmPassword !== '') {
      this.passwordConfirm = true
    }
    else {
      this.passwordConfirm = false
    }
  }

}
