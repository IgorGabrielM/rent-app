import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private auth: Auth
  ) { }

  async registerUser(userModel: UserModel) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, userModel.email, userModel.password)
      return user
    } catch (e) {
      return null
    }
  }

  login(userModel: UserModel) {
    try {
      const user = signInWithEmailAndPassword(this.auth, userModel.email, userModel.password)
      return user
    } catch (e) {
      return null
    }
  }


  logout() {
    return signOut(this.auth)
  }

}
