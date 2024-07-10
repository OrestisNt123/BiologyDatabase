import { Component } from '@angular/core';
import { PathwayService } from '../../services/pathway.service';

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent {

  data:any;
	
	constructor(private myService: PathwayService) { }	
  
  ngOnInit(): void {
    this.myService.getPathway().subscribe(data => {
      	this.data = data;
    });

  }
}