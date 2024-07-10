import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProteinService {

	private readonly endpoint = "http://localhost:8080/proteins";

	constructor(private http:HttpClient) { 
		
	}

	getProteins(){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.get(this.endpoint, {headers:headers})
	}

	addProtein(data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.post(this.endpoint, data)
	}

	deletProtein(id: number){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.delete(this.endpoint + '/' + id)
	}

	updateProtein(id: number, data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.put(this.endpoint + '/' + id, data, {headers})	
	}
}
