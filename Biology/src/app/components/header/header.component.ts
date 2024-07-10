import { Component, SimpleChanges } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  private isLoggedInSub!: Subscription;
  admin = '';
  private adminSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedInSub = this.authService.getLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.adminSub = this.authService.getAdmin().subscribe(admin => {
      if (admin){
        this.admin = 'Admin';
      }
      else {
        this.admin = 'User';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSub) {
      this.isLoggedInSub.unsubscribe();
    }

    if (this.adminSub) {
      this.adminSub.unsubscribe();
    }
  }

  logout(): void {
    this.authService.setLoggedIn(false);
    this.router.navigate(['login'])
  }
}
