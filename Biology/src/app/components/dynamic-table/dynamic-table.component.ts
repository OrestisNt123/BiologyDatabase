import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneProteinService } from 'src/app/services/gene-protein.service';
import { GeneService } from 'src/app/services/gene.service';
import { PathwayService } from 'src/app/services/pathway.service';
import { ProteinPathwayService } from 'src/app/services/protein-pathway.service';
import { ProteinService } from 'src/app/services/protein.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {
  @Input() data!: any;
  columns: string[] = [];
  rows: any[] = [];
  isAdmin!: boolean;

  constructor(
    private route: ActivatedRoute, 
    private geneService: GeneService, 
    private proteinService: ProteinService, 
    private pathwayService: PathwayService, 
    private geneProteinService: GeneProteinService, 
    private proteinPathwayService: ProteinPathwayService,
    private router: Router,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.authService.getAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.authService.getAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });

    if (changes['data'] && this.data) {
      this.columns = [];
      this.rows = [];
      this.processData(this.data);
    }
  }

  processData(data: any) {
    // Ensure data is an array
    if (!Array.isArray(data)) {
      return;
    }

    // Extract unique columns and rows
    data.forEach(item => {
      const row: any = {};
      this.extractKeysAndValues(item, row);
      this.rows.push(row);
    });
  }

  extractKeysAndValues(obj: any, row: any, parentKey = '') {
    for (let key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.extractKeysAndValues(obj[key], row, newKey);
      } else {
        row[newKey] = obj[key];
        if (!this.columns.includes(newKey)) {
          this.columns.push(newKey);
        }
      }
    }
  }

  deleteRow(row: any): void {
    const path = this.route.snapshot.routeConfig?.path;

    const serviceMap: { [key: string]: () => any } = {
      'genes': () => this.geneService.deleteGenes(row.id),
      'pathways': () => this.pathwayService.deletePathway(row.id),
      'proteins': () => this.proteinService.deletProtein(row.id),
      'gene-proteins': () => this.geneProteinService.deleteGeneProteins(row["id.geneId"], row["id.proteinId"]),
      'protein-pathways': () => this.proteinPathwayService.deletProteinPathways(row["id.proteinId"], row["id.pathwayId"])
    };

    if (path && serviceMap[path]) {
      serviceMap[path]().subscribe(
        (response: any) => {
          console.log('Delete successful', response);
          this.rows = this.rows.filter((r: any) => r !== row);
        },
        (error: any) => console.error('Delete failed', error)
      );
    } else {
      console.error('No service method found for path:', path);
    }
  }

  updateRow(row: any): void {
    const data = this.columns.reduce((obj: any, col: any) => {
      obj[col] = row[col];
      return obj;
    }, {});

    this.router.navigate(['update'], { state: { rowData: data, previousRoute: this.route.snapshot.routeConfig?.path } });
  }

  addRow(): void {
    this.router.navigate(['add'], { state: { columnData: this.columns, previousRoute: this.route.snapshot.routeConfig?.path } });
  }
}
