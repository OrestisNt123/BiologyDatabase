import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeneService {

	private readonly endpoint = "http://localhost:8080/genes";

	constructor(private http:HttpClient) { 
		
	}

	getGenes(){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.get(this.endpoint, {headers:headers})
	}
	
	addGenes(data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.post(this.endpoint, data, {headers:headers})
	}

	deleteGenes(id: number){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.delete(this.endpoint + '/' + id)
	}

	updateGenes(id: number, data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.put(this.endpoint + '/' + id, data, {headers})
	}

}