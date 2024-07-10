import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpoint = "http://localhost:8080/users";

	constructor(private http:HttpClient) {}

	getUser(username: string, password: string){

    const data = { "username": username, "password": password };
		return this.http.post(this.endpoint + '/login', data)
	}

  registerUser(username: string, password: string){

    const data = { "username": username, "password": password };
    return this.http.post(this.endpoint + '/register', data)
  }
}
