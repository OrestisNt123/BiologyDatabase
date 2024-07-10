import { Component } from '@angular/core';
import { GeneProteinService } from '../../services/gene-protein.service';

@Component({
  selector: 'app-gene-protein',
  templateUrl: './gene-protein.component.html',
  styleUrls: ['./gene-protein.component.css']
})
export class GeneProteinComponent {

  data:any;
	
	constructor(private myService: GeneProteinService) { }

  	ngOnInit(): void {
    this.myService.getGeneProteins().subscribe(data => {
      	this.data = data;
    });
  }
}
