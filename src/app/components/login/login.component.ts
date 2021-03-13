import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   email: string;
   password: string;
  constructor(
    private authService: AuthClientService, 
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // this.authService.getAuth().subscribe(auth => {
    //    if(auth) {
    //      return this.router.navigate(['/']);
    //    }
    // })
  }

  onLogin() {
      this.authService.login(this.email, this.password)
          .then(auth => {
             if(auth) {
               this.flashMessage.show('You are logged successfully!', {
                 cssClass: 'alert-success', timeout: 4000
               })
                this.router.navigate(['/']);
             }
          })
          .catch(error => {
            this.flashMessage.show(error.message, {
              cssClass: 'alert-danger', timeout: 10000
          })
    })
 }
 onLoginWithGoogle() {
  this.authService.loginWithGoogle()
      .then(auth => {
         if(auth) {
            this.flashMessage.show('You are logged successfully!', {
              cssClass: 'alert-success', timeout: 4000
          })
           this.router.navigate(['/']);
        }
    })
      .catch(error => {
        this.flashMessage.show(error.message, {
         cssClass: 'alert-danger', timeout: 10000
      })
   })
 }
  
}
