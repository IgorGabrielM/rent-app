import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { UserModel } from 'src/@core/models/user.model';
import { LoginService } from 'src/@core/services/login.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.userLogin = new UserModel()
  }

  async onSubmit() {
    //mostrar um loading
    const user = await this.loginService.login(this.userLogin)
    if (user) {
      this.router.navigateByUrl('tabs/home', { replaceUrl: true })
    } else {
      //mostrar um toast de erro
      console.log('erro')
    }
  }

}
