import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProteinPathwayService {

	private readonly endpoint = "http://localhost:8080/protein-pathways";

	constructor(private http:HttpClient) { 
		
	}

	getProteinPathways(){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.get(this.endpoint, {headers:headers})
	}

	addProteinPathways(data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.post(this.endpoint, data)
	}

	deletProteinPathways(proteinId: number, pathwayId: number){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.delete(this.endpoint + '/' + proteinId + '/' + pathwayId)
	}

	updateProteinPathways(proteinId: number, pathwayId: number, data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.put(this.endpoint + '/' + proteinId + '/' + pathwayId, data, {headers})
	}
}
