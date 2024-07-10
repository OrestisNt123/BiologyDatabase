import { Component, OnInit } from '@angular/core';
import { GeneService } from '../../services/gene.service';

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.css']
})
export class GeneComponent implements OnInit{

  data:any;

	constructor(private myService: GeneService) { }

  	ngOnInit(): void {
    this.myService.getGenes().subscribe(data => {
      	this.data = data;
    });
  }
}
