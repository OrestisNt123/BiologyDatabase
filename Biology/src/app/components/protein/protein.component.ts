import { Component } from '@angular/core';
import { ProteinService } from '../../services/protein.service';

@Component({
  selector: 'app-protein',
  templateUrl: './protein.component.html',
  styleUrls: ['./protein.component.css']
})
export class ProteinComponent {

  data:any;
	
	constructor(private myService: ProteinService) { }

  	ngOnInit(): void {
    this.myService.getProteins().subscribe(data => {
      	this.data = data;
    });
  }
}