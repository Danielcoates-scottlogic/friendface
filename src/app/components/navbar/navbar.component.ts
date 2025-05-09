import { Component } from '@angular/core';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loginStatus: boolean = false;
  helper = new JwtHelperService();
  username: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('jwt') !== null) {
          this.loginStatus = true;
          let token = localStorage.getItem('jwt')!;
          this.username = this.helper.decodeToken(token).sub;
        }
      }
    })
  }
  logout() {
    localStorage.removeItem('jwt');
    window.location.href = '/pages/create-account';
  }

}
