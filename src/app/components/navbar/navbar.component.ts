import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  userLoggedIn: string;
  constructor(
    private authService: AuthClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.userLoggedIn = auth.email;
      } else {
         this.isLoggedIn = false;
      }
   })
  }
  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
    return this.router.navigate(['/login']);
  }

}
