import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
          .then((userData) => resolve(userData), (error) => reject(error))
    })
  }

  loginWithGoogle() {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
          .then((userData) => resolve(userData), (error) => reject(error))
    })
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
}
