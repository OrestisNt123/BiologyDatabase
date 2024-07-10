import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PathwayService {

	private readonly endpoint = "http://localhost:8080/pathways";

	constructor(private http:HttpClient) { 
		
	}

	getPathway(){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.get(this.endpoint, {headers:headers})
	}

	addPathway(data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.post(this.endpoint, data)
	}

	deletePathway(id: number){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.delete(this.endpoint + '/' + id)
	}

	updatePathway(id: number, data: any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.http.put(this.endpoint + '/' + id, data, {headers})
	}
}
