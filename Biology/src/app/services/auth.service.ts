import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  setLoggedIn(loggedIn: boolean){
    this.loggedIn.next(loggedIn);
  }

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setAdmin(admin: boolean){
    this.admin.next(admin);
  }

  getAdmin(){
    return this.admin;
  }
}
