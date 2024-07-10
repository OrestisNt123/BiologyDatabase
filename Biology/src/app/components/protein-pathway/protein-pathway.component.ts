import { Component } from '@angular/core';
import { ProteinPathwayService } from '../../services/protein-pathway.service';

@Component({
  selector: 'app-protein-pathway',
  templateUrl: './protein-pathway.component.html',
  styleUrls: ['./protein-pathway.component.css']
})
export class ProteinPathwayComponent {

  data:any;
	
	constructor(private myService: ProteinPathwayService) { }

  	ngOnInit(): void {
    this.myService.getProteinPathways().subscribe(data => {
      	this.data = data;
    });
  }
}