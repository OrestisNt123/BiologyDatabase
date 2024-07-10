import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class GeneProteinService {
	private readonly endpoint = "http://localhost:8080/gene-proteins";

	constructor(private http:HttpClient) { 
		
	}

	getGeneProteins(){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.get(this.endpoint)
	}

	addGeneProteins(data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.post(this.endpoint, data)
	}

	deleteGeneProteins(geneId: number, proteinId: number){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.delete(this.endpoint + '/' + geneId + '/' + proteinId)
	}

	updateGeneProteins(geneId: number, proteinId: number, data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.put(this.endpoint + '/' + geneId + '/' + proteinId, data, {headers})
	}

}
